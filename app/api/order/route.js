import { NextResponse } from 'next/server';
import { getDb, buildSummary } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.type || !body.name || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields (type, name, email).' },
        { status: 400 }
      );
    }
    if (!['shop', 'custom', 'contact'].includes(body.type)) {
      return NextResponse.json({ error: 'Unknown order type.' }, { status: 400 });
    }

    const db = getDb();
    const insert = db.prepare(`
      INSERT INTO orders (type, name, email, payload, summary, total)
      VALUES (@type, @name, @email, @payload, @summary, @total)
    `);
    const result = insert.run({
      type: body.type,
      name: String(body.name).slice(0, 200),
      email: String(body.email).slice(0, 200),
      payload: JSON.stringify(body),
      summary: buildSummary(body),
      total: body.total ? Number(body.total) : null,
    });

    console.log(
      `[order #${result.lastInsertRowid}] ${body.type} from ${body.name} <${body.email}>`
    );

    return NextResponse.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    console.error('Order save failed:', e);
    return NextResponse.json({ error: 'Could not save order.' }, { status: 500 });
  }
}
