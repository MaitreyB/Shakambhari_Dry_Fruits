import { motion } from 'framer-motion';

const tickerItems = [
  'Grade A Mongra Saffron',
  'Premium Jumbo Almonds',
  'Sweet Dried Figs',
  'Roasted Salted Pistachios',
  'King Whole Cashews',
  'Raw Organic Walnuts',
  'Wholesale & Retail Supplies',
  'Custom Gift Hampers',
  'Hygienically Packed',
  'Premium Trail Mix',
  'Omega-Rich Seeds',
  'Exotic Dried Berries',
];

export default function HarvestMarquee() {
  // Double the items for seamless loop
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="marquee-section">
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, idx) => (
          <span key={idx} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
