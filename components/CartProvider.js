'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CART_KEY = 'burnnotice_cart';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      setCart(raw ? JSON.parse(raw) : []);
    } catch {
      setCart([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, price: Number(item.price), qty: 1 }];
    });
    setOpen(true);
  }, []);

  const changeQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({
      cart,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addToCart,
      changeQty,
      removeFromCart,
      clearCart,
      count: cart.reduce((s, i) => s + i.qty, 0),
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    [cart, open, addToCart, changeQty, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
