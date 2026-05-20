import Link from 'next/link';
import GalleryClient from '@/components/GalleryClient';

export const metadata = { title: 'Gallery — Burn Notice Co' };

export default function GalleryPage() {
  return (
    <>
      <section
        className="wood-plank burned-edge-bottom"
        style={{ padding: '5rem 1rem 4.5rem', textAlign: 'center' }}
      >
        <span className="eyebrow">Past Work</span>
        <h1 style={{ margin: '0.5rem 0' }}>The Gallery</h1>
        <p
          style={{
            maxWidth: '640px',
            margin: '0.5rem auto 0',
            color: 'var(--cream)',
          }}
        >
          A look at what&rsquo;s come off the laser.
        </p>
      </section>

      <section className="section container">
        <GalleryClient />
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p
            style={{
              fontSize: '1.05rem',
              maxWidth: '600px',
              margin: '0 auto 1.2rem',
            }}
          >
            Have something you want made? Send over your idea.
          </p>
          <Link href="/custom" className="btn btn-primary">
            Start a custom order
          </Link>
        </div>
      </section>
    </>
  );
}
