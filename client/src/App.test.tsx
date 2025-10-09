import { render, screen } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import App from './App';
import { UserProvider } from './context/UserContext';
import { CartMenuProvider } from './context/CartMenuContext';

describe('App', () => {
  it('renderar header och startsidans rubrik', async () => {
    render(
      <UserProvider>
        <CartProvider>
          <CartMenuProvider>
            <App />
          </CartMenuProvider>
        </CartProvider>
      </UserProvider>
    );

    // Headern har rubriken "Min butik"
    expect(await screen.findByRole('heading', { name: /qnw/i })).toBeInTheDocument();
  });
});
