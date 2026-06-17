import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, makeToken } from '@/lib/auth';

function getAdminPassword() {
  const pw = process.env.ADMIN_PASSWORD;
  if (pw) return pw;
  if (process.env.NODE_ENV === 'production') return null; // fail closed
  return 'changeme';
}

// Brute-force protection: 5 attempts per IP per 15 minutes (in-memory;
// resets on server restart, which is fine for a single-instance deploy).
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

function timingSafeStringEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export async function POST(req) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429 }
    );
  }

  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    console.error('[admin login] ADMIN_PASSWORD is not set in production.');
    return NextResponse.json({ error: 'Login unavailable.' }, { status: 503 });
  }

  const { password } = await req.json().catch(() => ({}));
  if (!password || !timingSafeStringEqual(password, adminPassword)) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'strict',
    path: '/',
  });
  return res;
}
