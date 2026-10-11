import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastItem } = useCart();

  return (
    <AnimatePresence>
      {toastItem && (
        <motion.div
          key={toastItem.name + Date.now()}
          initial={{ opacity: 0, y: 50, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, x: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="cart-toast"
        >
          {toastItem.image && (
            <img src={toastItem.image} alt="" className="toast-img" />
          )}
          <div className="toast-content">
            <span className="toast-title">{toastItem.name}</span>
            <span className="toast-subtitle">Added to cart</span>
          </div>
          <div className="toast-check">
            <Check size={18} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
