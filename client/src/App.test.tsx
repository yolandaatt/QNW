import { render, screen } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import App from './App';

describe('App', () => {
  it('renderar header och startsidans rubrik', async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    // Headern har rubriken "Min butik"
    expect(await screen.findByRole('heading', { name: /min butik/i })).toBeInTheDocument();
  });
});
