import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronRight, ChevronLeft, Check, Gift, Send, Sparkles, X } from 'lucide-react';

const PACKAGING_OPTIONS = [
  {
    id: 'matte-black',
    name: 'Classic Matte Black',
    desc: 'Sleek magnetic-close box with embossed gold foil logo.',
    price: 250,
    image: '/assets/gifting/gift1.jpeg',
  },
  {
    id: 'wooden-chest',
    name: 'Regal Wooden Chest',
    desc: 'Handcrafted rosewood box with brass clasps. Reusable & luxurious.',
    price: 600,
    image: '/assets/gifting/gift2.jpeg',
  },
  {
    id: 'eco-kraft',
    name: 'Eco-Kraft Box',
    desc: 'Sustainable kraft paper with jute ribbon. Thoughtful & green.',
    price: 150,
    image: '/assets/gifting/gift4.jpeg',
  },
  {
    id: 'glass-jar',
    name: 'Signature Glass Jars',
    desc: 'Premium glass jars in an elegant gift bag with satin lining.',
    price: 450,
    image: '/assets/gifting/gift3.jpeg',
  },
];

const CONTENT_OPTIONS = [
  { id: 'almonds', name: 'Premium Almonds', price: 200, weight: '250g', image: '/assets/original/Almonds.jpeg' },
  { id: 'cashews', name: 'Cashew Nuts', price: 240, weight: '250g', image: '/assets/original/Cashews.jpeg' },
  { id: 'pistachios', name: 'Pistachios', price: 350, weight: '250g', image: '/assets/original/Pistachios.jpeg' },
  { id: 'walnuts', name: 'Walnuts', price: 300, weight: '250g', image: '/assets/original/Walnuts.jpeg' },
  { id: 'raisins', name: 'Dried Raisins', price: 100, weight: '250g', image: '/assets/original/Dried_Raisins.jpeg' },
  { id: 'dates', name: 'Premium Dates', price: 225, weight: '250g', image: '/assets/original/PremiumDates.jpeg' },
  { id: 'figs', name: 'Premium Figs', price: 275, weight: '250g', image: '/assets/original/Figs.jpeg' },
  { id: 'saffron', name: 'Grade A Saffron', price: 450, weight: '1g', image: '/assets/original/Saffron.jpeg' },
  { id: 'mixed-seeds', name: 'Mixed Seeds', price: 140, weight: '250g', image: '/assets/Salted Mixed Seeds.jpeg' },
  { id: 'cranberry', name: 'Dried Cranberry', price: 225, weight: '250g', image: '/assets/Dried Cranberry.jpeg' },
];

const MAX_SELECTIONS = 5;
const MIN_SELECTIONS = 3;

const stepVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function GiftHamperBuilder() {
  const [step, setStep] = useState(0); // 0=packaging, 1=contents, 2=review
  const [direction, setDirection] = useState(1);
  const [selectedPackaging, setSelectedPackaging] = useState(null);
  const [selectedContents, setSelectedContents] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [greeting, setGreeting] = useState('');
  const [sent, setSent] = useState(false);

  const goNext = () => { setDirection(1); setStep(s => Math.min(s + 1, 2)); };
  const goBack = () => { setDirection(-1); setStep(s => Math.max(s - 1, 0)); };

  const toggleContent = (item) => {
    setSelectedContents(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) return prev.filter(c => c.id !== item.id);
      if (prev.length >= MAX_SELECTIONS) return prev;
      return [...prev, item];
    });
  };

  const packagingPrice = selectedPackaging ? selectedPackaging.price : 0;
  const contentsPrice = selectedContents.reduce((sum, c) => sum + c.price, 0);
  const unitPrice = packagingPrice + contentsPrice;
  const totalPrice = unitPrice * quantity;

  const handleWhatsApp = () => {
    const pkg = selectedPackaging?.name || 'Not Selected';
    const items = selectedContents.map(c => `  • ${c.name} (${c.weight})`).join('%0A');
    const greetLine = greeting ? `%0A🎀 *Message:* "${greeting}"` : '';
    
    const message =
      `🎁 *CUSTOM GIFT HAMPER QUOTATION — SHAKAMBHARI*%0A` +
      `--------------------------------------%0A` +
      `📦 *Packaging:* ${pkg}%0A%0A` +
      `🌿 *Selected Contents:*%0A${items}%0A%0A` +
      `📊 *Quantity:* ${quantity} hamper${quantity > 1 ? 's' : ''}%0A` +
      `💰 *Estimated Total:* ₹${totalPrice.toLocaleString()}` +
      `${greetLine}%0A%0A` +
      `📍 *Delivery Address:* [Please enter]%0A` +
      `💬 Please confirm availability and share payment QR!`;
    
    window.open(`https://wa.me/918793398798?text=${message}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const canProceedFromStep0 = selectedPackaging !== null;
  const canProceedFromStep1 = selectedContents.length >= MIN_SELECTIONS;

  return (
    <section id="gift-builder" className="section" style={{ backgroundColor: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient blobs */}
      <div className="ambient-blob" style={{ top: '-10%', right: '-8%', width: '45%', height: '45%', background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)', animation: 'blob-drift-3 28s ease-in-out infinite' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold"
            style={{ letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 600 }}
          >
            Design Your Own
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg"
            style={{ marginTop: '0.5rem' }}
          >
            Custom Gift Hamper
          </motion.h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.05rem' }}>
            Build a bespoke gift box in 3 simple steps — perfect for Diwali, corporate events, or any celebration.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="builder-progress">
          {['Packaging', 'Contents', 'Review & Send'].map((label, idx) => (
            <div key={label} className={`builder-step-dot ${step >= idx ? 'active' : ''} ${step === idx ? 'current' : ''}`}>
              <div className="step-circle">
                {step > idx ? <Check size={14} /> : idx + 1}
              </div>
              <span className="step-label">{label}</span>
              {idx < 2 && <div className={`step-connector ${step > idx ? 'filled' : ''}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="builder-stage">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="builder-step-title">
                  <Package size={22} className="text-gold" />
                  Choose Your Packaging
                </h3>
                <div className="packaging-grid">
                  {PACKAGING_OPTIONS.map((pkg) => {
                    const isActive = selectedPackaging?.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        className={`packaging-card ${isActive ? 'selected' : ''}`}
                        onClick={() => setSelectedPackaging(pkg)}
                      >
                        <div className="packaging-img-wrap">
                          <img src={pkg.image} alt={pkg.name} loading="lazy" />
                          {isActive && (
                            <div className="packaging-check">
                              <Check size={18} />
                            </div>
                          )}
                        </div>
                        <div className="packaging-info">
                          <h4>{pkg.name}</h4>
                          <p>{pkg.desc}</p>
                          <span className="text-gold" style={{ fontWeight: 600, fontSize: '0.95rem' }}>₹{pkg.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="builder-step-title">
                  <Sparkles size={22} className="text-gold" />
                  Curate Your Contents
                  <span className="builder-counter">{selectedContents.length}/{MAX_SELECTIONS} selected</span>
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                  Pick {MIN_SELECTIONS}–{MAX_SELECTIONS} items. Each in a generous 250g pack (1g for Saffron).
                </p>
                <div className="contents-grid">
                  {CONTENT_OPTIONS.map((item) => {
                    const isActive = selectedContents.some(c => c.id === item.id);
                    const isDisabled = !isActive && selectedContents.length >= MAX_SELECTIONS;
                    return (
                      <div
                        key={item.id}
                        className={`content-chip ${isActive ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                        onClick={() => !isDisabled && toggleContent(item)}
                      >
                        <div className="content-chip-img">
                          <img src={item.image} alt={item.name} loading="lazy" />
                          {isActive && (
                            <div className="content-chip-check">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                        <div className="content-chip-info">
                          <span className="content-chip-name">{item.name}</span>
                          <span className="content-chip-meta">{item.weight} • ₹{item.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="builder-step-title">
                  <Gift size={22} className="text-gold" />
                  Review Your Hamper
                </h3>

                <div className="review-layout">
                  {/* Visual Preview */}
                  <div className="review-preview">
                    <div className="review-packaging-img">
                      <img src={selectedPackaging?.image} alt={selectedPackaging?.name} />
                      <div className="review-badge">{selectedPackaging?.name}</div>
                    </div>
                    <div className="review-items-strip">
                      {selectedContents.map((c) => (
                        <div key={c.id} className="review-item-thumb" title={c.name}>
                          <img src={c.image} alt={c.name} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details Panel */}
                  <div className="review-details">
                    <div className="review-line-items">
                      <div className="review-line">
                        <span style={{ color: 'var(--text-secondary)' }}>Packaging</span>
                        <span>{selectedPackaging?.name} — <span className="text-gold">₹{packagingPrice}</span></span>
                      </div>
                      {selectedContents.map((c) => (
                        <div key={c.id} className="review-line">
                          <span style={{ color: 'var(--text-secondary)' }}>{c.name} ({c.weight})</span>
                          <span className="text-gold">₹{c.price}</span>
                        </div>
                      ))}
                      <div className="review-line review-subtotal">
                        <span>Per Hamper</span>
                        <span className="text-gold" style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{unitPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="review-quantity-row">
                      <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hamper Quantity:</label>
                      <div className="review-qty-control">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                      </div>
                    </div>

                    {/* Greeting Message */}
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                        🎀 Optional Greeting Message
                      </label>
                      <input
                        type="text"
                        className="greeting-input"
                        placeholder="e.g. Happy Diwali from the team at TCS!"
                        value={greeting}
                        onChange={(e) => setGreeting(e.target.value)}
                        maxLength={120}
                      />
                    </div>

                    {/* Grand Total */}
                    <div className="review-grand-total">
                      <span>Grand Total ({quantity} hamper{quantity > 1 ? 's' : ''})</span>
                      <span className="text-gold">₹{totalPrice.toLocaleString()}</span>
                    </div>

                    <button
                      className="btn btn-primary builder-send-btn"
                      onClick={handleWhatsApp}
                    >
                      {sent ? (
                        <><Check size={18} /> Sent to WhatsApp!</>
                      ) : (
                        <><Send size={18} /> Get Quotation on WhatsApp</>
                      )}
                    </button>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.6rem' }}>
                      Prices are estimates. Final quote confirmed via WhatsApp.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="builder-nav-row">
          {step > 0 && (
            <button className="btn builder-nav-btn" onClick={goBack}>
              <ChevronLeft size={18} /> Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 2 && (
            <button
              className="btn btn-primary builder-nav-btn"
              onClick={goNext}
              disabled={step === 0 ? !canProceedFromStep0 : !canProceedFromStep1}
              style={{
                opacity: (step === 0 ? canProceedFromStep0 : canProceedFromStep1) ? 1 : 0.4,
                pointerEvents: (step === 0 ? canProceedFromStep0 : canProceedFromStep1) ? 'auto' : 'none'
              }}
            >
              Continue <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
