import { NextResponse } from 'next/server';
import { getDb, buildSummary } from '@/lib/db';

const MAX_BODY_BYTES = 20_000;
const MAX_FIELD_CHARS = 2000;
const MAX_ITEMS = 50;

// Flatten the submission to a bounded set of primitive fields so a caller
// can't stuff megabytes of nested junk into the payload column.
function sanitizeBody(body) {
  const safe = {};
  for (const [k, v] of Object.entries(body)) {
    if (Object.keys(safe).length >= 40) break;
    const key = String(k).slice(0, 100);
    if (k === 'items' && Array.isArray(v)) {
      safe.items = v.slice(0, MAX_ITEMS).map((i) => ({
        id: String(i?.id ?? '').slice(0, 100),
        name: String(i?.name ?? '').slice(0, 200),
        qty: Math.max(1, Math.min(99, Number(i?.qty) || 1)),
        price: Number(i?.price) || 0,
      }));
      continue;
    }
    if (v == null) continue;
    if (typeof v === 'number' || typeof v === 'boolean') {
      safe[key] = v;
    } else if (typeof v === 'string') {
      safe[key] = v.slice(0, MAX_FIELD_CHARS);
    }
    // Drop nested objects/arrays other than items.
  }
  return safe;
}

export async function POST(req) {
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    }
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
    }

    if (!body.type || !body.name || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields (type, name, email).' },
        { status: 400 }
      );
    }
    if (!['shop', 'custom', 'contact'].includes(body.type)) {
      return NextResponse.json({ error: 'Unknown order type.' }, { status: 400 });
    }
    const email = String(body.email).slice(0, 200);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const safeBody = sanitizeBody(body);
    const db = getDb();
    const insert = db.prepare(`
      INSERT INTO orders (type, name, email, payload, summary, total)
      VALUES (@type, @name, @email, @payload, @summary, @total)
    `);
    const result = insert.run({
      type: body.type,
      name: String(body.name).slice(0, 200),
      email,
      payload: JSON.stringify(safeBody),
      summary: buildSummary(safeBody),
      total: body.total ? Number(body.total) : null,
    });

    console.log(
      `[order #${result.lastInsertRowid}] ${body.type} from ${safeBody.name} <${email}>`
    );

    return NextResponse.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    console.error('Order save failed:', e);
    return NextResponse.json({ error: 'Could not save order.' }, { status: 500 });
  }
}
