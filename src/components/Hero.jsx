import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      id="home"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/assets/Shakambhari%20Dry%20Fruits%20and%20Foods%203.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: yBg,
          opacity: 0.4,
          filter: 'contrast(1.1) brightness(0.7)',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,12,0.8) 0%, rgba(10,10,12,0.2) 40%, var(--bg-primary) 100%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          style={{ y: yText, opacity }}
          className="hero-content-wrapper"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
            <div style={{ gridColumn: '1 / -1', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  display: 'inline-block',
                  padding: '0.5rem 1.2rem',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '50px',
                  marginBottom: '2rem',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(212, 175, 55, 0.05)'
                }}
              >
                <span className="text-gold" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>
                  Nature's Finest Selection
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="heading-xl" 
                style={{ marginBottom: '2rem', color: '#fff', lineHeight: 1.1 }}
              >
                Premium Quality <br/>
                <span className="text-gold" style={{ fontStyle: 'italic', paddingRight: '0.1em' }}>Dry Fruits</span> & Nuts
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lead" 
                style={{ marginBottom: '3rem', marginInline: 'auto', maxWidth: '500px' }}
              >
                Indulge in our handpicked collection of exotic dry fruits, seeds, and premium saffron. Perfectly curated for your health and thoughtful gifting.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
              >
                <a href="#products" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                  Explore Range <ArrowRight size={20} />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
