# Image Optimization Guide

> **Goal:** Maximum visual quality at minimum file size and load time.
> Every rule here keeps quality high — we're optimizing *delivery*, not degrading images.

---

## TL;DR Checklist

Before committing any image, verify:

- [ ] Using `<Image>` from `@/atoms/img` (never raw `<img>`, never CSS `background-image`)
- [ ] `sizes` prop is set and reflects the actual rendered width
- [ ] `priority` + `fetchPriority="high"` on the largest above-fold image (LCP)
- [ ] `loading="lazy"` (implicit) on everything else — don't add `priority` to below-fold images
- [ ] `quality` left at default (75) for photos; use `quality={90}` for screenshots/UI
- [ ] S3 hostname is in `remotePatterns` in `next.config.ts`

---

## 1. Always Use the `<Image>` Component

**Never** use a raw `<img>` tag or `style={{ backgroundImage: ... }}`. They bypass all optimization.

```tsx
// ❌ WRONG — raw img, no compression, no WebP, no srcset
<img src="https://toporganicleads.s3.amazonaws.com/assets/hero.webp" alt="Hero" />

// ❌ WRONG — CSS background, completely unoptimized
<section style={{ backgroundImage: `url(${S3}assets/hero.webp)` }} />

// ✅ CORRECT
import Image from '@/atoms/img';
<Image src={`${S3}assets/hero.webp`} alt="Hero" fill sizes="100vw" />
```

### The Only Exception

SVG icons used as decorative elements (arrows, bullets, UI chrome) that are
already tiny (<2 KB) and don't need optimization. Even then, prefer inline SVG
or a `<Image unoptimized />` so the pipeline doesn't waste CPU on them.

---

## 2. Always Set `sizes`

`sizes` tells the browser which image width to download at each breakpoint.
Without it, next/image defaults to `100vw` — the browser downloads a 1920px
image for a 55px avatar.

### Formula

```
sizes="(max-width: <breakpoint>px) <width-at-that-breakpoint>, <default-width>"
```

### Common Patterns

```tsx
{/* Fixed-size element — always the same size */}
<Image width={55} height={55} sizes="55px" ... />

{/* Full-width hero */}
<Image fill sizes="100vw" ... />

{/* 2-column grid (splits at lg/1024px) */}
<Image width={700} height={500} sizes="(max-width: 1024px) 100vw, 700px" ... />

{/* 3-column grid */}
<Image width={400} height={300} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" ... />

{/* Sidebar image (fixed 433px max, smaller on mobile) */}
<Image fill sizes="(max-width: 640px) 240px, (max-width: 768px) 360px, 433px" ... />

{/* Card image inside a capped container */}
<Image fill sizes="(max-width: 768px) 100vw, 712px" ... />
```

---

## 3. LCP Image — Priority Flags

The **Largest Contentful Paint (LCP)** image is the biggest visible image on
first load. It must preload. Every other image must NOT preload (it wastes bandwidth).

```tsx
{/* ✅ LCP image — above the fold, first thing visible */}
<Image
  src={...}
  alt="Hero"
  fill
  priority                   // emits <link rel="preload"> in <head>
  fetchPriority="high"       // tells browser to fetch this before other resources
  sizes="100vw"
/>

{/* ✅ Below-fold image — lazy load (this is the default, nothing extra needed) */}
<Image src={...} alt="..." width={400} height={300} sizes="..." />

{/* ❌ WRONG — priority on a below-fold image wastes network on first load */}
<Image src={...} priority fetchPriority="high" loading="lazy" ... />
```

**Rule of thumb:** Only one image per page should have `priority`. If two images
seem equally important, the one higher in the DOM wins.

---

## 4. Quality Settings

`@/atoms/img` defaults to `quality={75}`. **Do not change this for photos.**
75 is the sweet spot: visually indistinguishable from 100 at 40–60% smaller file size.

```tsx
{/* ✅ Photos — use default (75), don't set quality at all */}
<Image src={`${S3}assets/founder-photo.jpg`} alt="Founder" ... />

{/* ✅ Screenshots / UI / app interfaces — bump to 90 to preserve sharp text */}
<Image src={`${S3}assets/despora-screen-shot.png`} alt="Despora" quality={90} ... />

{/* ✅ Hero product shots where pixel detail matters */}
<Image src={`${S3}assets/hero-product.jpg`} alt="Product" quality={85} ... />

{/* ❌ WRONG — never set quality={100} unless you have a specific reason */}
<Image src={...} quality={100} ... />
```

---

## 5. `fill` vs Explicit `width`/`height`

| Use case | Pattern |
|---|---|
| Image fills its container (hero, card bg, background) | `fill` + `sizes` |
| Image has a fixed intrinsic size (avatar, logo, icon) | `width` + `height` + `sizes` |
| Image in a responsive grid (scales with viewport) | `width` + `height` + responsive `sizes` |

```tsx
{/* fill — parent must be position:relative (or absolute/fixed) */}
<div className="relative h-[500px] w-full">
  <Image fill src={...} alt="..." sizes="100vw" className="object-cover" />
</div>

{/* Explicit dimensions */}
<Image src={...} alt="..." width={433} height={507} sizes="(max-width: 640px) 240px, 433px" />
```

> **fill images and GSAP animations**
> `next/image` with `fill` still renders an actual `<img>` element.
> GSAP `card.querySelector("img.featured-image")` will find it normally.
> Pass the class to the `className` prop.

---

## 6. Adding New S3 Buckets

If you add images from a new S3 bucket, add the hostname to `next.config.ts`
`remotePatterns` or next/image will throw an error and serve a broken image.

```ts
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-new-bucket.s3.us-east-1.amazonaws.com',
    },
  ],
},
```

Currently allowed hostnames:
- `toporganicleads.s3.amazonaws.com`
- `toporganicleads.s3.us-east-1.amazonaws.com`
- `alihusayni.s3.us-east-1.amazonaws.com`

---

## 7. Background Images

CSS `background-image` completely bypasses Next.js optimization (no WebP, no
srcset, no lazy load). Always convert to a `fill` Image with an overlay.

```tsx
{/* ❌ WRONG */}
<section style={{ backgroundImage: `url(${S3}assets/bg.jpg)` }}>
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative">...</div>
</section>

{/* ✅ CORRECT */}
<section className="relative">
  <Image
    src={`${S3}assets/bg.jpg`}
    fill
    className="object-cover object-center"
    alt=""
    aria-hidden="true"
    sizes="100vw"
    quality={75}
  />
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative">...</div>
</section>
```

---

## 8. Image Format Guide

Upload images in these formats and let next/image handle conversion to WebP/AVIF:

| Content type | Upload format | Reason |
|---|---|---|
| Photos (people, places) | `.jpg` | Best compression at quality 75 |
| Screenshots / UI | `.png` | Lossless, sharp text |
| Illustrations / graphics | `.webp` or `.png` | Depends on complexity |
| Icons / logos | `.svg` (inline) | Vector, zero size |
| Animated content | `.gif` or `.webp` | next/image handles animated WebP |

**Never upload `.bmp`, `.tiff`, or uncompressed `.png` for photos.**

---

## 9. Dynamic Import Trap

If you dynamically import `next/image`, the `priority` flag is ignored at SSR
time — the preload hint never reaches the browser.

```tsx
// ❌ WRONG — priority is dead, no <link rel="preload"> in HTML
const Image = dynamic(() => import('next/image'));

// ✅ CORRECT — static import, priority works server-side
import Image from '@/atoms/img';
```

Only `ReactPlayer`, `Lottie`, `gsap`, and similar heavy client-only libs should
use `dynamic()`.

---

## Quick Reference Card

```tsx
import Image from '@/atoms/img';

// Hero / LCP
<Image src={url} alt="Descriptive text" fill priority fetchPriority="high"
  sizes="100vw" className="object-cover" />

// Responsive content image
<Image src={url} alt="Descriptive text" width={800} height={500}
  sizes="(max-width: 768px) 100vw, 800px" />

// Fixed avatar / icon
<Image src={url} alt="Name" width={55} height={55} sizes="55px" />

// Screenshot (bump quality)
<Image src={url} alt="App screenshot" width={800} height={500}
  sizes="(max-width: 768px) 100vw, 800px" quality={90} />

// Background section
<section className="relative py-24">
  <Image src={url} fill alt="" aria-hidden="true"
    sizes="100vw" className="object-cover" />
  <div className="relative z-10">...</div>
</section>
```
