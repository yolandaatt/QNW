import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '@/types/Product';

type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Product, quantity?: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  initialItems = [],
}: {
  children: ReactNode;
  initialItems?: CartItem[];
}) {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  function addToCart(item: Product, quantity: number = 1) {
    setItems((prev) => {
      const existing = prev.find((p) => p._id === item._id);
      if (existing) {
        return prev.map((p) =>
          p._id === item._id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function clearCart() {
    setItems([]);
  }

  function increaseQuantity(id: string) {
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  function decreaseQuantity(id: string) {
    setItems((prev) =>
      prev
        .map((item) => (item._id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item._id !== id));
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, clearCart, increaseQuantity, decreaseQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
