'use client';

import { Fragment, useEffect, useState } from 'react';

export default function AdminClient() {
  const [authed, setAuthed] = useState(null); // null = loading, true/false
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState({});
  const [loginError, setLoginError] = useState('');

  async function loadOrders() {
    try {
      const res = await fetch('/api/orders');
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setOrders(data.orders || []);
      setAuthed(true);
    } catch {
      setAuthed(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    const password = new FormData(e.currentTarget).get('password');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError('Wrong password. Try again.');
        return;
      }
      await loadOrders();
    } catch {
      setLoginError('Could not reach server.');
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setOrders([]);
  }

  if (authed === null) {
    return (
      <section className="section container">
        <em>Loading...</em>
      </section>
    );
  }

  if (!authed) {
    return (
      <section className="section container">
        <div style={{ maxWidth: '420px', margin: '3rem auto', textAlign: 'center' }}>
          <div className="section-title">
            <span className="handwritten">Authorized only</span>
            <h2>Admin Login</h2>
          </div>
          <form className="form" onSubmit={handleLogin}>
            {loginError && <div className="form-message error">{loginError}</div>}
            <div className="form-row">
              <label htmlFor="admin-password">Password</label>
              <input id="admin-password" name="password" type="password" required autoFocus />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Sign in
            </button>
          </form>
        </div>
      </section>
    );
  }

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.type === filter);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
          padding: '0 1.75rem',
          marginTop: '1rem',
        }}
      >
        <a href="#" onClick={handleLogout} style={{ color: 'var(--ember)' }}>
          Log out
        </a>
      </div>
      <section className="section container">
        <div className="section-title">
          <span className="handwritten">Incoming</span>
          <h2>Orders Dashboard</h2>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          {[
            { key: 'all', label: 'All' },
            { key: 'shop', label: 'Shop Orders' },
            { key: 'custom', label: 'Custom Requests' },
            { key: 'contact', label: 'Contact Messages' },
          ].map((f) => (
            <button
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          {filtered.length === 0 ? (
            <div className="empty-state">
              No orders yet. They&rsquo;ll appear here as they come in.
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Summary</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const summary = (o.summary || '').slice(0, 80);
                  const badge =
                    o.type === 'custom' ? 'custom' : o.type === 'shop' ? 'shop' : 'new';
                  return (
                    <Fragment key={o.id}>
                      <tr
                        onClick={() =>
                          setExpanded((prev) => ({ ...prev, [o.id]: !prev[o.id] }))
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{new Date(o.created_at).toLocaleString()}</td>
                        <td>
                          <span className={`badge ${badge}`}>{o.type}</span>
                        </td>
                        <td>{o.name}</td>
                        <td>{o.email}</td>
                        <td>
                          {summary}
                          {(o.summary || '').length > 80 ? '…' : ''}
                        </td>
                        <td>{o.total ? '$' + o.total : '—'}</td>
                      </tr>
                      {expanded[o.id] && (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ background: '#f8efde', padding: '1rem 1.5rem' }}
                          >
                            <pre
                              style={{
                                whiteSpace: 'pre-wrap',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.92rem',
                                margin: 0,
                              }}
                            >
                              {o.full || ''}
                            </pre>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            color: 'var(--smoke)',
            fontSize: '0.9rem',
          }}
        >
          Click any row to expand details.
        </p>
      </section>
    </>
  );
}
