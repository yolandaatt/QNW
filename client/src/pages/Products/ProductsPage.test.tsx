import { render, screen } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';

describe('ProductsPage', () => {
  it('visar rubriken och produkter', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: /produkter/i })).toBeInTheDocument();

    expect(screen.getAllByTestId('product-card').length).toBeGreaterThan(0);
  });
});
