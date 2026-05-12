import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, makeToken } from '@/lib/auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

export async function POST(req) {
  const { password } = await req.json().catch(() => ({}));
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'strict',
    path: '/',
  });
  return res;
}
