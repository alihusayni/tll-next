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

  try {
    const body = await request.json();
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
      return NextResponse.json(
        result,
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
