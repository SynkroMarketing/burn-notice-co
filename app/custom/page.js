import CustomForm from '@/components/CustomForm';

export const metadata = { title: 'Custom Order — Burn Notice Co' };

export default function CustomPage() {
  return (
    <>
      <section
        className="wood-plank burned-edge-bottom"
        style={{ padding: '5rem 1rem 4.5rem', textAlign: 'center' }}
      >
        <span className="eyebrow">One-of-a-Kind</span>
        <h1 style={{ margin: '0.5rem 0' }}>Custom Orders</h1>
        <p
          style={{
            maxWidth: '700px',
            margin: '0.5rem auto 0',
            color: 'var(--cream)',
          }}
        >
          Got an idea? Tell us what you&rsquo;d like burned, on what, and by
          when. We&rsquo;ll get back with a quote — usually within 24 hours.
        </p>
      </section>

      <section className="section container">
        <div className="features" style={{ marginBottom: '3rem' }}>
          <div className="feature">
            <div className="feature-icon">1</div>
            <h3>Tell us your idea</h3>
            <p>Fill out the form below. The more detail, the better the quote.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">2</div>
            <h3>Get a quote</h3>
            <p>We respond within 24 hours with price, timeline, and any questions.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">3</div>
            <h3>Approve &amp; pay</h3>
            <p>Send a deposit, we burn it, ship it, and you&rsquo;ve got something unique.</p>
          </div>
        </div>

        <CustomForm />
      </section>
    </>
  );
}
