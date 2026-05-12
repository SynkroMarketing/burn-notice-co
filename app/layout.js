import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata = {
  title: 'Burn Notice Co — Custom Laser Engraving',
  description:
    'Handcrafted laser engraving on wood, drinkware, signs, and custom gifts. Made with care in the USA.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Playfair+Display:wght@600;700&family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
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
