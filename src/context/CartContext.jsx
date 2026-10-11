import { createContext, useContext, useState, useRef } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastItem, setToastItem] = useState(null);
  const toastTimer = useRef(null);

  const getItemKey = (item) => item.cartId || `${item.name}__${item.variant || 'default'}`;

  const addToCart = (product) => {
    const itemKey = getItemKey(product);
    const addedQuantity = product.quantity || 1;

    setCartItems(prev => {
      const existing = prev.find(item => getItemKey(item) === itemKey);
      if (existing) {
        return prev.map(item => 
          getItemKey(item) === itemKey 
            ? { ...item, quantity: item.quantity + addedQuantity } 
            : item
        );
      }
      return [...prev, { ...product, cartId: itemKey, quantity: addedQuantity }];
    });

    // Show toast feedback
    setToastItem(product);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastItem(null), 3200);
  };

  const removeFromCart = (itemKeyOrName) => {
    setCartItems(prev => prev.filter(item => getItemKey(item) !== itemKeyOrName && item.name !== itemKeyOrName));
  };

  const updateQuantity = (itemKeyOrName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKeyOrName);
      return;
    }
    setCartItems(prev => prev.map(item => 
      (getItemKey(item) === itemKeyOrName || item.name === itemKeyOrName)
        ? { ...item, quantity } 
        : item
    ));
  };

  const cartTotal = cartItems.reduce((total, item) => {
    if (typeof item.numericPrice === 'number' && !isNaN(item.numericPrice)) {
      return total + (item.numericPrice * item.quantity);
    }
    const priceMatch = String(item.price).match(/\d+/);
    const price = priceMatch ? parseInt(priceMatch[0], 10) : 0;
    return total + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      toastItem,
      getItemKey
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
