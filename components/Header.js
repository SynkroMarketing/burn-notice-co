'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from './CartProvider';
import Logo from './Logo';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/shop', label: 'Shop' },
  { href: '/custom', label: 'Custom Order' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="brand">
          <Logo />
          Burn Notice Co
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {LINKS.map((l) => {
            const isActive =
              l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={isActive ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="#"
              className="nav-cart"
              onClick={(e) => {
                e.preventDefault();
                openCart();
              }}
            >
              Cart (<span>{count}</span>)
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
