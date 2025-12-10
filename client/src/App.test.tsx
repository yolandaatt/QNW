import { render, screen } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import App from './App';
import { UserProvider } from './context/UserContext';
import { CartMenuProvider } from './context/CartMenuContext';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('renderar header och startsidans rubrik', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <CartProvider>
            <CartMenuProvider>
              <App />
            </CartMenuProvider>
          </CartProvider>
        </UserProvider>
      </MemoryRouter>
    );

    // Headern har rubriken "qnw"
    expect(await screen.findByRole('heading', { name: /qnw/i })).toBeInTheDocument();
  });
});
