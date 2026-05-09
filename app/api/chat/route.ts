import Groq from 'groq-sdk';
import { sendBriefNotification } from '../../../lib/email';
import { supabaseAdmin } from '../../../lib/supabase';

export const runtime = 'edge';

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MAGEMATCH_SYSTEM_PROMPT = `You are MageMatch's AI assistant — a specialist 
in Adobe Commerce and Magento eCommerce platforms.

Your ONLY job is to help store owners describe 
their Magento problem so we can match them with 
the right developer on MageMatch.

Follow this EXACT conversation flow, 
asking ONE question at a time:

STEP 1 - Platform:
Ask which platform they are on:
- Magento 2 Open Source
- Adobe Commerce (on-premise)
- Adobe Commerce Cloud
- Not sure

STEP 2 - Version:
Ask which version (2.4.7, 2.4.6, 2.4.5, older, not sure)
If unsure say: no problem, ask when they last upgraded

STEP 3 - Problem:
Ask to describe their main problem.
Internally categorise as one of:
- Performance (slow store, bad Core Web Vitals, 
  low Lighthouse score)
- Bug Fix (checkout broken, payment failing, 
  error messages, orders not processing)
- New Feature (custom module, new functionality)
- Theme/Frontend (Hyvä theme, redesign, 
  responsive issues)
- Migration (Magento 1 to 2, Magento to Shopify, 
  platform change)
- Version Upgrade (upgrading to newer Magento)
- Integration (ERP, PIM, CRM, payment gateway, 
  shipping provider)
- Headless/Composable (PWA, GraphQL, 
  Vue Storefront, headless setup)

STEP 4 - Urgency:
Ask how urgent:
- Critical (blocking sales right now)
- High (affecting revenue, fix this week)
- Medium (important but not emergency)
- Low (planning ahead)

STEP 5 - Budget:
Ask their rough budget:
- Under €150 (small fixes)
- €150 – €500 (medium tasks)
- €500 – €1,500 (larger projects)
- €1,500 – €5,000 (full features)
- €5,000+ (enterprise / full builds)

STEP 6 - Generate Brief + Ask Email:
Generate this exact structured brief then 
ask for their email:

---
📋 MAGEMATCH PROJECT BRIEF

🔧 Platform: [their answer]
📦 Version: [their answer]
⚠️ Problem Type: [categorised type]
📝 Description: [their description, cleaned up]
🚨 Urgency: [their answer]
💶 Budget: [their answer]
⭐ Specialist Skills Needed: [list if they 
   mentioned Hyvä / GraphQL / Headless / 
   Salesforce / AWS / specific integrations]
👨‍💻 Recommended Developer Level: 
   [Junior/Mid/Senior/Architect based on complexity]
⏱️ Estimated Timeline: [your estimate]
---

We will match you with 3 vetted Adobe Commerce 
developers within 2 hours.

What email should we send your matches to?

STRICT RULES:
- Ask only ONE question per message
- Keep every message under 3 sentences
- Be warm, friendly and professional
- Never use technical jargon with merchants
- If they mention security breach — treat as 
  CRITICAL urgency immediately
- If they mention Hyvä, headless, GraphQL, 
  PWA — add to Specialist Skills
- If they seem frustrated — be extra empathetic
- Never recommend specific agencies or 
  competitors by name
- Stay focused — if they go off topic, 
  gently redirect back to their Magento problem
- You ONLY help with Magento/Adobe Commerce — 
  if they ask about Shopify, WooCommerce etc, 
  say MageMatch specialises in Magento/Adobe 
  Commerce only
- The ONLY email you may mention is hello@magematch.com
- NEVER mention personal emails like arjundhiman90@gmail.com
  or varjun.dhiman@gmail.com

RESPONSE TIME RULES - Very important, never deviate:
- Always say "matched with a developer within 2 hours"
- NEVER say "24 hours" anywhere
- NEVER say "we will be in touch soon" vaguely
- NEVER say "our team will contact you"

Use this exact closing message after collecting email:

"✅ Perfect! Your brief has been submitted.

Here's what happens next:
→ We'll match you with 3 verified Magento 
  developers within 2 hours
→ You'll receive their profiles + fixed 
  price quotes by email
→ You choose who to work with — no pressure

You can also reach us directly at 
hello@magematch.com

Check your inbox at [their email] in 2 hours. 
Is there anything else about your project 
you'd like to add to your brief?"

AFTER-BRIEF GOODBYE + WRAP-UP RULES:
If the user says goodbye/thanks/waiting intent such as
"okay thank you", "thanks", "I will wait", "bye", or similar,
you MUST do this flow immediately:

1) Give the exact closing message above (2 hours)
2) Then ask this exact final question:
"One last thing — would you also like to 
be notified when new Magento developers 
join MageMatch? We add vetted specialists 
every week."
Then present: "Yes / No"

3) If they say yes, respond exactly:
"Perfect, we'll keep you updated! 
You're all set 🎉"

4) If they say no, respond exactly:
"No problem — you're all set 🎉"

NEVER repeat a closing phrase you have already used in this conversation.
Specifically:
- Say "You're all set" maximum ONE time
- After saying it once, use alternatives like:
  "Great, we'll be in touch!"
  "Perfect, check your inbox soon!"
  "All done — watch for our email!"
- Never use the same closing message twice
  in the same conversation

5) Never keep the conversation going indefinitely
after the brief is collected. After yes/no, close politely
without asking more discovery questions.

NEVER promise anything longer than 2 hours 
for the initial match.

BLOCKER DETECTION RULES:
If the merchant mentions ANY of these words or phrases,
immediately treat as CRITICAL urgency and say:
"⚠️ This sounds like it's directly blocking sales 
on your store. Let's treat this as urgent — 
I'll prioritise finding you an available developer 
today."

Blocker keywords to detect:
- checkout not working / checkout broken / 
  can't checkout / checkout error
- add to cart not working / add to cart broken /
  cart error / can't add to cart
- payment failing / payment not working / 
  payment error / orders not going through
- orders not processing / can't place order /
  order error / purchase not working
- 500 error / white screen / site down / 
  store down / website down
- customers can't buy / nobody can checkout /
  losing sales / losing orders

When any blocker is detected:
1. Skip remaining questions
2. Immediately say the urgent message above
3. Ask only for their email to contact them NOW
4. Generate brief with Urgency: 🚨 CRITICAL - BLOCKING SALES`;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type BriefPayload = {
  platform: string;
  version: string;
  problemType: string;
  description: string;
  urgency: string;
  budget: string;
  specialistSkills: string;
  timestamp: string;
};

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

function getLastUserMessage(messages: ChatMessage[]) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === 'user') {
      return messages[index].content;
    }
  }

  return '';
}

function findEmailInUserMessages(messages: ChatMessage[]) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role !== 'user') {
      continue;
    }

    const match = messages[index].content.match(EMAIL_REGEX);
    if (match) {
      return match[0].toLowerCase();
    }
  }

  return null;
}

function findLatestAssistantBrief(messages: ChatMessage[], newAssistantMessage: string) {
  if (/MAGEMATCH PROJECT BRIEF/i.test(newAssistantMessage)) {
    return newAssistantMessage;
  }

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (
      message.role === 'assistant' &&
      /MAGEMATCH PROJECT BRIEF/i.test(message.content)
    ) {
      return message.content;
    }
  }

  return '';
}

function getField(briefText: string, pattern: RegExp) {
  const match = briefText.match(pattern);
  return match?.[1]?.trim() || 'Not provided';
}

function inferProblemTypeFromConversation(text: string) {
  if (/checkout|payment|order|error|bug|broken/i.test(text)) {
    return 'Bug Fix';
  }
  if (/hyv|frontend|theme|ui|ux/i.test(text)) {
    return 'Theme/Frontend';
  }
  if (/speed|performance|core web vitals|lighthouse/i.test(text)) {
    return 'Performance';
  }
  if (/upgrade|2\.4\.|version/i.test(text)) {
    return 'Version Upgrade';
  }
  if (/integration|erp|pim|crm|gateway|shipping/i.test(text)) {
    return 'Integration';
  }
  if (/headless|graphql|pwa|composable/i.test(text)) {
    return 'Headless/Composable';
  }

  return 'General Magento Support';
}

function inferSpecialistSkills(text: string) {
  const skills = [
    { keyword: /hyv/i, label: 'Hyvä' },
    { keyword: /graphql/i, label: 'GraphQL' },
    { keyword: /headless|pwa|composable/i, label: 'Headless/PWA' },
    { keyword: /salesforce/i, label: 'Salesforce' },
    { keyword: /aws/i, label: 'AWS' },
  ]
    .filter((item) => item.keyword.test(text))
    .map((item) => item.label);

  return skills.length ? skills.join(', ') : 'Not specified';
}

function buildBriefPayload(messages: ChatMessage[], assistantMessage: string): BriefPayload {
  const assistantBrief = findLatestAssistantBrief(messages, assistantMessage);
  const userContext = messages
    .filter((message) => message.role === 'user')
    .map((message) => message.content)
    .join('\n');
  const mergedContext = `${assistantBrief}\n${userContext}`;

  const recentUserDescription = messages
    .filter((message) => message.role === 'user')
    .slice(-3)
    .map((message) => message.content)
    .join(' ')
    .trim();

  return {
    platform: getField(assistantBrief, /(?:🔧\s*)?Platform:\s*(.+)/i),
    version: getField(assistantBrief, /(?:📦\s*)?Version:\s*(.+)/i),
    problemType:
      getField(assistantBrief, /(?:⚠️\s*)?Problem Type:\s*(.+)/i) ===
      'Not provided'
        ? inferProblemTypeFromConversation(mergedContext)
        : getField(assistantBrief, /(?:⚠️\s*)?Problem Type:\s*(.+)/i),
    description:
      getField(assistantBrief, /(?:📝\s*)?Description:\s*(.+)/i) ===
      'Not provided'
        ? recentUserDescription || 'Not provided'
        : getField(assistantBrief, /(?:📝\s*)?Description:\s*(.+)/i),
    urgency: getField(assistantBrief, /(?:🚨\s*)?Urgency:\s*(.+)/i),
    budget: getField(assistantBrief, /(?:💶\s*)?Budget:\s*(.+)/i),
    specialistSkills:
      getField(assistantBrief, /(?:⭐\s*)?Specialist Skills(?: Needed)?:\s*(.+)/i) ===
      'Not provided'
        ? inferSpecialistSkills(mergedContext)
        : getField(
            assistantBrief,
            /(?:⭐\s*)?Specialist Skills(?: Needed)?:\s*(.+)/i
          ),
    timestamp: new Date().toISOString(),
  };
}

function shouldTriggerNotifications(
  messages: ChatMessage[],
  assistantMessage: string,
  merchantEmailFromLastMessage: string | null,
  merchantEmailFromConversation: string | null
) {
  const previousAssistantMessages = messages
    .filter((message) => message.role === 'assistant')
    .map((message) => message.content)
    .join('\n');

  const briefCompletedThisTurn =
    /✅\s*Perfect!\s*Your brief has been submitted/i.test(assistantMessage) ||
    /Check your inbox at/i.test(assistantMessage);

  const briefAlreadySubmittedPreviously =
    /✅\s*Perfect!\s*Your brief has been submitted/i.test(
      previousAssistantMessages
    );

  if (merchantEmailFromLastMessage) {
    return true;
  }

  return (
    Boolean(merchantEmailFromConversation) &&
    briefCompletedThisTurn &&
    !briefAlreadySubmittedPreviously
  );
}

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 700,
      messages: [
        { role: 'system', content: MAGEMATCH_SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const message = completion.choices[0]?.message?.content ?? '';

    const lastUserMessage = getLastUserMessage(messages);
    const merchantEmailFromLastMessage =
      lastUserMessage.match(EMAIL_REGEX)?.[0]?.toLowerCase() ?? null;
    const merchantEmailFromConversation = findEmailInUserMessages(messages);
    const merchantEmail =
      merchantEmailFromLastMessage ?? merchantEmailFromConversation;

    if (
      merchantEmail &&
      shouldTriggerNotifications(
        messages,
        message,
        merchantEmailFromLastMessage,
        merchantEmailFromConversation
      )
    ) {
      const brief = buildBriefPayload(messages, message);

      // Send email notification
      sendBriefNotification({
        merchant_email: merchantEmail,
        platform: brief.platform,
        problem_type: brief.problemType,
        urgency: brief.urgency,
        budget: brief.budget,
        description: brief.description,
        specialist_skills: brief.specialistSkills,
      }).catch(() => {
        return null;
      });

      // Save brief to Supabase
      try {
        if (supabaseAdmin) {
          await supabaseAdmin
            .from('briefs')
            .insert({
              merchant_email: merchantEmail,
              platform: brief.platform,
              problem_type: brief.problemType,
              description: brief.description,
              urgency: brief.urgency,
              budget: brief.budget,
              specialist_skills: brief.specialistSkills,
              full_conversation: messages,
            });
        }
      } catch (err) {
        console.error('Failed to save brief to Supabase:', err);
      }
    }

    return Response.json({ message });
  } catch {
    return Response.json(
      { message: 'Sorry — I hit an issue. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
