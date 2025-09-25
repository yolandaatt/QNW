import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';
import { vi, type Mock } from 'vitest';

vi.mock('@/api/Products', () => ({
  fetchProducts: vi.fn(),
}));

import { fetchProducts } from '@/api/Products';
import { CartProvider } from '@/context/CartContext';

beforeEach(() => {
  vi.clearAllMocks();

  (fetchProducts as Mock).mockResolvedValue([
    {
      _id: '1',
      title: 'Äpple',
      price: 12.5,
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Fräscht äpple',
    },
    {
      _id: '2',
      title: 'Banan',
      price: 8.75,
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Söt banan',
    },
  ]);
});

describe('HomePage', () => {
  it('visar rubrik från startsidan', async () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <HomePage />
        </CartProvider>
      </MemoryRouter>
    );
    const heading = await screen.findByRole('heading', { name: /välkommen till qnw!/i });
    expect(heading).toBeInTheDocument();
  });

  it('renderar produktkort för alla produkter', async () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <HomePage />
        </CartProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/äpple/i)).toBeInTheDocument();
      expect(screen.getByText(/banan/i)).toBeInTheDocument();
    });
  });
});
