'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { PRODUCTS } from '@/lib/products';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'drinkware', label: 'Drinkware' },
  { key: 'wood', label: 'Wood & Kitchen' },
  { key: 'signs', label: 'Signs' },
  { key: 'gifts', label: 'Gifts' },
];

export default function ShopClient() {
  const { addToCart, cart, total, clearCart } = useCart();
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  const visible = PRODUCTS.filter((p) => filter === 'all' || p.category === filter);

  async function handleSubmit(e) {
    e.preventDefault();
    if (cart.length === 0) {
      setStatus({ type: 'error', message: 'Your cart is empty. Add a product first.' });
      return;
    }
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    const form = new FormData(e.currentTarget);
    const payload = {
      type: 'shop',
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      shipping: form.get('shipping'),
      personalization: form.get('personalization'),
      notes: form.get('notes'),
      items: cart,
      total,
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Submission failed');
      }
      setStatus({
        type: 'success',
        message:
          "Order received! We'll follow up within 24 hours with payment details. Check your email.",
      });
      e.target.reset();
      clearCart();
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Hmm, something went wrong: ' + err.message + '.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section container">
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid">
        {visible.map((p) => (
          <article className="card" key={p.id}>
            <div className="card-image">{p.image}</div>
            <div className="card-body">
              <h3>{p.displayName || p.name}</h3>
              <p>{p.description}</p>
              <div className="card-price">${p.price}</div>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={() =>
                    addToCart({ id: p.id, name: p.name, price: p.price })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div id="checkout" style={{ marginTop: '4rem' }}>
        <div className="section-title">
          <span className="handwritten">Ready to go</span>
          <h2>Checkout</h2>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {status.message && (
            <div className={`form-message ${status.type || ''}`}>
              {status.message}
            </div>
          )}

          <div className="form-row">
            <label>Your Order</label>
            <div
              style={{
                background: '#fdfaf4',
                border: '1px solid rgba(107,68,35,0.4)',
                borderRadius: 'var(--radius)',
                padding: '0.8rem',
              }}
            >
              {cart.length === 0 ? (
                <em style={{ color: 'var(--smoke)' }}>
                  Add items from the shop above to see them here.
                </em>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {cart.map((item) => (
                      <tr
                        key={item.id}
                        style={{ borderBottom: '1px solid rgba(107,68,35,0.15)' }}
                      >
                        <td style={{ padding: '0.4rem 0' }}>{item.name}</td>
                        <td style={{ padding: '0.4rem 0', textAlign: 'right' }}>
                          {item.qty} × ${item.price}
                        </td>
                        <td
                          style={{
                            padding: '0.4rem 0',
                            textAlign: 'right',
                            fontWeight: 600,
                          }}
                        >
                          ${(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2} style={{ paddingTop: '0.6rem', fontWeight: 700 }}>
                        Total
                      </td>
                      <td
                        style={{
                          paddingTop: '0.6rem',
                          textAlign: 'right',
                          fontWeight: 700,
                          color: 'var(--ember)',
                        }}
                      >
                        ${total.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="form-row two-col">
            <div>
              <label htmlFor="co-name">Your Name *</label>
              <input id="co-name" name="name" type="text" required />
            </div>
            <div>
              <label htmlFor="co-email">Email *</label>
              <input id="co-email" name="email" type="email" required />
            </div>
          </div>

          <div className="form-row two-col">
            <div>
              <label htmlFor="co-phone">Phone</label>
              <input id="co-phone" name="phone" type="tel" />
            </div>
            <div>
              <label htmlFor="co-shipping">Shipping Address *</label>
              <input
                id="co-shipping"
                name="shipping"
                type="text"
                placeholder="Street, City, State, ZIP"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="co-personalization">Personalization Details</label>
            <textarea
              id="co-personalization"
              name="personalization"
              placeholder="Names, dates, monograms, special requests..."
            />
            <span className="hint">
              Tell us exactly what you&rsquo;d like engraved. Spelling matters — we&rsquo;ll
              burn what you send.
            </span>
          </div>

          <div className="form-row">
            <label htmlFor="co-notes">Anything else?</label>
            <textarea
              id="co-notes"
              name="notes"
              placeholder="Deadline, special occasion, font preferences..."
            />
          </div>

          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--smoke)',
              marginBottom: '1rem',
            }}
          >
            <strong>Note:</strong> Submitting this form sends us your order — we&rsquo;ll
            follow up with payment details (Venmo, PayPal, or card) within 24 hours.
          </p>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Place Order'}
          </button>
        </form>
      </div>
    </section>
  );
}
