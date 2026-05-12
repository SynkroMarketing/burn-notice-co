'use client';

import { useRef, useState } from 'react';

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    const form = new FormData(e.currentTarget);
    const payload = {
      type: 'contact',
      name: form.get('name'),
      email: form.get('email'),
      subject: form.get('subject'),
      message: form.get('message'),
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
        message: "Message received! We'll be in touch soon.",
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
      <div className="form-row two-col">
        <div>
          <label htmlFor="con-name">Your Name *</label>
          <input id="con-name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="con-email">Email *</label>
          <input id="con-email" name="email" type="email" required />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="con-subject">Subject</label>
        <input
          id="con-subject"
          name="subject"
          type="text"
          placeholder="What's this about?"
        />
      </div>
      <div className="form-row">
        <label htmlFor="con-message">Message *</label>
        <textarea
          id="con-message"
          name="message"
          required
          style={{ minHeight: '140px' }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%' }}
        disabled={submitting}
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
