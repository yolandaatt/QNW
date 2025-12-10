import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { CartMenuProvider } from './context/CartMenuContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <CartMenuProvider>
            <App />
          </CartMenuProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
