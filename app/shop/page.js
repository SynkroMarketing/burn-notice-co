import ShopClient from '@/components/ShopClient';

export const metadata = { title: 'Shop — Burn Notice Co' };

export default function ShopPage() {
  return (
    <>
      <section
        className="wood-plank burned-edge-bottom"
        style={{ padding: '5rem 1rem 4.5rem', textAlign: 'center' }}
      >
        <span className="eyebrow">Ready-to-order</span>
        <h1 style={{ margin: '0.5rem 0' }}>The Shop</h1>
        <p
          style={{
            maxWidth: '640px',
            margin: '0.5rem auto 0',
            color: 'var(--cream)',
          }}
        >
          Pre-designed pieces with set prices. Add personalization at checkout —
          or hit the custom form for something totally unique.
        </p>
      </section>

      <ShopClient />
    </>
  );
}
