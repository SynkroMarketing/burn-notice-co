import Link from 'next/link';
import Logo from '@/components/Logo';

export default function HomePage() {
  return (
    <>
      <section className="hero wood-plank burned-edge-bottom">
        <div className="ember-glow left" />
        <div className="ember-glow right" />

        <div className="hero-grid">
          <div className="hero-logo-wrap">
            <Logo size="hero" />
          </div>

          <div className="hero-copy">
            <span className="eyebrow">Custom Woodworking · Laser Engraving</span>
            <span className="handwritten">A passion turned into</span>
            <h1>Purpose, Burned In.</h1>
            <p>
              Engraved as a hobby — now creating one-of-a-kind designs and
              products for friends, family, and businesses. If you can dream it,
              we can probably burn it. Let&rsquo;s make it real.
            </p>
            <div className="hero-buttons">
              <Link href="/custom" className="btn btn-primary">
                Start a Custom Piece
              </Link>
              <Link href="/gallery" className="btn btn-outline">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-pillars">
        <div className="brand-pillars-grid">
          <div className="pillar">
            <div className="pillar-icon" aria-hidden="true">✎</div>
            <div className="pillar-label">Custom Designs</div>
            <div className="pillar-tag">Built from scratch around your idea.</div>
          </div>
          <div className="pillar">
            <div className="pillar-icon" aria-hidden="true">⚒</div>
            <div className="pillar-label">Quality Craftsmanship</div>
            <div className="pillar-tag">Real wood, sharp lines, no shortcuts.</div>
          </div>
          <div className="pillar">
            <div className="pillar-icon" aria-hidden="true">♥</div>
            <div className="pillar-label">Made With Care</div>
            <div className="pillar-tag">Every piece comes off the laser by hand.</div>
          </div>
          <div className="pillar">
            <div className="pillar-icon" aria-hidden="true">✦</div>
            <div className="pillar-label">Something Amazing</div>
            <div className="pillar-tag">Let&rsquo;s create something worth keeping.</div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <span className="handwritten">What we make</span>
          <h2>From Kitchens To Keepsakes</h2>
        </div>
        <p style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          Every piece comes off the laser one at a time. No mass production, no
          shortcuts — just clean, precise work that turns ordinary objects into
          something worth keeping.
        </p>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">🥃</div>
            <h3>Drinkware</h3>
            <p>Tumblers, mugs, flasks — personalized for gifts, gear, or events.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🪵</div>
            <h3>Wood &amp; Kitchen</h3>
            <p>Cutting boards, charcuterie boards, and pieces that get used every day.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🏷</div>
            <h3>Signs &amp; Wall Art</h3>
            <p>House signs, business plaques, and decorative pieces with presence.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎁</div>
            <h3>Custom Gifts</h3>
            <p>Weddings, anniversaries, memorials — engravings that stay forever.</p>
          </div>
        </div>
      </section>

      <section className="section wood-light burned-edge-bottom" style={{ marginTop: 0 }}>
        <div className="container">
          <div className="section-title">
            <span className="handwritten">Shop favorites</span>
            <h2>A Few Popular Pieces</h2>
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
            <Link href="/shop" className="btn btn-dark">
              See the full shop →
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <span className="eyebrow">Let&rsquo;s Create Something Amazing</span>
          <h2>Have an idea? Let&rsquo;s make it a reality.</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto 1.5rem' }}>
            If you need a custom design for yourself, family, friends, or a
            business — reach out and we&rsquo;ll bring it to life.
          </p>
          <Link href="/custom" className="btn btn-primary">
            Start a Custom Order
          </Link>
        </div>
      </section>
    </>
  );
}
