import { Resend } from 'resend';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  return new Resend(apiKey);
}

export type BriefPayload = {
  platform: string;
  version: string;
  problemType: string;
  description: string;
  urgency: string;
  budget: string;
  specialistSkills: string;
  timestamp: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function internalTemplate(merchantEmail: string, brief: BriefPayload) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#18181b;max-width:680px;margin:0 auto;">
      <h2 style="margin:0 0 16px;">New project brief submitted on MageMatch!</h2>

      <h3 style="margin:24px 0 8px;">👤 MERCHANT DETAILS</h3>
      <p style="margin:0;">Email: <strong>${escapeHtml(merchantEmail)}</strong></p>
      <p style="margin:0 0 12px;">Submitted: ${escapeHtml(brief.timestamp)}</p>

      <h3 style="margin:24px 0 8px;">📋 PROJECT BRIEF</h3>
      <p style="margin:0;">Platform: ${escapeHtml(brief.platform)}</p>
      <p style="margin:0;">Version: ${escapeHtml(brief.version)}</p>
      <p style="margin:0;">Problem Type: ${escapeHtml(brief.problemType)}</p>
      <p style="margin:0;">Description: ${escapeHtml(brief.description)}</p>
      <p style="margin:0;">Urgency: ${escapeHtml(brief.urgency)}</p>
      <p style="margin:0;">Budget: ${escapeHtml(brief.budget)}</p>
      <p style="margin:0 0 12px;">Specialist Skills: ${escapeHtml(brief.specialistSkills)}</p>

      <h3 style="margin:24px 0 8px;">⚡ ACTION NEEDED</h3>
      <p style="margin:0;">Reply to this merchant within 2 hours.</p>
      <p style="margin:0 0 16px;">Their email: <strong>${escapeHtml(merchantEmail)}</strong></p>

      <p style="margin:0;"><a href="https://magematch.com" style="color:#f97316;text-decoration:none;font-weight:700;">View MageMatch dashboard →</a></p>
    </div>
  `;
}

function merchantTemplate(merchantEmail: string, brief: BriefPayload) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#18181b;max-width:680px;margin:0 auto;">
      <div style="padding:20px 0;border-bottom:1px solid #e4e4e7;">
        <img src="https://magematch.com/magematch-logo.svg" alt="MageMatch Logo" style="height:36px;width:auto;" />
      </div>

      <p style="margin:24px 0 0;">Hi there,</p>
      <p style="margin:12px 0 0;">Thanks for submitting your project brief. Here's a summary of what we received:</p>

      <h3 style="margin:24px 0 8px;">📋 YOUR PROJECT BRIEF</h3>
      <p style="margin:0;">Platform: ${escapeHtml(brief.platform)}</p>
      <p style="margin:0;">Problem: ${escapeHtml(brief.problemType)}</p>
      <p style="margin:0;">Urgency: ${escapeHtml(brief.urgency)}</p>
      <p style="margin:0 0 12px;">Budget: ${escapeHtml(brief.budget)}</p>

      <h3 style="margin:24px 0 8px;">✅ WHAT HAPPENS NEXT</h3>
      <p style="margin:0;">→ We're reviewing your brief right now</p>
      <p style="margin:0;">→ We'll match you with 3 verified Magento developers within 2 hours</p>
      <p style="margin:0;">→ You'll receive developer profiles + fixed price quotes by email</p>
      <p style="margin:0 0 12px;">→ You choose who to work with</p>

      <p style="margin:0;">Questions? Reply to this email or contact <a href="mailto:hello@magematch.com" style="color:#f97316;text-decoration:none;">hello@magematch.com</a></p>

      <p style="margin:24px 0 0;">The MageMatch Team<br/>magematch.com</p>

      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e4e4e7;color:#71717a;font-size:12px;">
        <a href="https://magematch.com" style="color:#71717a;text-decoration:underline;">Unsubscribe</a>
        <span style="margin:0 6px;">|</span>
        <a href="https://magematch.com" style="color:#71717a;text-decoration:underline;">Privacy Policy</a>
      </div>
    </div>
  `;
}

export async function sendBriefNotification(
  merchantEmail: string,
  brief: BriefPayload
) {
  const resend = getResendClient();

  await resend.emails.send({
    from: 'notifications@magematch.com',
    to: 'arjun@magematch.com',
    subject: `🔔 New MageMatch Brief — ${brief.problemType}`,
    html: internalTemplate(merchantEmail, brief),
  });

  await resend.emails.send({
    from: 'hello@magematch.com',
    to: merchantEmail,
    subject: "Your MageMatch Brief — We're on it! 🚀",
    html: merchantTemplate(merchantEmail, brief),
  });
}