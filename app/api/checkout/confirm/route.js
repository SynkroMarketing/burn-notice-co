import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getDb, buildSummary } from '@/lib/db';

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
    const payloadObj = {
      ...body,
      type: 'shop',
      paymentIntentId,
      amountCents: totalCents,
      paid: true,
    };

    const insert = db.prepare(`
      INSERT INTO orders (type, name, email, payload, summary, total)
      VALUES (@type, @name, @email, @payload, @summary, @total)
    `);
    const result = insert.run({
      type: 'shop',
      name: String(body.name || '').slice(0, 200),
      email: String(body.email || intent.receipt_email || '').slice(0, 200),
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
      { error: e.message || 'Could not confirm payment.' },
      { status: 500 }
    );
  }
}
