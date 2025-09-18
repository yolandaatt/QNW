import { render, screen } from '@testing-library/react';
import ProductsPage from './ProductsPage';
import { CartProvider } from '@/context/CartContext';
import { BrowserRouter } from 'react-router-dom';

describe('ProductsPage', () => {
  it('visar rubriken och produkter', () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <ProductsPage />
        </BrowserRouter>
      </CartProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: /produkter/i })).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(6);
  });
});
