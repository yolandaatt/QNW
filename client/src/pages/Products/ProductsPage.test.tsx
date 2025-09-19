import { render, screen } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import { vi, type Mock } from 'vitest';

describe('ProductsPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn() as unknown as Mock;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('visar rubriken och produkter', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          _id: '1',
          title: 'Äpple',
          price: 12.5,
          imageUrl: 'https://via.placeholder.com/150',
          description: 'Ett fräscht rött äpple',
        },
        {
          _id: '2',
          title: 'Banan',
          price: 8.0,
          imageUrl: 'https://via.placeholder.com/150',
          description: 'En söt och mogen banan',
        },
      ],
    });

    render(
      <CartProvider>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </CartProvider>
    );

    // Vänta in att rubriken dyker upp
    expect(
      await screen.findByRole('heading', { level: 1, name: /produkter/i })
    ).toBeInTheDocument();

    // Vänta in att produktkorten renderas
    const cards = await screen.findAllByTestId('product-card');
    expect(cards.length).toBe(2);
  });
});
