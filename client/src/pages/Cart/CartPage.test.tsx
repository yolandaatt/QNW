import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import CartPage from './CartPage';
import type { Product } from '@/types/Product';

function CustomCartProvider({
  children,
  initialItems = [],
}: {
  children: React.ReactNode;
  initialItems?: (Product & { quantity: number })[];
}) {
  return (
    <CartProvider initialItems={initialItems}>
      <MemoryRouter>{children}</MemoryRouter>
    </CartProvider>
  );
}

describe('CartPage', () => {
  it('visar "Din varukorg är tom" när varukorgen är tom', () => {
    render(
      <CustomCartProvider>
        <CartPage />
      </CustomCartProvider>
    );

    expect(screen.getByText(/din varukorg är tom/i)).toBeInTheDocument();
  });

  it('visar produkt i varukorgen och kan tömmas', () => {
    const initialItems = [
      {
        id: 1,
        title: 'Äpple',
        price: 10,
        imageUrl: '',
        description: '',
        quantity: 1,
      },
    ];

    render(
      <CustomCartProvider initialItems={initialItems}>
        <CartPage />
      </CustomCartProvider>
    );

    expect(screen.getByText(/äpple/i)).toBeInTheDocument();
    expect(screen.getByText(/10.00 kr x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/totalt: 10.00 kr/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /töm varukorg/i }));

    expect(screen.getByText(/din varukorg är tom/i)).toBeInTheDocument();
  });
});
