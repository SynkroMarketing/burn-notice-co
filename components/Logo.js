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

  if (status !== 'ok') {
    if (size === 'hero') {
      return (
        <div className="hero-logo-fallback" aria-label={alt} role="img">
          <div className="spark">✦</div>
          <div className="name">BURN NOTICE</div>
          <div className="name">CO</div>
          <div className="sub">Custom Woodworking &amp; Laser Engraving</div>
        </div>
      );
    }
    return <span className="brand-logo" aria-label={alt} role="img" />;
  }

  return (
    <img
      src="/images/logo.png"
      alt={alt}
      className={size === 'hero' ? 'hero-logo' : 'brand-logo'}
    />
  );
}
