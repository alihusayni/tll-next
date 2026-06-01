import { NextRequest, NextResponse } from 'next/server';

const TOL_ACTION = 'https://contact.toporganicleads.com/api/v1/contact-form-submissions';

export async function POST(request: NextRequest) {
  const apiToken = process.env.TOL_API_TOKEN;
  const formKey = process.env.TOL_FORM_KEY;
  const requestId = process.env.TOL_REQUEST_ID;

  if (!apiToken || !formKey || !requestId) {
    console.error('Contact form: Missing TOL_API_TOKEN, TOL_FORM_KEY, or TOL_REQUEST_ID env vars');
    return NextResponse.json(
      { message: 'Server configuration error' },
      { status: 500 }
    );
  }

  let body: any = null;
  try {
    body = await request.json();

    // --- Abandoned form handling ---
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

      const hasData = !!(name || email || phone || message);
      if (!hasData) {
        return NextResponse.json({ ok: true });
      }

      try {
        await fetch(TOL_ACTION, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-TOKEN': apiToken,
            'X-FORM-KEY': formKey,
            'X-REQUEST-ID': requestId,
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

    const response = await fetch(TOL_ACTION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-TOKEN': apiToken,
        'X-FORM-KEY': formKey,
        'X-REQUEST-ID': requestId,
      },
      body: JSON.stringify({
        data: { ...data, requestId },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      await fetch('https://www.despora.ai/api/alerts/form-failure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName: 'Tuan Le Law',
          pageUrl: data.pageUrl || '',
          errorDetails: `TOL Server returned status ${response.status}: ${JSON.stringify(result)}`,
          clientEmail: 'tuan@tuanlelaw.com',
          leadData: data
        })
      }).catch(err => console.error('Failed to report failure to Despora:', err));

      return NextResponse.json(
        result,
        { status: response.status }
      );
    }

    return NextResponse.json(result);
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
