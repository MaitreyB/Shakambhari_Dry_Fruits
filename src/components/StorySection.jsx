import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const textX = useTransform(scrollYProgress, [0, 0.4], ['-40px', '0px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="story-section">
      {/* Ambient blobs */}
      <div
        className="ambient-blob"
        style={{
          width: '500px',
          height: '500px',
          top: '10%',
          right: '-10%',
          background:
            'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
          animation: 'blob-drift-2 22s ease-in-out infinite',
        }}
      />

      <div className="container">
        <div className="story-grid">
          <motion.div className="story-text" style={{ x: textX, opacity: textOpacity }}>
            <span
              className="text-gold"
              style={{
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Our Heritage
            </span>
            <h2 className="heading-lg" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              Wholesale Purity for{' '}
              <span className="text-gold" style={{ fontStyle: 'italic' }}>
                Your Home
              </span>
            </h2>
            <p className="text-lead" style={{ marginBottom: '1.5rem', maxWidth: '480px' }}>
              For over 15 years, Shakambhari has been Pune's trusted wholesale and retail distributor for premium dry fruits, authentic saffron, and wholesome nuts.
            </p>
            <p
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                maxWidth: '480px',
              }}
            >
              Every batch of almonds, cashews, and saffron undergoes rigorous quality inspection and hygienic grading. We believe supreme quality shouldn't come at inflated retail markups — that's why we offer direct wholesale rates on every product.
            </p>
            <div className="story-features">
              <div className="story-feature">
                <div className="feature-dot" />
                <span>Rigorous Quality Grading</span>
              </div>
              <div className="story-feature">
                <div className="feature-dot" />
                <span>Hygienic Packaging</span>
              </div>
              <div className="story-feature">
                <div className="feature-dot" />
                <span>Wholesale Rates</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="story-image-wrapper" style={{ y: imageY }}>
            <div className="story-image-frame">
              <img
                src="/assets/Shakambhari%20Dry%20Fruits%20and%20Foods%201.jpeg"
                alt="Shakambhari Premium Dry Fruits"
                className="story-image"
                loading="lazy"
              />
            </div>
            <div className="story-image-accent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
