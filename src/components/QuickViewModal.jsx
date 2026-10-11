import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Heart, Sparkles, Plus, Minus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Setup initial variant when product opens
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAdded(false);
      const variants = getVariants(product);
      setSelectedVariant(variants[variants.length - 1] || null); // default to 1kg or primary
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const variants = getVariants(product);
  const currentVariant = selectedVariant || variants[0];
  const currentPrice = currentVariant ? currentVariant.priceFormatted : product.price;
  const currentNumericPrice = currentVariant ? currentVariant.numericPrice : parseBasePrice(product.price);

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      variant: currentVariant ? currentVariant.label : undefined,
      price: currentPrice,
      numericPrice: currentNumericPrice,
      image: product.image,
      quantity
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div 
        className="quickview-backdrop" 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 5, 7, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9990,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="quickview-modal"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '20px',
            maxWidth: '860px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 55, 0.1)',
            position: 'relative'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.2rem',
              right: '1.2rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s'
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="quickview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {/* Image Column */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '340px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.2)' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '1/1' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(10,10,12,0.85)', backdropFilter: 'blur(8px)', border: '1px solid var(--accent-gold)', borderRadius: '20px', padding: '4px 10px', fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> 100% Farm Fresh
                </div>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <ShieldCheck size={16} className="text-gold" /> FSSAI Certified
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <Heart size={16} className="text-gold" /> Zero Preservatives
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div style={{ padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', fontWeight: 600 }}>
                  {product.category}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#ffb703', fontSize: '0.8rem' }}>
                  <Star size={13} fill="#ffb703" strokeWidth={0} />
                  <span style={{ fontWeight: 600 }}>4.9</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>(Verified Quality)</span>
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.6rem', lineHeight: 1.2 }}>
                {product.name}
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                {product.desc} Carefully graded, hygienically sealed, and shipped fresh to preserve natural oils and maximum crunch.
              </p>

              {/* Weight / Pack Variant Selector */}
              {variants.length > 0 && (
                <div style={{ marginBottom: '1.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Select Packaging:
                    </span>
                    {currentVariant && currentVariant.badge && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', background: 'rgba(212,175,55,0.1)', padding: '2px 8px', borderRadius: '10px' }}>
                        {currentVariant.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {variants.map((v) => {
                      const isSelected = currentVariant && currentVariant.label === v.label;
                      return (
                        <button
                          key={v.label}
                          onClick={() => setSelectedVariant(v)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            border: isSelected ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                            backgroundColor: isSelected ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.03)',
                            color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)',
                            fontWeight: isSelected ? 600 : 400,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minWidth: '80px'
                          }}
                        >
                          <span>{v.label}</span>
                          <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>{v.priceFormatted}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price & Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.6rem', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Price</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}>
                    ₹{currentNumericPrice * quantity}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '0.3rem 0.6rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '4px' }}
                    aria-label="Decrease"
                  >
                    <Minus size={15} />
                  </button>
                  <span style={{ fontSize: '0.95rem', minWidth: '1.6rem', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '4px' }}
                    aria-label="Increase"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    minWidth: '160px',
                    padding: '0.85rem 1.4rem',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {added ? (
                    <>
                      <Check size={18} /> Added to Cart!
                    </>
                  ) : (
                    <>Add {quantity} to Bag</>
                  )}
                </button>
              </div>

              {/* Health Benefits Section */}
              {product.benefits && product.benefits.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.2rem', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.6rem' }}>
                    Nutritional & Health Highlights
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem 0.8rem' }}>
                    {product.benefits.slice(0, 6).map((benefit, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-gold)', flexShrink: 0 }} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Helpers for variant price generation
export function parseBasePrice(priceStr) {
  const match = String(priceStr).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function getVariants(product) {
  const base = parseBasePrice(product.price);
  const pName = product.name.toLowerCase();

  // Special cases: Saffron
  if (pName.includes('saffron')) {
    return [
      { label: '1g Pack', priceFormatted: '₹450', numericPrice: 450, badge: 'Standard' },
      { label: '2g Pack', priceFormatted: '₹880', numericPrice: 880, badge: 'Popular' },
      { label: '5g Royal', priceFormatted: '₹2,150', numericPrice: 2150, badge: 'Save ₹100' },
    ];
  }

  // Bottles / Syrups
  if (product.price.includes('/ bottle')) {
    return [
      { label: '1 Bottle', priceFormatted: `₹${base}`, numericPrice: base, badge: 'Standard' },
      { label: 'Pack of 2', priceFormatted: `₹${Math.round(base * 1.95)}`, numericPrice: Math.round(base * 1.95), badge: 'Save 5%' },
    ];
  }

  // Tins / Mango Pulp
  if (product.price.includes('/ tin')) {
    return [
      { label: '1 Tin (850g)', priceFormatted: `₹${base}`, numericPrice: base, badge: 'Standard' },
      { label: 'Pack of 2', priceFormatted: `₹${Math.round(base * 1.9)}`, numericPrice: Math.round(base * 1.9), badge: 'Save 5%' },
      { label: 'Case of 4', priceFormatted: `₹${Math.round(base * 3.7)}`, numericPrice: Math.round(base * 3.7), badge: 'Best Value' },
    ];
  }

  // Boxes (Rolls, etc.)
  if (product.price.includes('/ box')) {
    return [
      { label: '1 Box', priceFormatted: `₹${base}`, numericPrice: base, badge: 'Standard' },
      { label: 'Pack of 2', priceFormatted: `₹${Math.round(base * 1.95)}`, numericPrice: Math.round(base * 1.95), badge: 'Save 5%' },
    ];
  }

  // Standard Dry Fruits & Nuts & Seeds sold per kg
  const p250 = Math.round(base * 0.27); // Slight premium for small pack
  const p500 = Math.round(base * 0.52);
  const p1kg = base;

  return [
    { label: '250g', priceFormatted: `₹${p250}`, numericPrice: p250, badge: 'Daily' },
    { label: '500g', priceFormatted: `₹${p500}`, numericPrice: p500, badge: 'Popular' },
    { label: '1kg', priceFormatted: `₹${p1kg}`, numericPrice: p1kg, badge: 'Best Value' },
  ];
}
