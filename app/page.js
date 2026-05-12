import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="hero wood-plank burned-edge-bottom">
        <div className="hero-inner">
          <span className="handwritten">Handcrafted &amp; one-of-a-kind</span>
          <h1>
            Burned With Care.
            <br />
            Made To Last.
          </h1>
          <p>
            Custom laser engraving on tumblers, signs, cutting boards, wedding gifts —
            or just about any material that won&rsquo;t break.
          </p>
          <div className="hero-buttons">
            <Link href="/shop" className="btn btn-primary">
              Shop Now
            </Link>
            <Link href="/custom" className="btn btn-outline">
              Request a Custom Piece
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <span className="handwritten">What we make</span>
          <h2>From kitchens to keepsakes</h2>
        </div>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          Every piece comes off the laser one at a time. No mass production, no
          shortcuts — just clean, precise work that turns ordinary items into
          something worth keeping.
        </p>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">🍹</div>
            <h3>Drinkware</h3>
            <p>Tumblers, mugs, flasks — personalized for gifts, gear, or events.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🌵</div>
            <h3>Wood &amp; Kitchen</h3>
            <p>Cutting boards, serving trays, and other pieces that get used every day.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🏠</div>
            <h3>Signs &amp; Wall Art</h3>
            <p>House signs, business plaques, decorative pieces with serious presence.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎁</div>
            <h3>Custom Gifts</h3>
            <p>Weddings, anniversaries, memorials — the engravings that stay forever.</p>
          </div>
        </div>
      </section>

      <section
        className="section wood-light burned-edge-bottom"
        style={{ marginTop: 0 }}
      >
        <div className="container">
          <div className="section-title">
            <span className="handwritten">Shop favorites</span>
            <h2>A few popular pieces</h2>
          </div>
          <div className="grid">
            <div className="card">
              <div className="card-image">Engraved Tumbler</div>
              <div className="card-body">
                <h3>20oz Engraved Tumbler</h3>
                <p>
                  Insulated stainless steel. Personalize with name, monogram, or full
                  design.
                </p>
                <div className="card-price">$28</div>
                <div className="card-actions">
                  <Link
                    href="/shop"
                    className="btn btn-primary"
                    style={{ flex: 1, textAlign: 'center' }}
                  >
                    View in Shop
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-image">Cutting Board</div>
              <div className="card-body">
                <h3>Walnut Cutting Board</h3>
                <p>
                  Solid walnut, food-safe finish. Great for weddings &amp; housewarmings.
                </p>
                <div className="card-price">$65</div>
                <div className="card-actions">
                  <Link
                    href="/shop"
                    className="btn btn-primary"
                    style={{ flex: 1, textAlign: 'center' }}
                  >
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
                  <Link
                    href="/shop"
                    className="btn btn-primary"
                    style={{ flex: 1, textAlign: 'center' }}
                  >
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

      <section className="section container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <span className="handwritten">Don&rsquo;t see exactly what you want?</span>
          <h2>Tell us what you&rsquo;ve got in mind.</h2>
          <p style={{ fontSize: '1.1rem' }}>
            If it&rsquo;s flat enough to engrave and tough enough not to break, we can
            probably burn your design into it. Send us your idea and we&rsquo;ll get
            back to you with a quote.
          </p>
          <div>
            <Link href="/custom" className="btn btn-primary">
              Start a custom order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
