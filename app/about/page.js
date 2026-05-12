import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'About — Burn Notice Co' };

export default function AboutPage() {
  return (
    <>
      <section
        className="wood-plank burned-edge-bottom"
        style={{ padding: '5rem 1rem 4.5rem', textAlign: 'center' }}
      >
        <span className="eyebrow">The Story</span>
        <h1 style={{ margin: '0.5rem 0' }}>A Passion Turned Into Purpose</h1>
        <p
          style={{
            maxWidth: '680px',
            margin: '0.5rem auto 0',
            color: 'var(--cream)',
          }}
        >
          Engraved as a hobby — now creating custom designs and products for
          friends, family, and businesses.
        </p>
      </section>

      <section className="section container">
        <div className="story">
          <p>
            Burn Notice Co started as a side project with one laser and a pile
            of scrap wood. The goal was simple: take ordinary objects and turn
            them into the kind of thing someone hangs on to for years.
          </p>
          <p>
            Today the work covers everything that fits under a laser — tumblers
            and cutting boards, leather wallets and house signs, wedding gifts
            that someone actually keeps. Every piece is designed and made by
            hand, one at a time. Nothing gets mass-produced, and nothing leaves
            the shop until it looks right.
          </p>
          <p>
            Most of what comes through here is custom work. People bring in an
            idea, a memory, a name, a date — and together we figure out what it
            should look like burned into the wood. It&rsquo;s slower than the
            alternatives. That&rsquo;s the point.
          </p>
          <p>
            Have something you want made? <Link href="/custom">Send over the details</Link> or
            shoot a message on{' '}
            <a
              href="https://www.instagram.com/burn_notice_engraving/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            . We&rsquo;ll go from there.
          </p>
        </div>
      </section>

      <section
        className="section wood-light burned-edge-bottom"
        style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
      >
        <div className="container">
          <div className="section-title">
            <span className="handwritten">Say hi</span>
            <h2>Get in touch</h2>
          </div>
          <ContactForm />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p>
              Or find us on{' '}
              <a
                href="https://www.instagram.com/burn_notice_engraving/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>@burn_notice_engraving</strong> on Instagram
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
