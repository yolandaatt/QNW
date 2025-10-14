import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import CartPage from './CartPage';
import type { Product } from '@/types/Product';
import { vi } from 'vitest';

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
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

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
        _id: '1',
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

  it('kan öka kvantitet för en produkt', () => {
    const initialItems = [
      {
        _id: '1',
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

    const plusButton = screen.getByRole('button', { name: 'Öka kvantitet' });
    fireEvent.click(plusButton);

    expect(screen.getByText(/10.00 kr x 2/i)).toBeInTheDocument();
    expect(screen.getByText(/totalt:\s*20.00\s*kr/i)).toBeInTheDocument();
  });

  it('kan minska kvantitet för en produkt', () => {
    const initialItems = [
      {
        _id: '1',
        title: 'Äpple',
        price: 10,
        imageUrl: '',
        description: '',
        quantity: 2,
      },
    ];

    render(
      <CustomCartProvider initialItems={initialItems}>
        <CartPage />
      </CustomCartProvider>
    );

    const minusButton = screen.getByRole('button', { name: 'Minska kvantitet' });
    fireEvent.click(minusButton);

    expect(screen.getByText(/10.00 kr x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/totalt: 10.00 kr/i)).toBeInTheDocument();
  });

  it('tar bort en produkt ur varukorgen', () => {
    const initialItems = [
      {
        _id: '1',
        title: 'Äpple',
        price: 10,
        imageUrl: '',
        description: '',
        quantity: 2,
      },
    ];

    render(
      <CustomCartProvider initialItems={initialItems}>
        <CartPage />
      </CustomCartProvider>
    );

    const deleteButton = screen.getByRole('button', { name: 'Radera produkt' });
    fireEvent.click(deleteButton);

    expect(screen.getByText(/din varukorg är tom/i)).toBeInTheDocument();
  });
});
