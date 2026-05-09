import { Resend } from 'resend';

const FROM_EMAIL = 'hello@magematch.com';
const ADMIN_EMAIL = 'arjun@magematch.com';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  return new Resend(apiKey);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export type ContactNotificationPayload = {
  name: string;
  email: string;
  platform: string;
  message: string;
  budget: string;
  store_url: string;
};

export type ApplicationNotificationPayload = {
  full_name: string;
  email: string;
  location: string;
  years_experience: number;
  hourly_rate: number;
  availability: string;
  specialisations: string[];
  certifications: string;
  linkedin_url: string;
  github_url: string;
  about: string;
  top_projects: string;
  why_magematch: string;
};

export type BriefNotificationPayload = {
  merchant_email: string;
  platform: string;
  problem_type: string;
  urgency: string;
  budget: string;
  description: string;
  specialist_skills: string;
};

export async function sendContactNotification(data: ContactNotificationPayload) {
  const resend = getResendClient();

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `📩 New Contact — ${data.name} — ${data.platform}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table>
        <tr><td><b>Name:</b></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><b>Email:</b></td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td><b>Platform:</b></td><td>${escapeHtml(data.platform)}</td></tr>
        <tr><td><b>Store URL:</b></td><td>${escapeHtml(data.store_url || 'Not provided')}</td></tr>
        <tr><td><b>Budget:</b></td><td>${escapeHtml(data.budget)}</td></tr>
        <tr><td><b>Message:</b></td><td>${escapeHtml(data.message)}</td></tr>
      </table>
      <br>
      <a href="https://supabase.com/dashboard">View in Supabase →</a>
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'We received your message — MageMatch',
    html: `
      <h2>Hi ${escapeHtml(data.name)},</h2>
      <p>Thanks for reaching out to MageMatch!</p>
      <p>We’ve received your message and will match you with the right Magento developer within 2 hours.</p>
      <h3>What you submitted:</h3>
      <table>
        <tr><td><b>Platform:</b></td><td>${escapeHtml(data.platform)}</td></tr>
        <tr><td><b>Budget:</b></td><td>${escapeHtml(data.budget)}</td></tr>
        <tr><td><b>Message:</b></td><td>${escapeHtml(data.message)}</td></tr>
      </table>
      <br>
      <p>Questions? Reply to this email or contact hello@magematch.com</p>
      <br>
      <p>The MageMatch Team<br><a href="https://magematch.com">magematch.com</a></p>
    `,
  });
}

export async function sendApplicationNotification(data: ApplicationNotificationPayload) {
  const resend = getResendClient();

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `🧑‍💻 New Developer Application — ${data.full_name}`,
    html: `
      <h2>New Developer Application!</h2>
      <table>
        <tr><td><b>Name:</b></td><td>${escapeHtml(data.full_name)}</td></tr>
        <tr><td><b>Email:</b></td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td><b>Location:</b></td><td>${escapeHtml(data.location)}</td></tr>
        <tr><td><b>Experience:</b></td><td>${escapeHtml(String(data.years_experience))} years</td></tr>
        <tr><td><b>Rate:</b></td><td>€${escapeHtml(String(data.hourly_rate))}/hr</td></tr>
        <tr><td><b>Availability:</b></td><td>${escapeHtml(data.availability)}</td></tr>
        <tr><td><b>LinkedIn:</b></td><td>${escapeHtml(data.linkedin_url)}</td></tr>
        <tr><td><b>GitHub:</b></td><td>${escapeHtml(data.github_url || 'Not provided')}</td></tr>
        <tr><td><b>Specialisations:</b></td><td>${escapeHtml(data.specialisations.join(', '))}</td></tr>
        <tr><td><b>Certifications:</b></td><td>${escapeHtml(data.certifications || 'Not provided')}</td></tr>
        <tr><td><b>About:</b></td><td>${escapeHtml(data.about)}</td></tr>
        <tr><td><b>Top Projects:</b></td><td>${escapeHtml(data.top_projects)}</td></tr>
        <tr><td><b>Why MageMatch:</b></td><td>${escapeHtml(data.why_magematch)}</td></tr>
      </table>
      <br>
      <p><b>Action needed:</b> Review and approve/reject in Supabase dashboard</p>
      <a href="https://supabase.com/dashboard">Review Application →</a>
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Application received — MageMatch',
    html: `
      <h2>Hi ${escapeHtml(data.full_name)},</h2>
      <p>Thanks for applying to join MageMatch as a verified developer!</p>
      <p>We’ve received your application and will review it within 48 hours.</p>
      <h3>What happens next:</h3>
      <ul>
        <li>We review your profile and certifications</li>
        <li>If approved, your profile goes live on magematch.com</li>
        <li>Merchants start finding you through our platform</li>
        <li>You receive matched briefs directly by email</li>
      </ul>
      <p>We’ll be in touch at this email with next steps within 48 hours.</p>
      <br>
      <p>Questions? Email us at hello@magematch.com</p>
      <br>
      <p>The MageMatch Team<br><a href="https://magematch.com">magematch.com</a></p>
    `,
  });
}

export async function sendBriefNotification(data: BriefNotificationPayload) {
  const resend = getResendClient();

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `🔔 New Brief — ${data.problem_type} — ${data.urgency}`,
    html: `
      <h2>New Chatbot Brief Submitted!</h2>
      <table>
        <tr><td><b>Email:</b></td><td>${escapeHtml(data.merchant_email)}</td></tr>
        <tr><td><b>Platform:</b></td><td>${escapeHtml(data.platform)}</td></tr>
        <tr><td><b>Problem:</b></td><td>${escapeHtml(data.problem_type)}</td></tr>
        <tr><td><b>Urgency:</b></td><td>${escapeHtml(data.urgency)}</td></tr>
        <tr><td><b>Budget:</b></td><td>${escapeHtml(data.budget)}</td></tr>
        <tr><td><b>Description:</b></td><td>${escapeHtml(data.description)}</td></tr>
        <tr><td><b>Specialist Skills:</b></td><td>${escapeHtml(data.specialist_skills)}</td></tr>
      </table>
      <br>
      <p><b>Reply to merchant within 2 hours!</b></p>
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.merchant_email,
    subject: 'Your MageMatch brief — we are on it! 🚀',
    html: `
      <h2>Brief received!</h2>
      <p>We are reviewing your project brief and will match you with verified Magento developers within 2 hours.</p>
      <h3>Your brief summary:</h3>
      <table>
        <tr><td><b>Platform:</b></td><td>${escapeHtml(data.platform)}</td></tr>
        <tr><td><b>Problem:</b></td><td>${escapeHtml(data.problem_type)}</td></tr>
        <tr><td><b>Urgency:</b></td><td>${escapeHtml(data.urgency)}</td></tr>
        <tr><td><b>Budget:</b></td><td>${escapeHtml(data.budget)}</td></tr>
      </table>
      <br>
      <h3>What happens next:</h3>
      <ul>
        <li>We match you with 3 verified Magento developers</li>
        <li>You receive their profiles and fixed price quotes</li>
        <li>You choose who to work with</li>
      </ul>
      <p>Questions? Reply to this email.</p>
      <br>
      <p>The MageMatch Team<br><a href="https://magematch.com">magematch.com</a></p>
    `,
  });
}

export async function sendDeveloperApplicationEmails(data: {
  fullName: string;
  email: string;
  linkedinUrl: string;
  githubUrl?: string;
  location: string;
  yearsExperience: string;
  hourlyRate: number;
  availability: string;
  specialisations: string[];
  certifications: string;
  about: string;
  topProjects: string;
  whyMagematch: string;
}) {
  await sendApplicationNotification({
    full_name: data.fullName,
    email: data.email,
    location: data.location,
    years_experience: Number(data.yearsExperience),
    hourly_rate: data.hourlyRate,
    availability: data.availability,
    specialisations: data.specialisations,
    certifications: data.certifications,
    linkedin_url: data.linkedinUrl,
    github_url: data.githubUrl || '',
    about: data.about,
    top_projects: data.topProjects,
    why_magematch: data.whyMagematch,
  });
}