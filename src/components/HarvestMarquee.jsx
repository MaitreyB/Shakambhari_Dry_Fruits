import { motion } from 'framer-motion';

const origins = [
  'Kashmiri Mongra Saffron',
  'California Nonpareil Almonds',
  'Afghani Anjeer',
  'Iranian Pistachios',
  'Devgadh Alphonso',
  'Goan Cashews',
  'Himalayan Walnuts',
  'Australian Macadamia',
  'Turkish Apricots',
  'Chilean Cranberries',
  'Mexican Chia Seeds',
  'Indian Poppy Seeds',
];

export default function HarvestMarquee() {
  // Double the items for seamless loop
  const items = [...origins, ...origins];

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
