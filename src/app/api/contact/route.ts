import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Rate Limiting (In-Memory) ───────────────────────────────
// يخزن عدد الطلبات لكل IP ويمنع الإرسال المتكرر
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_MAX = 5;           // الحد الأقصى: 5 رسائل
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // لكل ساعة (60 دقيقة)

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count += 1;
  return false;
}

// ── Email Validation ────────────────────────────────────────
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// ── Input Sanitization ──────────────────────────────────────
function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// ── POST Handler ────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await req.json();
    const { name, email, message } = body;

    // 3. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input types' },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name is too long (max 100 characters)' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    // 4. Sanitize inputs
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    // 5. Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 6. Email template
    const mailOptions = {
      from: `"${safeName} - Portfolio" <${process.env.EMAIL_USER}>`,
      to: `<${process.env.EMAIL_USER}>`,
      replyTo: safeEmail,
      subject: `New Contact Request from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6b21a8; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Message Received</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">Sent from Kamal Portfolio</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}