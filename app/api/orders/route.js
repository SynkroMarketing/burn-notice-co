import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getDb, buildFullText } from '@/lib/db';
import { ADMIN_COOKIE, isValidToken } from '@/lib/auth';

export async function GET() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const db = getDb();
  const rows = db
    .prepare(
      `SELECT id, type, name, email, payload, summary, total, status, created_at
       FROM orders ORDER BY created_at DESC`
    )
    .all();

  const orders = rows.map((r) => {
    let parsed = {};
    try {
      parsed = JSON.parse(r.payload);
    } catch {}
    return {
      id: r.id,
      type: r.type,
      name: r.name,
      email: r.email,
      summary: r.summary,
      total: r.total,
      status: r.status,
      created_at: r.created_at,
      full: buildFullText(parsed),
    };
  });

  return NextResponse.json({ orders });
}
