'use client';

import { useEffect, useState } from 'react';

export default function Logo({ size = 'sm', alt = 'Burn Notice Co' }) {
  // Probe runs for the hero variant so we can show a styled fallback
  // if the file is missing. Hooks always called in same order to stay
  // compliant with the Rules of Hooks.
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (size !== 'hero') return;
    const img = new window.Image();
    img.onload = () => setStatus('ok');
    img.onerror = () => setStatus('fail');
    img.src = '/images/logo.png';
  }, [size]);

  // Header / small variant — always render the real image directly.
  // No preload probe, no orange-dot fallback. The file lives at
  // /public/images/logo.png and the browser handles loading natively.
  if (size !== 'hero') {
    return (
      <img
        src="/images/logo.png"
        alt={alt}
        className="brand-logo-img"
        draggable={false}
      />
    );
  }

  if (status === 'ok') {
    return (
      <img
        src="/images/logo.png"
        alt={alt}
        className="hero-logo"
        draggable={false}
      />
    );
  }

  // Hero fallback — stamped serif title plate
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
