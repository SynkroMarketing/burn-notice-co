'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';

export default function CartDrawer() {
  const { cart, open, closeCart, changeQty, removeFromCart, total } = useCart();

  return (
    <>
      <div
        className={`cart-overlay${open ? ' show' : ''}`}
        onClick={closeCart}
      />
      <aside
        className={`cart-drawer${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" aria-label="Close cart" onClick={closeCart}>
            ×
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-state">
              Your cart is empty.
              <br />
              Time to fix that.
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <div className="price">${item.price} each</div>
                </div>
                <div className="cart-qty">
                  <button onClick={() => changeQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
                <button
                  className="cart-remove"
                  aria-label="Remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            href="/shop#checkout"
            className="btn btn-primary"
            style={{ width: '100%', textAlign: 'center', display: 'block' }}
            onClick={closeCart}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
