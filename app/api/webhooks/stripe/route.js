import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getStripe } from '@/lib/stripe';
import { getDb, buildSummary } from '@/lib/db';

// Webhooks must read the raw body to verify the signature.
export const dynamic = 'force-dynamic';

/**
 * POST /api/webhooks/stripe
 *
 * Canonical source of truth for "did the customer actually pay?" Stripe
 * fires this asynchronously after a successful charge. Even if the
 * customer closes their browser before /api/checkout/confirm runs, this
 * webhook will still persist the order.
 *
 * Setup:
 *   1. In Stripe Dashboard → Developers → Webhooks → Add endpoint
 *   2. URL: https://YOUR_DOMAIN/api/webhooks/stripe
 *   3. Events: payment_intent.succeeded, payment_intent.payment_failed
 *   4. Copy the signing secret into STRIPE_WEBHOOK_SECRET in your .env
 *
 * For local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
 */
export async function POST(req) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      // Without signature verification anyone could POST a fake
      // payment_intent.succeeded and create "paid" orders. Fail closed —
      // orders still arrive via /api/checkout/confirm, which verifies the
      // PaymentIntent directly with Stripe.
      console.error(
        '[stripe webhook] STRIPE_WEBHOOK_SECRET is not set — rejecting unverified webhook.'
      );
      return NextResponse.json(
        { error: 'Webhook not configured.' },
        { status: 503 }
      );
    }
    console.warn(
      '[stripe webhook] STRIPE_WEBHOOK_SECRET is not set — skipping verification (dev only).'
    );
  }

  const sig = headers().get('stripe-signature');
  const rawBody = await req.text();

  let event;
  try {
    const stripe = getStripe();
    if (secret) {
      event = stripe.webhooks.constructEvent(rawBody, sig, secret);
    } else {
      event = JSON.parse(rawBody);
    }
  } catch (err) {
    console.error('[stripe webhook] signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    try {
      const db = getDb();
      // Idempotency check
      const existing = db
        .prepare(
          `SELECT id FROM orders WHERE json_extract(payload, '$.paymentIntentId') = ?`
        )
        .get(intent.id);
      if (existing) {
        console.log(`[stripe webhook] order ${existing.id} already saved for ${intent.id}`);
        return NextResponse.json({ received: true });
      }

      const metadata = intent.metadata || {};
      const payload = {
        type: 'shop',
        paymentIntentId: intent.id,
        amountCents: intent.amount_received,
        paid: true,
        cart: metadata.cart_items ? JSON.parse(metadata.cart_items) : [],
        name: metadata.customer_name || '',
        email: intent.receipt_email || '',
        source: 'webhook',
      };

      const insert = db.prepare(`
        INSERT INTO orders (type, name, email, payload, summary, total)
        VALUES (@type, @name, @email, @payload, @summary, @total)
      `);
      const result = insert.run({
        type: 'shop',
        name: payload.name.slice(0, 200),
        email: payload.email.slice(0, 200),
        payload: JSON.stringify(payload),
        summary: buildSummary(payload),
        total: intent.amount_received / 100,
      });
      console.log(
        `[stripe webhook] saved order #${result.lastInsertRowid} for ${intent.id}`
      );
    } catch (err) {
      console.error('[stripe webhook] save failed:', err);
      // Return 500 so Stripe retries.
      return NextResponse.json({ error: 'save failed' }, { status: 500 });
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object;
    console.warn(
      `[stripe webhook] payment failed for ${intent.id}: ${intent.last_payment_error?.message}`
    );
  }

  return NextResponse.json({ received: true });
}
