import { NextResponse } from 'next/server';
import { getStripe, computeOrderAmountCents } from '@/lib/stripe';

/**
 * POST /api/checkout/create-intent
 *
 * Creates a Stripe PaymentIntent for the current cart and returns the
 * client_secret so the browser can render the Payment Element.
 *
 * Body: { cart: [{ id, qty, ...}], email?, name? }
 * Returns: { clientSecret, amount }
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const cart = body.cart;

    let amount;
    try {
      amount = computeOrderAmountCents(cart);
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    const stripe = getStripe();
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      // Enables Apple Pay, Google Pay, Link, and all card brands automatically
      // based on what's enabled in your Stripe Dashboard.
      automatic_payment_methods: { enabled: true },
      receipt_email: body.email || undefined,
      metadata: {
        customer_name: String(body.name || '').slice(0, 200),
        cart_items: JSON.stringify(
          cart.map((i) => ({ id: i.id, qty: i.qty }))
        ).slice(0, 500),
      },
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      amount,
      paymentIntentId: intent.id,
    });
  } catch (e) {
    console.error('create-intent failed:', e);
    return NextResponse.json(
      { error: e.message || 'Could not create payment intent.' },
      { status: 500 }
    );
  }
}
