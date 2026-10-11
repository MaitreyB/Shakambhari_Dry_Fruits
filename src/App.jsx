import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HarvestMarquee from './components/HarvestMarquee';
import StatsCounter from './components/StatsCounter';
import ProductSection from './components/ProductSection';
import StorySection from './components/StorySection';
import GiftingSection from './components/GiftingSection';
import GiftHamperBuilder from './components/GiftHamperBuilder';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';
import ScrollProgress from './components/ScrollProgress';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <ScrollProgress />
      <Navbar />
      <CartSidebar />
      <Toast />
      <Hero />
      <HarvestMarquee />
      <StatsCounter />
      <ProductSection />
      <StorySection />
      <GiftingSection />
      <GiftHamperBuilder />
      <Footer />
    </CartProvider>
  );
}

export default App;
