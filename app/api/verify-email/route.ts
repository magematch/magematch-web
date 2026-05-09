import { NextResponse } from 'next/server';
import { sendEmailVerificationCode } from '../../../lib/email';
import { supabaseAdmin } from '../../../lib/supabase';

export const runtime = 'edge';

function generateCode(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return String(digits);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Server is not configured.' },
      { status: 500 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service is not configured. Please set RESEND_API_KEY.' },
      { status: 500 },
    );
  }

  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  const code = generateCode();
  // Expires in 10 minutes
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  // Upsert: one active code per email at a time
  const { error: dbError } = await supabaseAdmin
    .from('email_verifications')
    .upsert(
      { email, code, expires_at: expiresAt, used: false },
      { onConflict: 'email' },
    );

  if (dbError) {
    console.error('Failed to store verification code:', JSON.stringify(dbError));
    const detail = process.env.NODE_ENV === 'development' ? ` (${dbError.message})` : '';
    return NextResponse.json({ error: `Could not send verification code. Please try again.${detail}` }, { status: 500 });
  }

  try {
    await sendEmailVerificationCode({ email, code });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Failed to send verification email:', message);
    return NextResponse.json({ error: `Could not send verification email: ${message}` }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
