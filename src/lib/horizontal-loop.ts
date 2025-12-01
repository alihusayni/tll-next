/* eslint-disable prefer-const, @typescript-eslint/no-unused-expressions, @typescript-eslint/no-explicit-any */
import {gsap} from "gsap";
import {Draggable, InertiaPlugin} from "gsap/all";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function horizontalLoop(items: HTMLElement[], config: any) {
    let timeline: any;
    items = gsap.utils.toArray(items) as HTMLElement[];
    config = config || {};
    gsap.context(() => {
        let onChange = config.onChange,
            lastIndex = 0,
            tl = gsap.timeline({
                repeat: config.repeat,
                onUpdate: function() {
                    // Handle visibility based on position
                    if (container) {
                        const containerRect = container.getBoundingClientRect();
                        items.forEach((item) => {
                            const itemRect = item.getBoundingClientRect();
                            // Hide items that are completely outside the container
                            const isVisible = itemRect.right > containerRect.left - 320 &&
                                            itemRect.left < containerRect.right + 320;
                            gsap.set(item, { opacity: isVisible ? 1 : 0 });
                        });
                    }

                    // Handle onChange callback
                    if (onChange) {
                        const currentIndex = tl.closestIndex();
                        if (lastIndex !== currentIndex) {
                            lastIndex = currentIndex;
                            onChange(items[currentIndex], currentIndex);
                        }
                    }
                },
                paused: config.paused,
                defaults: {ease: "none"},
                onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
            }) as any,
            length = items.length,
            startX = items[0].offsetLeft,
            times: number[] = [],
            widths: number[] = [],
            spaceBefore: number[] = [],
            xPercents: number[] = [],
            curIndex = 0,
            indexIsDirty = false,
            center = config.center,
            is_reversed = config.reversed || false,
            suppress_direction_restore = false,
            pixelsPerSecond = (config.speed || 1) * 100,
            snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
            timeOffset = 0,
            container = (center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode) as HTMLElement,
            totalWidth: number,
            getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) + (parseFloat(config.paddingRight) || 0),
            populateWidths = () => {
                if (!container) return;
                let b1 = container.getBoundingClientRect(), b2;
                items.forEach((el, i) => {
                    widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i] * 100 + (gsap.getProperty(el, "xPercent") as number));
                    b2 = el.getBoundingClientRect();
                    spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
                    b1 = b2;
                });
                gsap.set(items, {
                    xPercent: (i: number) => xPercents[i]
                });
                totalWidth = getTotalWidth();
            },
            timeWrap: any,
            populateOffsets = () => {
                if (!container) return;
                timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
                center && times.forEach((t, i) => {
                    times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
                });
            },
            getClosest = (values: number[], value: number, wrap: number) => {
                let i = values.length,
                    closest = 1e10,
                    index = 0, d;
                while (i--) {
                    d = Math.abs(values[i] - value);
                    if (d > wrap / 2) {
                        d = wrap - d;
                    }
                    if (d < closest) {
                        closest = d;
                        index = i;
                    }
                }
                return index;
            },
            populateTimeline = () => {
                let i, item, curX, distanceToStart, distanceToLoop;
                tl.clear();
                for (i = 0; i < length; i++) {
                    item = items[i];
                    curX = xPercents[i] / 100 * widths[i];
                    distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
                    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
                    tl.to(item, {
                        xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
                        duration: distanceToLoop / pixelsPerSecond
                    }, 0)
                        .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {
                            xPercent: xPercents[i],
                            duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                            immediateRender: false
                        }, distanceToLoop / pixelsPerSecond)
                        .add("label" + i, distanceToStart / pixelsPerSecond);
                    times[i] = distanceToStart / pixelsPerSecond;
                }
                timeWrap = gsap.utils.wrap(0, tl.duration());
            },
            refresh = (deep?: boolean) => {
                const progress = tl.progress();
                tl.progress(0, true);
                populateWidths();
                deep && populateTimeline();
                populateOffsets();
                deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
            },
            onResize = () => refresh(!(tl.draggable && tl.draggable.isDragging)),
            proxy: HTMLElement;
        gsap.set(items, {x: 0, opacity: 1});
        populateWidths();
        populateTimeline();
        populateOffsets();
        window.addEventListener("resize", onResize);

        function toIndex(index: number, vars?: any) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
            let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
            if (time > tl.time() !== index > curIndex && index !== curIndex) {
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            if (time < 0 || time > tl.duration()) {
                vars.modifiers = {time: timeWrap};
            }
            curIndex = newIndex;
            vars.overwrite = true;
            gsap.killTweensOf(proxy);
            return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
        }

        tl.toIndex = (index: number, vars?: any) => toIndex(index, vars);
        tl.closestIndex = (setCurrent?: boolean) => {
            const index = getClosest(times, tl.time(), tl.duration());
            if (setCurrent) {
                curIndex = index;
                indexIsDirty = false;
            }
            return index;
        };
        tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
        tl.next = (vars?: any) => toIndex(tl.current() + 1, vars);
        tl.previous = (vars?: any) => toIndex(tl.current() - 1, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true);
        tl.timeScale(config.reversed ? -1 : 1);
        if (config.draggable && typeof (Draggable) === "function") {
            proxy = document.createElement("div");
            let wrap = gsap.utils.wrap(0, 1),
                ratio: number, startProgress: number, draggable: any, lastSnap: number,
                wasPlaying: boolean,
                align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
                syncIndex = () => tl.closestIndex(true);
            typeof (InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
            draggable = Draggable.create(proxy, {
                trigger: items[0].parentNode as any,
                type: "x",
                onPressInit() {
                    gsap.killTweensOf(tl);
                    wasPlaying = !tl.paused();
                    tl.pause();
                    startProgress = tl.progress();
                    refresh();
                    ratio = 1 / totalWidth;
                    gsap.set(proxy, {x: startProgress / -ratio});
                    if (typeof InertiaPlugin !== "undefined" && +InertiaPlugin.version.split(".")[1] < 14) {
                        const tracker = InertiaPlugin.getByTarget(proxy) as any;
                        if (tracker && tracker._props && tracker._props.x) {
                            tracker._props.x.v1 = tracker._props.x.v2 = startProgress / -ratio;
                        }
                    }
                },
                onDrag: align,
                onThrowUpdate: align,
                overshootTolerance: 0,
                inertia: true,
                snap(value: number) {
                    let time = -(value * ratio) * tl.duration(),
                        wrappedTime = timeWrap(time),
                        snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                        dif = snapTime - wrappedTime;
                    Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
                    lastSnap = (time + dif) / tl.duration() / -ratio;
                    return lastSnap;
                },
                onRelease() {
                    syncIndex();
                    if (draggable.isThrowing) indexIsDirty = true;
                },
                onThrowComplete: () => {
                    syncIndex();
                    if (!suppress_direction_restore) {
                        tl.timeScale(is_reversed ? -1 : 1);
                        if (wasPlaying) tl.play();
                    }
                }
            })[0];
            tl.draggable = draggable;
        }

        if (config.hoverContainer) {
            config.hoverContainer.addEventListener('mouseenter', () => {
                suppress_direction_restore = true;
                tl.pause();
            });
            config.hoverContainer.addEventListener('mouseleave', () => {
                const current = tl.time();
                tl.play(current, true);
                requestAnimationFrame(() => {
                    tl.timeScale(is_reversed ? -1 : 1);
                });
            });
        }
        tl.play();
        requestAnimationFrame(() => {
            tl.timeScale(is_reversed ? -1 : 1);
        });
        tl.closestIndex(true);
        lastIndex = curIndex;
        onChange && onChange(items[curIndex], curIndex);
        timeline = tl;
    });
    return timeline;
}