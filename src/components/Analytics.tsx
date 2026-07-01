'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// ─── Client ID ────────────────────────────────────────────────────────────────
// Persistent across sessions (2-year cookie). GA4 uses this to identify
// returning users across multiple sessions.
function getClientId(): string {
    const key = '_ga_cid';
    try {
        const existing = document.cookie
            .split('; ')
            .find(c => c.startsWith(`${key}=`))
            ?.split('=')[1];
        if (existing) return existing;

        const id = `${Math.random().toString(36).slice(2)}.${Date.now()}`;
        document.cookie = `${key}=${id}; max-age=${2 * 365 * 24 * 60 * 60}; path=/; SameSite=Lax`;
        return id;
    } catch {
        return '';
    }
}

// ─── Session ID ────────────────────────────────────────────────────────────────
// GA4 defines a session as a group of events within 30 minutes of activity.
// We replicate that: if >30min since last activity, start a new session.
// Using sessionStorage (not Date.now() per-call) so the same session ID
// is reused across page views within the same browsing session.
function getSessionId(): string {
    const KEY = '_ga_sid';
    const TS_KEY = '_ga_sid_ts';
    const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
    const now = Date.now();
    try {
        const lastTs = Number(sessionStorage.getItem(TS_KEY) || '0');
        let sessionId = sessionStorage.getItem(KEY) || '';

        // Start new session if no existing session or timeout exceeded
        if (!sessionId || now - lastTs > SESSION_TIMEOUT_MS) {
            sessionId = String(Math.floor(now / 1000));
            sessionStorage.setItem(KEY, sessionId);
        }
        // Always refresh the timestamp on activity
        sessionStorage.setItem(TS_KEY, String(now));
        return sessionId;
    } catch {
        return String(Math.floor(now / 1000));
    }
}

// ─── sendPageView ──────────────────────────────────────────────────────────────
function sendPageView(): void {
    const clientId = getClientId();
    if (!clientId) return;

    const payload = {
        client_id: clientId,
        events: [{
            name: 'page_view',
            params: {
                session_id: getSessionId(),
                engagement_time_msec: 100,
                page_location: window.location.href,
                page_title: document.title,
            },
        }],
    };

    const data = JSON.stringify(payload);
    if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/ping', new Blob([data], { type: 'application/json' }));
    } else {
        fetch('/api/ping', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
        }).catch(() => {});
    }
}

// ─── Analytics Component ───────────────────────────────────────────────────────
// Fires page_view on every route change (SPA navigation + initial load).
// Wrapped in <Suspense> in layout.tsx — required for usePathname() in Next.js 15.
export function Analytics() {
    const pathname = usePathname();
    const lastPathRef = useRef<string | null>(null);

    useEffect(() => {
        // Dedupe: only fire if the path actually changed
        if (pathname !== lastPathRef.current) {
            lastPathRef.current = pathname;
            sendPageView();
        }
    }, [pathname]);

    return null;
}
