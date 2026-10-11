import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-tertiary)', paddingTop: '5rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand Col */}
          <div>
            <div className="nav-logo" style={{ marginBottom: '1.5rem' }}>
              <img src="/assets/Shakambhari%20Dry%20Fruits%20and%20Foods.jpeg" alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              <span>Shakambhari</span>
            </div>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
              Delivering nature's finest dry fruits, nuts, and exotic foods directly to your doorstep. Experience premium quality in every bite.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)' }}>
              <a href="#" style={{ transition: 'color var(--transition-fast)' }}>Instagram</a>
              <a href="#" style={{ transition: 'color var(--transition-fast)' }}>Facebook</a>
              <a href="#" style={{ transition: 'color var(--transition-fast)' }}>Twitter</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
              <li><a href="#home" style={{ transition: 'color 0.2s' }}>Home</a></li>
              <li><a href="#products" style={{ transition: 'color 0.2s' }}>Shop Range</a></li>
              <li><a href="#gifting" style={{ transition: 'color 0.2s' }}>Corporate Gifting</a></li>
              <li><a href="#" style={{ transition: 'color 0.2s' }}>About Us</a></li>
              <li><a href="#" style={{ transition: 'color 0.2s' }}>Contact</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={20} className="text-gold" style={{ flexShrink: 0, marginTop: '4px' }} />
                <span>S.No.28/5/6, Plot No.3, Adishakti Society No.1,<br/>Dhankawadi, Pune Satara Road, Pune - 411043</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={20} className="text-gold" style={{ flexShrink: 0 }} />
                <span>+91 8793398798</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail size={20} className="text-gold" style={{ flexShrink: 0 }} />
                <span>hello@shakambhari.com</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>&copy; {new Date().getFullYear()} Shakambhari Dry Fruits and Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
