import Link from 'next/link';
import Logo from '@/components/Logo';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Custom Woodworking · Laser Engraving</span>
            <h1>
              Custom Engraved <em>Gifts</em>
              <br />
              That Last A Lifetime.
            </h1>
            <p className="hero-script">Make every piece one of a kind.</p>
            <p>
              Engraved as a hobby — now creating custom designs and products for
              friends, family, and businesses. Tumblers, cutting boards, leather,
              signs, and just about anything else that holds a burn.
            </p>
            <div className="hero-buttons">
              <Link href="/custom" className="btn btn-primary">
                Start a Custom Piece
              </Link>
              <Link href="/gallery" className="btn btn-outline">
                Browse Our Work
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo" role="img" aria-label="Featured engraved piece">
              <div className="hero-photo-caption">Recent work</div>
            </div>
            <div className="stamp-badge" aria-hidden="true">
              Custom Laser
              <strong>Engraving</strong>
              Available
            </div>
          </div>
        </div>
      </section>

      <div className="quality-strip">
        <span>Handcrafted</span>
        <span className="sep">★</span>
        <span>Precision Engraved</span>
        <span className="sep">★</span>
        <span>Made To Last</span>
      </div>

      <section className="trust-strip">
        <div className="trust-strip-grid">
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="13" rx="1"/>
                <path d="M3 12h18"/>
                <path d="M12 8v13"/>
                <path d="M12 8c-2 0-4-1-4-3s2-3 4-1 4-1 4-3-2-3-4-1"/>
              </svg>
            </div>
            <div className="trust-label">
              Perfect
              <br />
              For Gifts
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div className="trust-label">
              Personal
              <br />
              Style
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8h14l-1 12H6L5 8z"/>
                <path d="M9 8V5a3 3 0 0 1 6 0v3"/>
              </svg>
            </div>
            <div className="trust-label">
              Everyday
              <br />
              Carry
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c0 4 3 6 3 9a3 3 0 0 1-6 0c0-3 3-5 3-9z"/>
                <path d="M9 14c-1 1-1 3 0 4s3 1 4 0"/>
              </svg>
            </div>
            <div className="trust-label">
              Built To
              <br />
              Burn
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <span className="eyebrow">What we make</span>
          <h2>From Kitchens To Keepsakes</h2>
          <div className="ornament"><span className="dot" /></div>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--muted)' }}>
            Every piece comes off the laser one at a time. No mass production, no
            shortcuts — just clean, precise work that turns ordinary objects into
            something worth keeping.
          </p>
        </div>
        <div className="features">
          <div className="feature">
            <div className="feature-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2h8v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2z"/>
                <path d="M12 12v8"/><path d="M9 22h6"/>
              </svg>
            </div>
            <h3>Drinkware</h3>
            <p>Tumblers, mugs, flasks — personalized for gifts, gear, or events.</p>
          </div>
          <div className="feature">
            <div className="feature-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="12" rx="2"/>
                <path d="M3 10h18"/><path d="M9 14h6"/>
              </svg>
            </div>
            <h3>Wood &amp; Kitchen</h3>
            <p>Cutting boards, charcuterie boards, and pieces that get used every day.</p>
          </div>
          <div className="feature">
            <div className="feature-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="5" width="16" height="11" rx="1"/>
                <path d="M9 16v4"/><path d="M15 16v4"/><path d="M7 20h10"/>
              </svg>
            </div>
            <h3>Signs &amp; Wall Art</h3>
            <p>House signs, business plaques, and decorative pieces with presence.</p>
          </div>
          <div className="feature">
            <div className="feature-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="13" rx="1"/>
                <path d="M3 12h18"/><path d="M12 8v13"/>
                <path d="M12 8c-2 0-4-1-4-3s2-3 4-1 4-1 4-3-2-3-4-1"/>
              </svg>
            </div>
            <h3>Custom Gifts</h3>
            <p>Weddings, anniversaries, memorials — engravings that stay forever.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <span className="eyebrow">Shop favorites</span>
          <h2>A Few Popular Pieces</h2>
          <div className="ornament"><span className="dot" /></div>
        </div>
        <div className="grid">
          <div className="card">
            <div className="card-image">Engraved Tumbler</div>
            <div className="card-body">
              <h3>20oz Engraved Tumbler</h3>
              <p>Insulated stainless steel. Personalize with name, monogram, or full design.</p>
              <div className="card-price">$28</div>
              <div className="card-actions">
                <Link href="/shop" className="btn btn-primary" style={{ flex: 1 }}>
                  View in Shop
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-image">Cutting Board</div>
            <div className="card-body">
              <h3>Walnut Cutting Board</h3>
              <p>Solid walnut, food-safe finish. Great for weddings &amp; housewarmings.</p>
              <div className="card-price">$65</div>
              <div className="card-actions">
                <Link href="/shop" className="btn btn-primary" style={{ flex: 1 }}>
                  View in Shop
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-image">Custom Sign</div>
            <div className="card-body">
              <h3>Family Name Sign</h3>
              <p>Rustic wood plank with your family name and est. year. Multiple sizes.</p>
              <div className="card-price">$85+</div>
              <div className="card-actions">
                <Link href="/shop" className="btn btn-primary" style={{ flex: 1 }}>
                  View in Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/shop" className="btn btn-outline">
            See the Full Shop →
          </Link>
        </div>
      </section>

      <section className="cta-band">
        <span className="eyebrow">Let&rsquo;s Create Something Amazing</span>
        <h2>
          Have an idea? <em>Let&rsquo;s make it real.</em>
        </h2>
        <div className="ornament"><span className="dot" /></div>
        <p>
          If you need a custom design for yourself, family, friends, or a
          business — reach out and we&rsquo;ll bring it to life.
        </p>
        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/custom" className="btn btn-primary">
            Start a Custom Order
          </Link>
          <a
            href="https://www.instagram.com/burn_notice_engraving/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            DM Us on Instagram
          </a>
        </div>
      </section>
    </>
  );
}
