'use client';

import { useEffect, useState } from 'react';

/**
 * Renders a product/gallery card image with graceful fallback.
 *
 * Mirrors the pattern in components/Logo.js: pre-flight the image via
 * `new Image()` so we only mount an <img> after we know it loads. If
 * the file is missing (or `src` is empty), falls back to the existing
 * text-label placeholder — no broken-image icon, no flicker.
 */
export default function CardImage({ src, label }) {
  const [status, setStatus] = useState(src ? 'loading' : 'fail');

  useEffect(() => {
    if (!src) {
      setStatus('fail');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setStatus('ok');
    };
    img.onerror = () => {
      if (!cancelled) setStatus('fail');
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (status === 'ok') {
    return (
      <div className="card-image">
        <img src={src} alt={label || ''} />
      </div>
    );
  }

  return <div className="card-image">{label}</div>;
}
