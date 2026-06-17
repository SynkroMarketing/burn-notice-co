import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  ),
  title: 'Burn Notice Co — Custom Laser Engraving',
  description:
    'Handcrafted laser engraving on wood, drinkware, signs, and custom gifts. Made with care in the USA.',
  openGraph: {
    title: 'Burn Notice Co — Custom Laser Engraving',
    description:
      'Handcrafted laser engraving on wood, drinkware, signs, and custom gifts.',
    url: '/',
    siteName: 'Burn Notice Co',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Burn Notice Co custom laser engraving',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Burn Notice Co — Custom Laser Engraving',
    description:
      'Handcrafted laser engraving on wood, drinkware, signs, and custom gifts.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=JetBrains+Mono:wght@400;500;700&family=Sacramento&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
