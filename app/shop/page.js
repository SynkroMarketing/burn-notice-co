import ShopClient from '@/components/ShopClient';

export const metadata = { title: 'Shop — Burn Notice Co' };

export default function ShopPage() {
  return (
    <>
      <section
        className="wood-plank burned-edge-bottom"
        style={{ padding: '4rem 1rem', textAlign: 'center' }}
      >
        <span
          className="handwritten"
          style={{ color: 'var(--honey)', fontSize: '2rem' }}
        >
          Ready-to-order
        </span>
        <h1 style={{ margin: '0.3rem 0' }}>The Shop</h1>
        <p
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            color: 'var(--parchment)',
            opacity: 0.92,
          }}
        >
          Pre-designed pieces with set prices. Add personalization at checkout, or
          use our custom order form for something totally unique.
        </p>
      </section>

      <ShopClient />
    </>
  );
}
