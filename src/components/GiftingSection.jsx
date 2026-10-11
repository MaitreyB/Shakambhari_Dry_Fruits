import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const giftingOptions = [
  {
    title: "Classic Premium Box",
    desc: "Almonds | Cashews | Walnuts | Pistachios | Raisins | Dates",
    price: "₹1500 / box",
    image: "/assets/gifting/gift1.jpeg"
  },
  {
    title: "Wooden Premium Box",
    desc: "Assorted Dry Fruits & Dried Fruits with Elegant Wooden Packaging",
    price: "₹2500 / box",
    image: "/assets/gifting/gift2.jpeg"
  },
  {
    title: "Signature Jar Pack",
    desc: "Premium Dry Fruits in Glass Jars with Elegant Gift Bag",
    price: "₹1800 / pack",
    image: "/assets/gifting/gift3.jpeg"
  },
  {
    title: "Eco-Friendly Pack",
    desc: "Thoughtful. Sustainable. Delicious. Kraft Packaging with Natural Touch",
    price: "₹1200 / pack",
    image: "/assets/gifting/gift4.jpeg"
  },
  {
    title: "Royal Gift Hamper",
    desc: "Premium Dry Fruits + Speciality Items (Honey / Dates / Trail Mix etc.)",
    price: "₹3500 / hamper",
    image: "/assets/gifting/gift5.jpeg"
  },
  {
    title: "Festive Special Pack",
    desc: "Perfect for Festivals, Celebrations & Special Occasions",
    price: "₹2000 / pack",
    image: "/assets/gifting/gift6.jpeg"
  }
];

export default function GiftingSection() {
  const { addToCart } = useCart();
  return (
    <section id="gifting" className="section" style={{ backgroundColor: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient blobs */}
      <div className="ambient-blob" style={{ top: '-15%', right: '-5%', width: '45%', height: '45%', background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)', animation: 'blob-drift-3 28s ease-in-out infinite' }} />
      <div className="ambient-blob" style={{ bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', animation: 'blob-drift-1 22s ease-in-out infinite' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold" 
            style={{ letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}
          >
            Perfect Occasions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg" 
            style={{ marginTop: '0.5rem' }}
          >
            Thoughtful Gifting
          </motion.h2>
          <div style={{ width: '60px', height: '3px', background: 'var(--accent-gold)', margin: '1.5rem auto' }} />
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Elevate your gifting experience with our exquisitely crafted dry fruit hampers. Premium Dry Fruits Gift Hampers for Your Clients, Employees & Business Associates.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '3rem'
        }}>
          {giftingOptions.map((option, idx) => (
            <motion.div 
              key={option.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="modern-product-card group"
            >
              <div className="card-image-container" style={{ aspectRatio: '16/10' }}>
                <img src={option.image} alt={option.title} className="product-img" loading="lazy" />
                <div className="card-overlay" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div className="overlay-content" style={{ textAlign: 'center' }}>
                    <button onClick={() => addToCart({ name: option.title, price: option.price, image: option.image })} className="btn btn-primary">
                      Add to Cart - {option.price.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-info" style={{ textAlign: 'center', marginTop: '1rem' }}>
                <h3 className="product-title" style={{ fontSize: '1.6rem' }}>{option.title}</h3>
                <p className="product-desc" style={{ maxWidth: '90%', margin: '0 auto' }}>{option.desc}</p>
                <p className="product-price" style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{option.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
           <a href="tel:+918793398798" className="btn btn-primary">
              Enquire for Bulk Orders
           </a>
        </div>
      </div>
    </section>
  );
}
