'use client';

import { useEffect, useState } from 'react';

export default function Logo({ size = 'sm', alt = 'Burn Notice Co' }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setStatus('ok');
    img.onerror = () => setStatus('fail');
    img.src = '/images/logo.png';
  }, []);

  if (status === 'ok') {
    return (
      <img
        src="/images/logo.png"
        alt={alt}
        className={size === 'hero' ? 'hero-logo' : 'brand-logo'}
      />
    );
  }

  if (size === 'hero') {
    // Light-theme stamped title fallback (matches the reference brand mark)
    return (
      <div className="brand-mark-hero" role="img" aria-label={alt}>
        <div className="brand-mark-flame" aria-hidden="true">🔥</div>
        <div className="brand-mark-rule">
          <span></span>
          <span className="brand-mark-dot" />
          <span></span>
        </div>
        <div className="brand-mark-name">
          Burn Notice <em>Co.</em>
        </div>
        <div className="brand-mark-rule">
          <span></span>
          <span className="brand-mark-dot" />
          <span></span>
        </div>
        <div className="brand-mark-script">Custom Laser-Engraved Gifts</div>
      </div>
    );
  }

  // Small header fallback — circle gradient
  return <span className="brand-logo" aria-label={alt} role="img" />;
}
