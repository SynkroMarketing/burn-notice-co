import path from 'node:path';
import Database from 'better-sqlite3';

let _db;

export function getDb() {
  if (_db) return _db;
  _db = new Database(path.join(process.cwd(), 'orders.db'));
  _db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      type        TEXT NOT NULL,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      payload     TEXT NOT NULL,
      summary     TEXT,
      total       REAL,
      status      TEXT DEFAULT 'new',
      created_at  TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  return _db;
}

export function buildSummary(body) {
  if (body.type === 'shop') {
    const items = (body.items || []).map((i) => `${i.qty}× ${i.name}`).join(', ');
    return `Shop: ${items}`;
  }
  if (body.type === 'custom') {
    return `Custom: ${body.material || '?'} — ${body.item || ''}`;
  }
  if (body.type === 'contact') {
    return `Contact: ${body.subject || '(no subject)'}`;
  }
  return body.type || 'order';
}

export function buildFullText(body) {
  const lines = [];
  for (const [k, v] of Object.entries(body)) {
    if (k === 'type' || v === '' || v == null) continue;
    if (k === 'items' && Array.isArray(v)) {
      lines.push('Items:');
      v.forEach((i) =>
        lines.push(`  • ${i.qty}× ${i.name} @ $${i.price} = $${(i.qty * i.price).toFixed(2)}`)
      );
      continue;
    }
    lines.push(`${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`);
  }
  return lines.join('\n');
}
