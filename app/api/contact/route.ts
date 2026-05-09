import { NextResponse } from 'next/server';
import { sendContactNotification } from '../../../lib/email';
import { supabaseAdmin } from '../../../lib/supabase';

export const runtime = 'edge';

type ContactRequestBody = {
  name: string;
  email: string;
  platform: string;
  message: string;
  budget: string;
  store_url?: string;
  notes?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Server is not configured for submissions.' },
      { status: 500 },
    );
  }

  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.platform?.trim() || !body.message?.trim() || !body.budget?.trim()) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const { error } = await supabaseAdmin.from('contacts').insert({
      name: body.name,
      email: body.email,
      store_url: body.store_url || null,
      platform: body.platform,
      message: body.message,
      budget: body.budget,
      status: 'new',
      notes: body.notes || null,
    });

    if (error) {
      console.error('Failed to save contact:', error);
      return NextResponse.json({ error: 'Failed to save contact.' }, { status: 500 });
    }

    await sendContactNotification({
      name: body.name,
      email: body.email,
      platform: body.platform,
      message: body.message,
      budget: body.budget,
      store_url: body.store_url || '',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}