'use client';

import { useRef, useState } from 'react';

export default function CustomForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    const form = new FormData(e.currentTarget);
    const payload = {
      type: 'custom',
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      deadline: form.get('deadline'),
      material: form.get('material'),
      item: form.get('item'),
      design: form.get('design'),
      quantity: form.get('quantity'),
      budget: form.get('budget'),
      reference: form.get('reference'),
      notes: form.get('notes'),
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
          "Request sent! We'll review and get back to you within 24 hours with a quote.",
      });
      formRef.current?.reset();
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong: ' + err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" ref={formRef} onSubmit={handleSubmit}>
      {status.message && (
        <div className={`form-message ${status.type || ''}`}>{status.message}</div>
      )}

      <div className="section-title" style={{ marginBottom: '1.5rem' }}>
        <span className="handwritten">Your request</span>
        <h2 style={{ margin: 0 }}>Send us the details</h2>
      </div>

      <div className="form-row two-col">
        <div>
          <label htmlFor="cf-name">Your Name *</label>
          <input id="cf-name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="cf-email">Email *</label>
          <input id="cf-email" name="email" type="email" required />
        </div>
      </div>

      <div className="form-row two-col">
        <div>
          <label htmlFor="cf-phone">Phone (optional)</label>
          <input id="cf-phone" name="phone" type="tel" />
        </div>
        <div>
          <label htmlFor="cf-deadline">Need it by (date)</label>
          <input id="cf-deadline" name="deadline" type="date" />
          <span className="hint">
            Approximate is fine. We&rsquo;ll let you know if it&rsquo;s possible.
          </span>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="cf-material">What material? *</label>
        <select id="cf-material" name="material" required defaultValue="">
          <option value="">-- Pick one --</option>
          <option>Wood (cutting board, sign, plaque)</option>
          <option>Tumbler / drinkware</option>
          <option>Leather</option>
          <option>Slate / stone</option>
          <option>Glass</option>
          <option>Metal (anodized)</option>
          <option>Other — describe below</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="cf-item">What&rsquo;s the item? *</label>
        <input
          id="cf-item"
          name="item"
          type="text"
          placeholder="e.g. 12x16 walnut cutting board, set of 6 whiskey glasses..."
          required
        />
        <span className="hint">
          Include dimensions if you know them, or describe roughly.
        </span>
      </div>

      <div className="form-row">
        <label htmlFor="cf-design">What should we engrave? *</label>
        <textarea
          id="cf-design"
          name="design"
          placeholder="Names, dates, quote text, monogram style, any imagery or logo you want included..."
          required
        />
      </div>

      <div className="form-row two-col">
        <div>
          <label htmlFor="cf-quantity">Quantity</label>
          <input id="cf-quantity" name="quantity" type="number" min="1" defaultValue="1" />
        </div>
        <div>
          <label htmlFor="cf-budget">Budget range</label>
          <select id="cf-budget" name="budget" defaultValue="">
            <option value="">-- Pick one --</option>
            <option>Under $50</option>
            <option>$50 — $100</option>
            <option>$100 — $250</option>
            <option>$250 — $500</option>
            <option>$500+</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="cf-reference">Reference / inspiration links</label>
        <textarea
          id="cf-reference"
          name="reference"
          placeholder="Paste links to images, Pinterest, Instagram posts, or describe the style you want..."
        />
        <span className="hint">
          If you have an image file, mention it here — we&rsquo;ll reach out for the
          upload after we connect.
        </span>
      </div>

      <div className="form-row">
        <label htmlFor="cf-notes">Anything else we should know?</label>
        <textarea
          id="cf-notes"
          name="notes"
          placeholder="Special occasion, recipient, sentimental notes..."
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%' }}
        disabled={submitting}
      >
        {submitting ? 'Sending...' : 'Send my request'}
      </button>
    </form>
  );
}
