import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '@/context/CartContext';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Testprodukt',
    price: 199,
    imageUrl: 'https://via.placeholder.com/150',
  };

  it('visar titel, pris och bild', () => {
    render(
      <CartProvider>
        <ProductCard {...mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText(/testprodukt/i)).toBeInTheDocument();
    expect(screen.getByText(/199\.00 kr/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.imageUrl);
  });

  it('lägger till produkt i varukorgen vid klick', () => {
    render(
      <CartProvider>
        <ProductCard {...mockProduct} />
      </CartProvider>
    );

    fireEvent.click(screen.getByText(/lägg i varukorg/i));

    expect(screen.getByText(/lägg i varukorg/i)).toBeInTheDocument();
  });
});
