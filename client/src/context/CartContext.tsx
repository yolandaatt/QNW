import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '@/types/Product';

type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Product, quantity?: number) => void;
  clearCart: () => void;
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

  return (
    <CartContext.Provider value={{ items, addToCart, clearCart }}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
