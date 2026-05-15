'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCart } from './CartProvider';

let stripePromise = null;
function getStripePromise() {
  if (stripePromise) return stripePromise;
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  if (!key) return null;
  stripePromise = loadStripe(key);
  return stripePromise;
}

/**
 * Stripe-powered checkout. Renders a single <PaymentElement /> that the
 * customer's browser populates with credit/debit, Apple Pay, Google Pay,
 * and Link based on what's enabled in your Stripe Dashboard and what
 * their device supports.
 *
 * Flow:
 *   1. On mount, POST /api/checkout/create-intent with the cart → get clientSecret
 *   2. Render <Elements> with that secret
 *   3. On form submit, stripe.confirmPayment() → Stripe handles the payment
 *   4. After success, POST /api/checkout/confirm to persist the order
 */
export default function StripeCheckout() {
  const { cart, total, clearCart } = useCart();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form fields collected outside Stripe (name/email/address/personalization)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    shipping: '',
    personalization: '',
    notes: '',
  });

  const stripePromiseValue = getStripePromise();

  // Whenever the cart changes (and is non-empty), refresh the PaymentIntent.
  useEffect(() => {
    if (cart.length === 0) {
      setClientSecret(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch('/api/checkout/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart,
        email: form.email || undefined,
        name: form.name || undefined,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
          setClientSecret(null);
        } else {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length, cart.map((c) => `${c.id}:${c.qty}`).join(',')]);

  if (!stripePromiseValue) {
    return (
      <div className="form-message error">
        Stripe is enabled but <code>NEXT_PUBLIC_STRIPE_PUBLIC_KEY</code> is not
        set. Add it to <code>.env</code> and restart the dev server.
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div
        style={{
          padding: '1rem',
          textAlign: 'center',
          color: 'var(--smoke)',
        }}
      >
        <em>Add an item to the cart above to start checkout.</em>
      </div>
    );
  }

  if (error) {
    return <div className="form-message error">Checkout error: {error}</div>;
  }

  if (loading || !clientSecret) {
    return (
      <div
        style={{
          padding: '1rem',
          textAlign: 'center',
          color: 'var(--smoke)',
        }}
      >
        <em>Preparing secure checkout…</em>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromiseValue}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#ff5a1a',
            colorBackground: '#fdfaf4',
            colorText: '#2a1308',
            fontFamily: 'system-ui, sans-serif',
            borderRadius: '8px',
          },
        },
      }}
    >
      <StripeForm
        form={form}
        setForm={setForm}
        total={total}
        clearCart={clearCart}
        cart={cart}
      />
    </Elements>
  );
}

function StripeForm({ form, setForm, total, clearCart, cart }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    // Validate Stripe fields before submitting
    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setStatus({ type: 'error', message: submitErr.message });
      setSubmitting(false);
      return;
    }

    // Confirm the payment. We use redirect:'if_required' so we can stay on
    // this page for cards/Apple Pay/Google Pay and only redirect for
    // payment methods that require it (rare for our setup).
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/shop?paid=1',
        receipt_email: form.email,
        payment_method_data: {
          billing_details: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.shipping
              ? { line1: form.shipping.slice(0, 200) }
              : undefined,
          },
        },
      },
      redirect: 'if_required',
    });

    if (error) {
      setStatus({ type: 'error', message: error.message });
      setSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Persist the order server-side (verifies the PI with Stripe).
      try {
        const res = await fetch('/api/checkout/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            name: form.name,
            email: form.email,
            phone: form.phone,
            shipping: form.shipping,
            personalization: form.personalization,
            notes: form.notes,
            items: cart,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Order save failed');
        setStatus({
          type: 'success',
          message: `Payment received! Order #${data.id} confirmed. Receipt sent to ${form.email}.`,
        });
        clearCart();
      } catch (err) {
        // Payment succeeded but we couldn't save the order. The webhook
        // will pick it up. Tell the customer their payment was successful.
        setStatus({
          type: 'success',
          message:
            'Payment received! We had a hiccup saving the order on our end, but the payment went through — we have your details from Stripe and will follow up.',
        });
        clearCart();
      }
    }
    setSubmitting(false);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {status.message && (
        <div className={`form-message ${status.type || ''}`}>{status.message}</div>
      )}

      <div className="form-row two-col">
        <div>
          <label htmlFor="sc-name">Your Name *</label>
          <input
            id="sc-name"
            type="text"
            required
            value={form.name}
            onChange={update('name')}
          />
        </div>
        <div>
          <label htmlFor="sc-email">Email *</label>
          <input
            id="sc-email"
            type="email"
            required
            value={form.email}
            onChange={update('email')}
          />
        </div>
      </div>

      <div className="form-row two-col">
        <div>
          <label htmlFor="sc-phone">Phone</label>
          <input
            id="sc-phone"
            type="tel"
            value={form.phone}
            onChange={update('phone')}
          />
        </div>
        <div>
          <label htmlFor="sc-shipping">Shipping Address *</label>
          <input
            id="sc-shipping"
            type="text"
            required
            placeholder="Street, City, State, ZIP"
            value={form.shipping}
            onChange={update('shipping')}
          />
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="sc-personalization">Personalization Details</label>
        <textarea
          id="sc-personalization"
          placeholder="Names, dates, monograms, special requests..."
          value={form.personalization}
          onChange={update('personalization')}
        />
        <span className="hint">
          Tell us exactly what you&rsquo;d like engraved. Spelling matters — we&rsquo;ll
          burn what you send.
        </span>
      </div>

      <div className="form-row">
        <label htmlFor="sc-notes">Anything else?</label>
        <textarea
          id="sc-notes"
          placeholder="Deadline, special occasion, font preferences..."
          value={form.notes}
          onChange={update('notes')}
        />
      </div>

      <div className="form-row">
        <label>Payment</label>
        <div
          style={{
            background: '#fdfaf4',
            border: '1px solid rgba(107,68,35,0.4)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
          }}
        >
          <PaymentElement
            options={{
              layout: 'tabs',
              defaultValues: {
                billingDetails: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                },
              },
            }}
          />
        </div>
        <span className="hint">
          Cards, Apple Pay, Google Pay, and Link all show up here automatically
          depending on your device.
        </span>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%' }}
        disabled={!stripe || submitting}
      >
        {submitting ? 'Processing…' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
}
