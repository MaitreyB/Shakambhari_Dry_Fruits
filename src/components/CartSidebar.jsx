import { X, Plus, Minus, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const FREE_SHIPPING_THRESHOLD = 1500;

export default function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, getItemKey } = useCart();

  const freeShippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  const handleCheckout = () => {
    let message = "✨ *NEW ORDER — SHAKAMBHARI DRY FRUITS* ✨%0A";
    message += "--------------------------------------%0A";
    cartItems.forEach(item => {
      const variantStr = item.variant ? ` [${item.variant}]` : '';
      message += `• *${item.name}*${variantStr} - ${item.price} x ${item.quantity}%0A`;
    });
    message += "--------------------------------------%0A";
    message += `💰 *Estimated Total:* ₹${cartTotal}%0A`;
    message += cartTotal >= FREE_SHIPPING_THRESHOLD 
      ? "🚚 *Delivery:* FREE (Pune Metro Region)%0A" 
      : "🚚 *Delivery:* Standard Shipping%0A";
    message += "%0A📍 *Delivery Address:* [Please enter your address]%0A";
    message += "💬 Please confirm product availability and share the payment QR code.";

    const url = `https://wa.me/918793398798?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 999
            }}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '420px',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--accent-gold)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-5px 0 30px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0, fontWeight: 600 }}>
                <ShoppingBag className="text-gold" size={22} />
                Your Selection
                {cartItems.length > 0 && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                    ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
                  </span>
                )}
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            {cartItems.length > 0 && (
              <div style={{ padding: '0.9rem 1.5rem', background: 'rgba(212,175,55,0.06)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                  {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                      <CheckCircle2 size={14} /> Unlocked FREE Delivery in Pune!
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Sparkles size={13} className="text-gold" />
                      Add <strong style={{ color: 'var(--accent-gold)' }}>₹{remainingForFreeShipping}</strong> for FREE Pune Delivery
                    </span>
                  )}
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${freeShippingProgress}%`, 
                      background: 'linear-gradient(90deg, var(--accent-gold-dark), var(--accent-gold))', 
                      transition: 'width 0.4s ease' 
                    }} 
                  />
                </div>
              </div>
            )}

            {/* Item List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>
                  <ShoppingBag size={56} style={{ margin: '0 auto 1.2rem', opacity: 0.2 }} />
                  <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Your bag is empty</p>
                  <p style={{ fontSize: '0.85rem' }}>Explore our premium nuts, seeds, and Kashmiri saffron to begin.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {cartItems.map(item => {
                    const key = getItemKey(item);
                    return (
                      <div 
                        key={key} 
                        style={{ 
                          display: 'flex', 
                          gap: '1rem', 
                          alignItems: 'center',
                          padding: '0.8rem',
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}
                      >
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }} 
                          />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '0.95rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.name}
                          </h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                            {item.variant && (
                              <span style={{ 
                                fontSize: '0.72rem', 
                                background: 'rgba(212,175,55,0.12)', 
                                color: 'var(--accent-gold)', 
                                padding: '1px 6px', 
                                borderRadius: '4px',
                                fontWeight: 500
                              }}>
                                {item.variant}
                              </span>
                            )}
                            <span className="text-gold" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.price}</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '0.2rem 0.4rem' }}>
                              <button 
                                onClick={() => updateQuantity(key, item.quantity - 1)} 
                                style={{ color: 'var(--text-primary)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span style={{ fontSize: '0.85rem', minWidth: '1.2rem', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(key, item.quantity + 1)} 
                                style={{ color: 'var(--text-primary)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(key)} 
                              style={{ color: 'var(--text-muted)', fontSize: '0.78rem', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'var(--bg-tertiary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>Pune Express Shipping</span>
                  <span style={{ color: cartTotal >= FREE_SHIPPING_THRESHOLD ? 'var(--accent-gold)' : 'var(--text-secondary)' }}>
                    {cartTotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                  <span>Estimated Total:</span>
                  <span className="text-gold">₹{cartTotal}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  Confirm Order via WhatsApp
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                  Genuine wholesale rates. No payment gateway charges.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
