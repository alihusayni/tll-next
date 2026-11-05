import { NextRequest, NextResponse } from 'next/server';

const TOL_ACTION = 'https://contact.toporganicleads.com/api/v1/contact-form-submissions';

export async function POST(request: NextRequest) {
  const apiToken = process.env.TOL_API_TOKEN;
  const formKey = process.env.TOL_FORM_KEY;
  const requestId = process.env.TOL_REQUEST_ID;
  // The TOL contact server is optional: when its env vars are missing the submission
  // still reaches Despora (system of record) instead of failing for the visitor.
  const tolConfigured = !!(apiToken && formKey && requestId);
  if (!tolConfigured) {
    console.error('Contact form: TOL_API_TOKEN / TOL_FORM_KEY / TOL_REQUEST_ID not set - skipping TOL forwarding');
  }

  let body: any = null;
  try {
    body = await request.json();

    // --- Abandoned form handling (partial entries; TOL only, not a real submission) ---
    if (body.abandoned === true) {
      const { name, email, phone, message, website, timeElapsed, pageUrl } = body;

      // Reject bot submissions silently
      if (website && website.trim() !== '') {
        console.log(`[Tuan Le Law Contact API] Silently rejected bot abandoned submission: website honeypot filled ("${website}")`);
        return NextResponse.json({ ok: true });
      }
      if (timeElapsed && Number(timeElapsed) < 3000) {
        console.log(`[Tuan Le Law Contact API] Silently rejected bot abandoned submission: timeElapsed too short (${timeElapsed}ms)`);
        return NextResponse.json({ ok: true });
      }

      // Spam check
      if (isSuspiciousSpam(name, email, undefined, message)) {
        console.log(`[Tuan Le Law Contact API] Silently rejected bot abandoned submission: spam check failed (name: "${name}", email: "${email}", message: "${message}")`);
        return NextResponse.json({ ok: true });
      }

      const hasData = !!(name || email || phone || message);
      if (!hasData || !tolConfigured) {
        return NextResponse.json({ ok: true });
      }

      try {
        await fetch(TOL_ACTION, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-TOKEN': apiToken!,
            'X-FORM-KEY': formKey!,
            'X-REQUEST-ID': requestId!,
          },
          body: JSON.stringify({
            data: {
              name: name || '',
              email: email || '',
              phone: phone || '',
              message: message || '',
              abandoned: true,
              ...(pageUrl ? { pageUrl } : {}),
              requestId,
            },
          }),
        });
      } catch (err) {
        console.error('Abandoned form forwarding error:', err);
      }

      return NextResponse.json({ ok: true });
    }

    // --- Regular form submission ---
    const { data } = body;

    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Spam check for regular submission
    const { name, email, location, address, message } = data;
    const checkLocation = location || address;

    if (isSuspiciousSpam(name, email, checkLocation, message)) {
      console.log(`[Tuan Le Law Contact API] Silently rejected bot regular submission: spam check failed (name: "${name}", email: "${email}", location: "${checkLocation}", message: "${message}")`);
      return NextResponse.json({ success: true });
    }

    // 1) TOL contact server (existing behavior, when configured)
    let tolResponse: Response | null = null;
    let tolResult: any = null;
    let tolError = '';
    if (tolConfigured) {
      try {
        tolResponse = await fetch(TOL_ACTION, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-TOKEN': apiToken!,
            'X-FORM-KEY': formKey!,
            'X-REQUEST-ID': requestId!,
          },
          body: JSON.stringify({
            data: { ...data, requestId },
          }),
        });
        tolResult = await tolResponse.json().catch(() => ({}));
        if (!tolResponse.ok) tolError = `TOL Server returned status ${tolResponse.status}: ${JSON.stringify(tolResult)}`;
      } catch (err: any) {
        tolError = err?.message || String(err);
      }
    }

    // 2) Despora (every non-spam submission, never throws)
    const desporaOk = await forwardToDespora(request, data);

    if (tolConfigured && !tolError) {
      return NextResponse.json(tolResult);
    }

    if (desporaOk) {
      if (tolError) console.error('Contact form: TOL forwarding failed but Despora received the lead:', tolError);
      return NextResponse.json({ success: true });
    }

    // Neither destination accepted the lead: alert as before and fail.
    await fetch('https://www.despora.ai/api/alerts/form-failure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteName: 'Tuan Le Law',
        pageUrl: data.pageUrl || '',
        errorDetails: tolError || 'No form destination accepted the submission (TOL not configured, Despora forward failed)',
        clientEmail: 'tuan@tuanlelaw.com',
        leadData: data
      })
    }).catch(err => console.error('Failed to report failure to Despora:', err));

    return NextResponse.json(
      tolResult && tolResponse ? tolResult : { message: 'Internal server error' },
      { status: tolResponse && !tolResponse.ok ? tolResponse.status : 500 }
    );
  } catch (error: any) {
    console.error('Contact form API error:', error);
    const leadData = body && (body as any).data ? (body as any).data : body;
    await fetch('https://www.despora.ai/api/alerts/form-failure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteName: 'Tuan Le Law',
        pageUrl: leadData?.pageUrl || '',
        errorDetails: error.message || String(error),
        clientEmail: 'tuan@tuanlelaw.com',
        leadData: leadData || {}
      })
    }).catch(err => console.error('Failed to report catch error to Despora:', err));

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

function isGibberish(val: any): boolean {
  if (typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (!/^[a-zA-Z]{8,30}$/.test(trimmed)) return false;
  const hasUpper = /[A-Z]/.test(trimmed);
  const hasLower = /[a-z]/.test(trimmed);
  if (!hasUpper || !hasLower) return false;
  // Must contain at least one uppercase letter after the first character
  return /[A-Z]/.test(trimmed.slice(1));
}

function hasExcessiveDots(emailVal: any): boolean {
  if (typeof emailVal !== 'string') return false;
  const cleanEmail = emailVal.trim().toLowerCase();
  if (!cleanEmail.endsWith('@gmail.com') && !cleanEmail.endsWith('@googlemail.com')) return false;
  const username = cleanEmail.split('@')[0];
  const dotCount = (username.match(/\./g) || []).length;
  return dotCount >= 4;
}

function isSuspiciousSpam(name: any, email: any, addressOrLocation: any, message: any): boolean {
  let score = 0;
  if (isGibberish(name)) score++;
  if (isGibberish(addressOrLocation)) score++;
  if (isGibberish(message)) score++;
  if (hasExcessiveDots(email)) score++;
  return score >= 2;
}


const TN_SOURCES = ['direct', 'organic', 'social', 'gbp', 'paid'];

/**
 * Forward a (non-spam) form submission to Despora server-side. Awaited with a
 * ~6 s timeout; errors are only logged so the visitor's submission never fails.
 */
async function forwardToDespora(request: NextRequest, data: any): Promise<boolean> {
  const key = process.env.DESPORA_FORM_KEY;
  if (!key) {
    console.error('Despora form forward skipped: DESPORA_FORM_KEY not set');
    return false;
  }
  try {
    const { name, email, phone, message, pageUrl, website, ...rest } = data || {};
    const cookieSrc = request.cookies.get('_tn_src')?.value || '';
    const source = TN_SOURCES.includes(cookieSrc) ? cookieSrc : 'direct';
    const res = await fetch('https://www.despora.ai/api/webhook/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key,
        name: name || '',
        email: email || '',
        phone: phone || '',
        message: message || '',
        page: pageUrl || request.headers.get('referer') || '',
        source,
        fields: rest,
      }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      console.error('Despora form forward failed with status', res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Despora form forward error:', err);
    return false;
  }
}
