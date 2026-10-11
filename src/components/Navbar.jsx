import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Badge bounce on cart count increase
  const [badgeBounce, setBadgeBounce] = useState(false);
  const prevCount = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setBadgeBounce(true);
      const timer = setTimeout(() => setBadgeBounce(false), 500);
      return () => clearTimeout(timer);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="nav-logo">
          <img src="/assets/Shakambhari%20Dry%20Fruits%20and%20Foods.jpeg" alt="Logo" />
          <span>Shakambhari</span>
        </a>
        
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#products" className="nav-link">Premium Range</a>
          <a href="#gifting" className="nav-link">Gifting</a>

        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => setIsCartOpen(true)}>
            <div style={{ position: 'relative' }}>
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className={`cart-badge ${badgeBounce ? 'bounce' : ''}`}>
                  {cartCount}
                </span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </button>
          
          <button 
            className="mobile-menu-btn" 

            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass-panel">
          <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Premium Range</a>
          <a href="#gifting" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Gifting</a>
        </div>
      )}
    </nav>
  );
}
