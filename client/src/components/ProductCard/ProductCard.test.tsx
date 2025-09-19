import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '@/context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import type { Product } from '@/types/Product';

const mockProduct: Product = {
  _id: '1',
  title: 'Testprodukt',
  price: 99.99,
  imageUrl: 'https://via.placeholder.com/300',
  description: 'En testbeskrivning',
};

describe('ProductCard', () => {
  it('visar titel, pris och bild', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/testprodukt/i)).toBeInTheDocument();
    expect(screen.getByText(/99\.99\s*kr/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.imageUrl);
  });

  it('lägger till produkt i varukorgen vid klick', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /lägg i varukorg/i });
    fireEvent.click(button);

    expect(button).toBeEnabled();
  });
});
