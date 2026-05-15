import Stripe from 'stripe';
import { PRODUCTS } from './products';

let _stripe = null;

export function getStripe() {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not set. Add it to .env (use a test key starting with sk_test_).'
    );
  }
  _stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  return _stripe;
}

/**
 * Server-side total computation.
 *
 * Never trust totals submitted by the client — a malicious user could change
 * the price in the network request. This function looks up each cart item by
 * id in our canonical PRODUCTS list, multiplies by the trusted price, and
 * returns the total in cents (Stripe's unit).
 *
 * Throws if any item is unknown.
 */
export function computeOrderAmountCents(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error('Cart is empty.');
  }
  const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
  let cents = 0;
  for (const item of cart) {
    const product = byId.get(item.id);
    if (!product) {
      throw new Error(`Unknown product id: ${item.id}`);
    }
    const qty = Math.max(1, Math.min(99, Number(item.qty) || 1));
    cents += Math.round(product.price * 100) * qty;
  }
  if (cents < 50) {
    // Stripe minimum charge is $0.50 USD.
    throw new Error('Order total is below the minimum charge amount.');
  }
  return cents;
}
