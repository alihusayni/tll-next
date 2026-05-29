function getOrCreateClientId(): string {
    if (typeof document === 'undefined') return '';
    const COOKIE_NAME = '_ga_cid';
    const existing = document.cookie
        .split('; ')
        .find(c => c.startsWith(`${COOKIE_NAME}=`))
        ?.split('=')[1];
    if (existing) return existing;
    const id = crypto.randomUUID();
    const expires = new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${COOKIE_NAME}=${id}; expires=${expires}; path=/; SameSite=Lax`;
    return id;
}

function getOrCreateSessionId(): string {
    if (typeof sessionStorage === 'undefined') return '';
    const KEY = '_ga_sid';
    const TS_KEY = '_ga_sid_ts';
    const now = Date.now();
    const lastTs = Number(sessionStorage.getItem(TS_KEY) || '0');
    let sessionId = sessionStorage.getItem(KEY) || '';
    if (!sessionId || now - lastTs > 30 * 60 * 1000) {
        sessionId = String(Math.floor(now / 1000));
        sessionStorage.setItem(KEY, sessionId);
    }
    sessionStorage.setItem(TS_KEY, String(now));
    return sessionId;
}

export function sendEvent(event: { name: string; params?: Record<string, string | number> }): void {
    if (typeof navigator === 'undefined') return;
    const clientId = getOrCreateClientId();
    if (!clientId) return;
    navigator.sendBeacon(
        '/api/analytics',
        new Blob(
            [JSON.stringify({
                client_id: clientId,
                events: [{
                    name: event.name,
                    params: {
                        session_id: getOrCreateSessionId(),
                        engagement_time_msec: '100',
                        ...event.params,
                    },
                }],
            })],
            { type: 'application/json' }
        )
    );
}

export function sendPageView(url?: string): void {
    sendEvent({
        name: 'page_view',
        params: {
            page_location: url || (typeof window !== 'undefined' ? window.location.href : ''),
            page_title: typeof document !== 'undefined' ? document.title : '',
        },
    });
}
