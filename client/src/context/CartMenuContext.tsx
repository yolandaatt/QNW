import { createContext, useContext, useState } from 'react';

type CartMenuContextType = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const CartMenuContext = createContext<CartMenuContextType | undefined>(undefined);

export const CartMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <CartMenuContext.Provider value={{ isOpen, openMenu, closeMenu }}>
      {children}
    </CartMenuContext.Provider>
  );
};

export const useCartMenu = () => {
  const context = useContext(CartMenuContext);
  if (!context) throw new Error('useCartMenu must be used within CartMenuProvider');
  return context;
};
