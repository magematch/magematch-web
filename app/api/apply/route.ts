import { NextResponse } from 'next/server';
import {
  sendApplicationNotification,
} from '../../../lib/email';
import { supabaseAdmin } from '../../../lib/supabase';

export const runtime = 'edge';

type RequestBody = {
  fullName: string;
  email: string;
  linkedinUrl: string;
  githubUrl?: string;
  location: string;
  yearsExperience: string;
  hourlyRate: number | string;
  availability: string;
  specialisations: string[];
  certifications: string;
  about: string;
  topProjects: string;
  whyMagematch: string;
  portfolioUrl?: string;
  verificationCode: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(value?: string) {
  if (!value) {
    return true;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Server is not configured for submissions.' },
      { status: 500 },
    );
  }

  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const requiredFields = [
    body.fullName,
    body.email,
    body.linkedinUrl,
    body.location,
    body.availability,
    body.about,
    body.topProjects,
    body.whyMagematch,
  ];

  if (requiredFields.some((field) => !field || !field.toString().trim())) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!isValidUrl(body.linkedinUrl) || !isValidUrl(body.githubUrl) || !isValidUrl(body.portfolioUrl)) {
    return NextResponse.json({ error: 'Please enter valid profile or portfolio URLs.' }, { status: 400 });
  }

  if (!Array.isArray(body.specialisations) || body.specialisations.length === 0) {
    return NextResponse.json({ error: 'Select at least one specialisation.' }, { status: 400 });
  }

  if (body.about.length > 300 || body.whyMagematch.length > 200) {
    return NextResponse.json({ error: 'One or more text fields exceed the limit.' }, { status: 400 });
  }

  const verificationCode = body.verificationCode?.trim();

  if (!verificationCode || !/^\d{6}$/.test(verificationCode)) {
    return NextResponse.json({ error: 'A valid 6-digit verification code is required.' }, { status: 400 });
  }

  const yearsExperience = Number(body.yearsExperience);
  const hourlyRate = Number(body.hourlyRate);

  if (Number.isNaN(yearsExperience) || Number.isNaN(hourlyRate)) {
    return NextResponse.json({ error: 'Experience and hourly rate must be numeric.' }, { status: 400 });
  }

  // Verify email OTP
  const now = new Date().toISOString();
  const { data: verificationRow, error: verifyFetchError } = await supabaseAdmin
    .from('email_verifications')
    .select('code, expires_at, used')
    .eq('email', body.email.trim().toLowerCase())
    .single();

  if (verifyFetchError || !verificationRow) {
    return NextResponse.json({ error: 'No verification code found. Please request a new one.' }, { status: 400 });
  }

  if (verificationRow.used) {
    return NextResponse.json({ error: 'This verification code has already been used.' }, { status: 400 });
  }

  if (verificationRow.expires_at < now) {
    return NextResponse.json({ error: 'Verification code has expired. Please request a new one.' }, { status: 400 });
  }

  if (verificationRow.code !== verificationCode) {
    return NextResponse.json({ error: 'Incorrect verification code. Please check your email.' }, { status: 400 });
  }

  try {
    const { error } = await supabaseAdmin.from('developer_applications').insert({
      full_name: body.fullName,
      email: body.email,
      linkedin_url: body.linkedinUrl,
      github_url: body.githubUrl || null,
      location: body.location,
      years_experience: yearsExperience,
      hourly_rate: hourlyRate,
      availability: body.availability,
      specialisations: body.specialisations,
      certifications: body.certifications || null,
      about: body.about,
      top_projects: body.topProjects,
      why_magematch: body.whyMagematch,
      portfolio_url: body.portfolioUrl || null,
    });

    if (error) {
      console.error('Failed to save developer application:', error);
      return NextResponse.json({ error: 'Failed to save application.' }, { status: 500 });
    }

    // Mark the verification code as consumed
    await supabaseAdmin
      .from('email_verifications')
      .update({ used: true })
      .eq('email', body.email.trim().toLowerCase());

    await sendApplicationNotification({
      full_name: body.fullName,
      email: body.email,
      location: body.location,
      years_experience: yearsExperience,
      hourly_rate: hourlyRate,
      availability: body.availability,
      specialisations: body.specialisations,
      certifications: body.certifications || '',
      linkedin_url: body.linkedinUrl,
      github_url: body.githubUrl || '',
      about: body.about,
      top_projects: body.topProjects,
      why_magematch: body.whyMagematch,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Developer application error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}