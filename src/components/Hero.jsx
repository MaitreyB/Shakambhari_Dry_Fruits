import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Leaf, Zap, ShieldCheck, Star } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax for floating product images
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(xPct * 20);
      mouseY.set(yPct * 15);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="hero-split-section"
    >
      {/* Background layer */}
      <motion.div className="hero-bg-layer" style={{ y: yBg }} />
      <div className="hero-gradient-overlay" />

      {/* Ambient blobs */}
      <div className="ambient-blob" style={{ top: '-15%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', animation: 'blob-drift-1 25s ease-in-out infinite' }} />
      <div className="ambient-blob" style={{ bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', animation: 'blob-drift-2 22s ease-in-out infinite' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div style={{ y: yText, opacity }}>
          <div className="hero-split-grid">
            {/* Left Column — Editorial Typography */}
            <div className="hero-text-col">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hero-eyebrow-row"
              >
                <div className="hero-live-badge">
                  <span className="live-dot" />
                  Same-Day Pune Delivery
                </div>
                <div className="hero-farm-badge">
                  <Leaf size={13} />
                  100% Farm Direct
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="heading-xl hero-headline"
              >
                Premium <br/>
                <span className="text-gold hero-headline-accent">Dry Fruits</span>
                <br/>
                & Exotic Nuts
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-lead hero-desc"
              >
                Handpicked from Kashmir, Afghanistan & California. 
                Wholesale rates on pure Grade A Saffron, organic seeds, 
                and artisan gift hampers — delivered fresh across Pune.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="hero-cta-row"
              >
                <a href="#products" className="btn btn-primary hero-btn-primary">
                  Browse Collection <ArrowRight size={18} />
                </a>
                <a href="#gifting" className="btn hero-btn-secondary">
                  Corporate Gifting
                </a>
              </motion.div>

              {/* Micro Trust Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hero-trust-strip"
              >
                <div className="hero-trust-item">
                  <ShieldCheck size={15} className="text-gold" />
                  <span>FSSAI Certified</span>
                </div>
                <span className="hero-trust-divider">•</span>
                <div className="hero-trust-item">
                  <Star size={15} fill="var(--accent-gold)" stroke="none" />
                  <span>4.9★ Quality Rating</span>
                </div>
                <span className="hero-trust-divider">•</span>
                <div className="hero-trust-item">
                  <Zap size={15} className="text-gold" />
                  <span>15+ Years Trust</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column — Floating Product Showcase */}
            <div className="hero-visual-col">
              <motion.div 
                className="hero-float-composition"
                style={{ x: springX, y: springY }}
              >
                {/* Primary hero product */}
                <motion.div
                  className="hero-product-card hero-product-main"
                  initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src="/assets/original/Saffron.jpeg" alt="Grade A Kashmiri Saffron" />
                  <div className="hero-product-label">
                    <span className="hero-product-name">Grade A Saffron</span>
                    <span className="hero-product-origin">Pampore, Kashmir</span>
                  </div>
                </motion.div>

                {/* Secondary floating product */}
                <motion.div
                  className="hero-product-card hero-product-secondary"
                  initial={{ opacity: 0, scale: 0.8, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ x: useTransform(springX, v => v * -0.4), y: useTransform(springY, v => v * -0.6) }}
                >
                  <img src="/assets/original/Almonds.jpeg" alt="California Almonds" />
                  <div className="hero-product-label">
                    <span className="hero-product-name">Almonds</span>
                    <span className="hero-product-origin">California, USA</span>
                  </div>
                </motion.div>

                {/* Tertiary floating product */}
                <motion.div
                  className="hero-product-card hero-product-tertiary"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ x: useTransform(springX, v => v * 0.3), y: useTransform(springY, v => v * 0.5) }}
                >
                  <img src="/assets/original/Cashews.jpeg" alt="Goa Cashews" />
                  <div className="hero-product-label">
                    <span className="hero-product-name">Cashews</span>
                    <span className="hero-product-origin">Goa, India</span>
                  </div>
                </motion.div>

                {/* Decorative gold ring */}
                <motion.div 
                  className="hero-deco-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
