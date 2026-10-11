import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ target, suffix = '', duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="counter-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { number: 30, suffix: '+', label: 'Premium Products' },
  { number: 5000, suffix: '+', label: 'Orders Delivered' },
  { number: 15, suffix: '+', label: 'Years of Trust' },
  { number: 100, suffix: '%', label: 'Quality Assured' },
];

export default function StatsCounter() {
  return (
    <section className="stats-section">
      <div className="container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Counter target={stat.number} suffix={stat.suffix} />
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
