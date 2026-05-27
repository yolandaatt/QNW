import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { CartMenuProvider } from './context/CartMenuContext.tsx';
import { FavoriteProvider } from './context/FavoriteContext.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FavoriteProvider>
          <CartProvider>
            <CartMenuProvider>
              <App />
            </CartMenuProvider>
          </CartProvider>
        </FavoriteProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
