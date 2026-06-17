import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getDb, buildSummary } from '@/lib/db';
import { PRODUCTS } from '@/lib/products';

const clip = (v, n) => String(v ?? '').slice(0, n);

// Rebuild the itemization from the PaymentIntent's metadata (which we set
// server-side at intent creation) instead of trusting the client's claimed
// items — otherwise a buyer could pay for one thing and have the order
// record claim another.
function itemsFromIntent(intent) {
  try {
    const ids = JSON.parse(intent.metadata?.cart_items || '[]');
    const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
    return ids.map(({ id, qty }) => {
      const p = byId.get(id);
      const q = Math.max(1, Math.min(99, Number(qty) || 1));
      return p
        ? { id, qty: q, name: p.name, price: p.price }
        : { id: clip(id, 100), qty: q };
    });
  } catch {
    return [];
  }
}

/**
 * POST /api/checkout/confirm
 *
 * Called by the browser immediately after stripe.confirmPayment() succeeds.
 * Verifies the PaymentIntent with Stripe (don't trust the client), then
 * persists the order to SQLite. The Stripe webhook is the canonical source
 * of truth for "paid" status — this endpoint is the fast-path for the
 * customer's confirmation experience.
 *
 * Idempotent: if an order already exists for this PaymentIntent, returns it.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { paymentIntentId } = body;
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing paymentIntentId.' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== 'succeeded') {
      return NextResponse.json(
        { error: `Payment not yet succeeded (status: ${intent.status}).` },
        { status: 400 }
      );
    }

    const db = getDb();

    // Idempotency: did we already save this one (via webhook race)?
    const existing = db
      .prepare(
        `SELECT id FROM orders WHERE json_extract(payload, '$.paymentIntentId') = ?`
      )
      .get(paymentIntentId);
    if (existing) {
      return NextResponse.json({ ok: true, id: existing.id, duplicate: true });
    }

    const totalCents = intent.amount_received || intent.amount;
    // Whitelist + cap the client-supplied fields instead of spreading the
    // raw body into the stored payload.
    const payloadObj = {
      type: 'shop',
      paymentIntentId,
      amountCents: totalCents,
      paid: true,
      name: clip(body.name, 200),
      email: clip(body.email || intent.receipt_email, 200),
      phone: clip(body.phone, 50),
      shipping: clip(body.shipping, 500),
      personalization: clip(body.personalization, 2000),
      notes: clip(body.notes, 2000),
      items: itemsFromIntent(intent),
    };

    const insert = db.prepare(`
      INSERT INTO orders (type, name, email, payload, summary, total)
      VALUES (@type, @name, @email, @payload, @summary, @total)
    `);
    const result = insert.run({
      type: 'shop',
      name: payloadObj.name,
      email: payloadObj.email,
      payload: JSON.stringify(payloadObj),
      summary: buildSummary(payloadObj),
      total: totalCents / 100,
    });

    console.log(
      `[order #${result.lastInsertRowid}] PAID via Stripe (${paymentIntentId}) - $${(totalCents / 100).toFixed(2)}`
    );

    return NextResponse.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    console.error('checkout/confirm failed:', e);
    return NextResponse.json(
      { error: 'Could not confirm payment.' },
      { status: 500 }
    );
  }
}
