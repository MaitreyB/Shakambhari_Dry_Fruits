import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Eye, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuickViewModal, { getVariants } from './QuickViewModal';

const categories = ['All', 'Nuts', 'Seeds', 'Fruits & Berries', 'Assorted'];

const healthGoals = [
  'All Goals',
  'Heart Health',
  'High Protein',
  'Brain Function',
  'Immunity',
  'Antioxidants',
  'Weight Loss'
];

const FEATURED_PRODUCTS = ['Grade A Saffron', 'Mixed Dry Fruits'];

const products = [
  // Nuts
  { name: 'Premium Almonds', category: 'Nuts', image: '/assets/original/Almonds.jpeg', desc: 'Crunchy and highly nutritious.', price: '₹800 / kg', benefits: ['Good for Heart Health', 'Boosts Brain Function', 'High in Protein', 'Strengthens Bones', 'Supports Immunity', 'Promotes Healthy Skin'] },
  { name: 'Cashew Nuts', category: 'Nuts', image: '/assets/original/Cashews.jpeg', desc: 'Rich and creamy whole cashews.', price: '₹950 / kg', benefits: ['Good for Heart Health', 'Boosts Brain Function', 'High in Protein', 'Supports Immunity', 'Strengthens Bones', 'Aids in Weight Loss', 'Improves Eye Health'] },
  { name: 'Pistachios', category: 'Nuts', image: '/assets/original/Pistachios.jpeg', desc: 'Premium roasted and salted pistachios.', price: '₹1400 / kg', benefits: ['Rich in Antioxidants', 'High in Protein', 'Good for Eye Health', 'Supports Weight Management'] },
  { name: 'Walnuts', category: 'Nuts', image: '/assets/original/Walnuts.jpeg', desc: 'Brain-shaped nutrient powerhouses.', price: '₹1200 / kg', benefits: ['Rich in Antioxidants', 'Boosts Brain Function', 'Supports Heart Health', 'Promotes Weight Management', 'Anti-Inflammatory Properties', 'Improves Gut Health'] },
  { name: 'Macadamia', category: 'Nuts', image: '/assets/Macadamia.jpeg', desc: 'Exotic buttery flavor.', price: '₹3500 / kg', benefits: ['Good for Heart Health', 'Boosts Brain Function', 'High in Healthy Fats', 'Supports Immunity', 'Improves Eye Health', 'Aids in Weight Loss'] },
  { name: 'Mamra Almonds', category: 'Nuts', image: '/assets/Mamra Almonds.jpeg', desc: 'Premium royal quality almonds.', price: '₹2800 / kg', benefits: ['Good for Heart Health', 'Boosts Brain Function', 'High in Protein', 'Strengthens Bones', 'Supports Immunity', 'Promotes Healthy Skin'] },
  { name: 'Pine Nuts', category: 'Nuts', image: '/assets/Pine Nuts.jpeg', desc: 'Delicate, sweet, and buttery.', price: '₹4200 / kg', benefits: ['Boosts Heart Health', 'Enhances Brain Function', 'Supports Vision Health', 'Rich Energy Source', 'Promotes Bone Density'] },
  { name: 'Salted Almonds', category: 'Nuts', image: '/assets/original/Salted_Almonds.jpeg', desc: 'Perfectly roasted and salted almonds.', price: '₹850 / kg', benefits: ['Rich in Healthy Fats', 'High Protein Snack', 'Satisfies Cravings', 'Good for Heart Health'] },

  // Seeds
  { name: 'Chia Seeds', category: 'Seeds', image: '/assets/Chia Seeds.jpeg', desc: 'Superfood packed with Omega-3.', price: '₹400 / kg', benefits: ['Supports Heart Health', 'Rich in Omega-3 Fatty Acids', 'Aids in Weight Management', 'Helps Control Blood Sugar'] },
  { name: 'Kalonji Seeds', category: 'Seeds', image: '/assets/Kalonji Seeds.jpeg', desc: 'Nigella seeds with strong aroma.', price: '₹300 / kg', benefits: ['Rich in Antioxidants', 'Supports Immunity', 'Promotes Digestive Health', 'Aids in Weight Management'] },
  { name: 'Poppy Seeds', category: 'Seeds', image: '/assets/Poppy Seeds.jpeg', desc: 'Nutty flavor and crunchy texture.', price: '₹900 / kg', benefits: ['Strengthens Bones', 'Improves Digestion', 'Regulates Blood Pressure', 'Promotes Sleep', 'Boosts Immunity', 'Supports Heart Health'] },
  { name: 'Salted Mixed Seeds', category: 'Seeds', image: '/assets/Salted Mixed Seeds.jpeg', desc: 'Perfect roasted savory snack.', price: '₹550 / kg', benefits: ['Rich in Minerals & Vitamins', 'Boosts Cardiovascular Health', 'Supports Muscle Function', 'Promotes Healthy Digestion', 'Fortifies Immunity'] },

  // Fruits & Berries
  { name: 'Premium Figs', category: 'Fruits & Berries', image: '/assets/original/Figs.jpeg', desc: 'Soft, chewy, and naturally sweet.', price: '₹1100 / kg', benefits: ['Rich in Fiber', 'High in Antioxidants', 'Boosts Immunity', 'Aids in Digestion', 'Good for Heart Health', 'Helps in Weight Loss'] },
  { name: 'Dates', category: 'Fruits & Berries', image: '/assets/original/Dates.jpeg', desc: 'Natural caramel-like sweetness.', price: '₹500 / kg', benefits: ['Natural Energy Booster', 'Rich in Iron', 'Supports Digestion', 'Good for Bone Health'] },
  { name: 'Palm Dates', category: 'Fruits & Berries', image: '/assets/original/Palm_Dates.jpeg', desc: 'Soft and fleshy palm dates.', price: '₹600 / kg', benefits: ['Natural Energy Booster', 'Rich in Fiber', 'Supports Digestion', 'Good for Bone Health'] },
  { name: 'Premium Dates', category: 'Fruits & Berries', image: '/assets/original/PremiumDates.jpeg', desc: 'Finest quality premium dates.', price: '₹900 / kg', benefits: ['Natural Energy Booster', 'Rich in Antioxidants', 'Supports Digestion', 'Good for Heart Health'] },
  { name: 'Dried Raisins', category: 'Fruits & Berries', image: '/assets/original/Dried_Raisins.jpeg', desc: 'Sweet and nutritious dried grapes.', price: '₹400 / kg', benefits: ['Rich in Iron', 'Boosts Energy', 'Supports Digestion', 'Good for Bone Health'] },
  { name: 'Seeded Large Raisins', category: 'Fruits & Berries', image: '/assets/original/Seeded_Large_Raisins.jpeg', desc: 'Large, sweet seeded raisins.', price: '₹550 / kg', benefits: ['Rich in Iron', 'Good for Digestion', 'Natural Antioxidants', 'Supports Bone Health'] },
  { name: 'Pitted Prunes', category: 'Fruits & Berries', image: '/assets/original/Pitted_Prunes.jpeg', desc: 'Sweet and juicy pitted prunes.', price: '₹850 / kg', benefits: ['Improves Digestion', 'Rich in Antioxidants', 'Good for Bone Health', 'High in Vitamins'] },
  { name: 'Amla Candy', category: 'Fruits & Berries', image: '/assets/original/Amla_Candy.jpeg', desc: 'Sweet and tangy Indian gooseberry.', price: '₹350 / kg', benefits: ['Rich in Vitamin C', 'Boosts Immunity', 'Good for Hair and Skin', 'Improves Digestion'] },
  { name: 'Apricots', category: 'Fruits & Berries', image: '/assets/Apricots.jpeg', desc: 'Sweet, tart, and chewy.', price: '₹750 / kg', benefits: ['Boosts Immunity', 'Rich in Vitamins A & C', 'Good for Eye Health', 'High in Antioxidants', 'Improves Digestive Health'] },
  { name: 'Black Raisins', category: 'Fruits & Berries', image: '/assets/Black Raisins.jpeg', desc: 'Naturally sweet and iron-rich.', price: '₹450 / kg', benefits: ['Boosts Cardiovascular Health', 'Rich Energy Source', 'Supports Digestive Health', 'Enhances Bone Density', 'Fortifies Immunity'] },
  { name: 'Dried Baby Lemons', category: 'Fruits & Berries', image: '/assets/Dried Baby Lemons.jpeg', desc: 'Intensely tangy and aromatic.', price: '₹800 / kg', benefits: ['Zesty & Tangy Flavor', 'Rich in Vitamin C', 'No Additives or Preservatives', 'Perfect for Culinary Use', 'Long Shelf Life'] },
  { name: 'Dried Cranberry', category: 'Fruits & Berries', image: '/assets/Dried Cranberry.jpeg', desc: 'Deliciously sweet and tart.', price: '₹900 / kg', benefits: ['Rich in Antioxidants', 'Supports Heart Health', 'Prevents Urinary Tract Infections', 'Improves Oral Health', 'Improves Immunity', 'Reduces Risk of Cancer'] },
  { name: 'Dried Kiwi', category: 'Fruits & Berries', image: '/assets/Dried Kiwi.jpeg', desc: 'Vibrant and sweet-sour tropical treat.', price: '₹850 / kg', benefits: ['Packed with Nutrients', 'Boosts Energy Levels', 'Strengthens Immunity', 'Good for Digestion'] },
  { name: 'Mixed Berries', category: 'Fruits & Berries', image: '/assets/Mixed Berries.jpeg', desc: 'Antioxidant-rich colorful mix.', price: '₹1200 / kg', benefits: ['Rich in Antioxidants', 'Boosts Cognitive Function', 'Supports Digestive Health', 'Enhances Heart Health', 'Fortifies Immunity'] },

  // Assorted
  { name: 'Grade A Saffron', category: 'Assorted', image: '/assets/original/Saffron.jpeg', desc: 'Pure Kashmiri Saffron.', price: '₹450 / gram', benefits: ['Mood Enhancer', 'Memory Booster', 'Anti-Oxidant Rich', 'Supports Heart Health', 'Potent Anti-Inflammatory'] },
  { name: 'ZipFruit Jamun Rolls', category: 'Assorted', image: '/assets/original/Jamun_Rolls.jpeg', desc: 'Tangy Indian blackberry fruit rolls.', price: '₹400 / box', benefits: ['No Preservatives', 'No Added Sugar', 'No Colors', 'No Flavors'] },
  { name: 'Mixed Dry Fruits', category: 'Assorted', image: '/assets/original/Mixed_Dry_Fruits.jpeg', desc: 'The ultimate healthy trail mix.', price: '₹1000 / kg', benefits: ['Good for Heart Health', 'Helps in Weight Management', 'Provides Energy', 'Improves Immunity'] },
  { name: 'Peri Peri Veggie Chips', category: 'Assorted', image: '/assets/original/Mixed_Veg_Chips.jpeg', desc: 'Spicy, crunchy, and healthy.', price: '₹700 / kg', benefits: ['Premium Quality', 'Crunchy & Tasty', 'Peri Peri Spicy Kick', 'Healthy Snacking'] },
  { name: 'Karvanda Syrup', category: 'Assorted', image: '/assets/original/Karvanda_Syrup.jpeg', desc: 'Refreshing traditional fruit syrup.', price: '₹250 / bottle', benefits: ['Cooling Effect', 'Rich in Iron', 'Refreshing Taste', 'Natural Ingredients'] },
  { name: 'Saffron Cardamon Syrup', category: 'Assorted', image: '/assets/original/Saffron_Cardamon_Syrup.jpeg', desc: 'Rich and aromatic premium syrup.', price: '₹450 / bottle', benefits: ['Rich Aroma', 'Cooling Effect', 'Premium Ingredients', 'Refreshing Drink'] },
  { name: 'Soya Beans Tomato Nuts', category: 'Assorted', image: '/assets/original/Soya_Beans_Tomato_Nuts.jpeg', desc: 'Tangy and crunchy healthy snack.', price: '₹400 / kg', benefits: ['High in Protein', 'Healthy Snacking', 'Crunchy Texture', 'Tangy Flavor'] },
  { name: 'Almond Coated Chocolates', category: 'Assorted', image: '/assets/Almond Coated Chocolates.jpeg', desc: 'Indulgent chocolate-covered almonds.', price: '₹1300 / kg', benefits: ['Indulgent Taste', 'Mood Enhancer', 'Rich in Healthy Fats', 'Perfect for Gifting'] },
  { name: 'Alphonso Mango Pulp', category: 'Assorted', image: '/assets/Devgadh Alphonso Mango Pulp.jpeg', desc: 'Pure Devgadh Alphonso goodness.', price: '₹600 / tin', benefits: ['100% Natural', 'No Added Preservatives', 'Rich Taste & Aroma'] },
  { name: 'Mango Pulp', category: 'Assorted', image: '/assets/Mango Pulp.jpeg', desc: 'Sweet and luscious mango puree.', price: '₹500 / tin', benefits: ['100% Natural', 'Pure, Natural, Delicious'] },
];

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeHealthGoal, setActiveHealthGoal] = useState('All Goals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();

  const getActiveVariant = (product) => {
    const variants = getVariants(product);
    return selectedVariants[product.name] || variants[variants.length - 1] || null;
  };

  const filteredProducts = products.filter((product) => {
    // Category match
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;

    // Search query match (name, description, health benefits)
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      product.name.toLowerCase().includes(q) ||
      product.desc.toLowerCase().includes(q) ||
      (product.benefits && product.benefits.some(b => b.toLowerCase().includes(q)))
    );

    // Health Goal match
    const matchesGoal = activeHealthGoal === 'All Goals' || (
      product.benefits && product.benefits.some(b => 
        b.toLowerCase().includes(activeHealthGoal.toLowerCase())
      )
    );

    return matchesCategory && matchesSearch && matchesGoal;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveHealthGoal('All Goals');
  };

  return (
    <section id="products" className="section" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated ambient gradient blobs */}
      <div className="ambient-blob" style={{ top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, rgba(212,175,55,0) 70%)', animation: 'blob-drift-1 25s ease-in-out infinite' }} />
      <div className="ambient-blob" style={{ bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)', animation: 'blob-drift-2 20s ease-in-out infinite' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-gold" style={{ letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 600 }}>
              Curated Harvest
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="heading-lg" style={{ marginTop: '0.6rem', letterSpacing: '-0.02em' }}>
              The Premium Collection
            </h2>
          </motion.div>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0.8rem auto 0', fontSize: '1rem' }}>
            Handpicked whole dry fruits, organic super seeds, and pure Kashmir saffron directly sourced at wholesale rates.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="product-search-wrapper">
          <Search size={18} className="product-search-icon" />
          <input
            type="text"
            className="product-search-input"
            placeholder="Search almonds, saffron, high-protein seeds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="product-search-clear" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="category-tabs" style={{ marginBottom: '1.8rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Health Goal Filter Chips */}
        <div className="health-chips-wrapper">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
            <SlidersHorizontal size={13} className="text-gold" /> Filter by Goal:
          </span>
          {healthGoals.map((goal) => (
            <button
              key={goal}
              className={`health-chip ${activeHealthGoal === goal ? 'active' : ''}`}
              onClick={() => setActiveHealthGoal(goal)}
            >
              {goal}
            </button>
          ))}
        </div>

        {/* Results Count Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '0 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          <span>
            Showing <strong style={{ color: 'var(--accent-gold)' }}>{filteredProducts.length}</strong> of {products.length} products
            {(searchQuery || activeCategory !== 'All' || activeHealthGoal !== 'All Goals') && (
              <span style={{ marginLeft: '6px' }}>(Filtered)</span>
            )}
          </span>
          {(searchQuery || activeCategory !== 'All' || activeHealthGoal !== 'All Goals') && (
            <button
              onClick={clearAllFilters}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="search-empty-state">
            <Search size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No products match your search</h3>
            <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
              We couldn't find anything matching "{searchQuery}". Try searching for walnuts, saffron, or clearing your health goal filter.
            </p>
            <button onClick={clearAllFilters} className="btn btn-primary" style={{ padding: '0.7rem 1.8rem' }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <motion.div layout className="product-grid" style={{ gap: '2rem' }}>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const variants = getVariants(product);
                const activeVariant = getActiveVariant(product);
                const displayPrice = activeVariant ? activeVariant.priceFormatted : product.price;
                const numericPrice = activeVariant ? activeVariant.numericPrice : undefined;

                return (
                  <motion.div 
                    key={product.name}
                    layout
                    initial={{ opacity: 0, y: 35 + (idx % 3) * 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.5, delay: Math.min(idx * 0.03, 0.4), ease: [0.16, 1, 0.3, 1] }}
                    className={`modern-product-card group ${FEATURED_PRODUCTS.includes(product.name) ? 'featured' : ''}`}
                    onClick={() => setQuickViewProduct(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-image-container">
                      <img src={product.image} alt={product.name} className="product-img" loading="lazy" />

                      {/* Quick-View floating trigger */}
                      <button
                        className="quick-view-badge-btn"
                        title="Quick View"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(product);
                        }}
                        aria-label={`Quick view ${product.name}`}
                      >
                        <Eye size={16} />
                      </button>
                      
                      {/* Hover Overlay with benefits */}
                      <div className="card-overlay">
                        <div className="overlay-content">
                          <h4 className="text-gold" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.6rem' }}>
                            Health Benefits
                          </h4>
                          <ul style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#e0e0e0', textAlign: 'left', paddingLeft: '1.2rem', marginBottom: '1.2rem', listStyleType: 'disc' }}>
                            {product.benefits.slice(0, 4).map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                          <button 
                            onClick={(e) => { 
                              e.preventDefault(); 
                              e.stopPropagation(); 
                              addToCart({
                                name: product.name,
                                variant: activeVariant ? activeVariant.label : undefined,
                                price: displayPrice,
                                numericPrice,
                                image: product.image,
                                quantity: 1
                              }); 
                            }} 
                            className="btn btn-primary w-full"
                            style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem' }}
                          >
                            Add to Cart • {displayPrice}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-info" onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3 className="product-title" style={{ fontSize: '1.15rem' }}>{product.name}</h3>
                        <span className="product-price" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{displayPrice}</span>
                      </div>
                      
                      <p className="product-desc" style={{ minHeight: '36px' }}>{product.desc}</p>

                      {/* Weight / Pack Variant Selector on the Card */}
                      {variants.length > 0 && (
                        <div className="card-variants-row">
                          {variants.map((v) => {
                            const isSelected = activeVariant && activeVariant.label === v.label;
                            return (
                              <button
                                key={v.label}
                                className={`card-variant-btn ${isSelected ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedVariants(prev => ({ ...prev, [product.name]: v }));
                                }}
                              >
                                {v.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* CTA Actions */}
                      <div className="card-cta-row">
                        <button
                          className="btn btn-primary card-quick-add-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart({
                              name: product.name,
                              variant: activeVariant ? activeVariant.label : undefined,
                              price: displayPrice,
                              numericPrice,
                              image: product.image,
                              quantity: 1
                            });
                          }}
                        >
                          Add {activeVariant ? `(${activeVariant.label})` : ''}
                        </button>
                        <button
                          className="card-inspect-btn"
                          title="View nutrition & origin"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          aria-label={`Inspect ${product.name}`}
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Quick-View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
