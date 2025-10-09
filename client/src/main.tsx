import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { UserProvider } from './context/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider>
  </UserProvider>
);
