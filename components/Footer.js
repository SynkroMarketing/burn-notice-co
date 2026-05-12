import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h4>Burn Notice Co</h4>
          <p style={{ fontSize: '0.9rem' }}>
            Custom laser engraving, handcrafted one piece at a time.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <p style={{ fontSize: '0.9rem' }}>
            <Link href="/shop">Browse Products</Link>
            <br />
            <Link href="/custom">Custom Orders</Link>
            <br />
            <Link href="/gallery">Gallery</Link>
          </p>
        </div>
        <div>
          <h4>Follow</h4>
          <p style={{ fontSize: '0.9rem' }}>
            <a
              href="https://www.instagram.com/burn_notice_engraving/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram →
            </a>
          </p>
        </div>
      </div>
      <div className="copyright">© {year} Burn Notice Co. All work made by hand.</div>
    </footer>
  );
}
