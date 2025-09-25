import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ProductsPage from './ProductsPage';
import { CartProvider } from '@/context/CartContext';

const { mockFetchProducts } = vi.hoisted(() => ({
  mockFetchProducts: vi.fn(),
}));

vi.mock('@/api/Products', () => ({
  fetchProducts: mockFetchProducts,
}));

beforeEach(() => {
  mockFetchProducts.mockResolvedValue([
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

describe('ProductsPage', () => {
  it('visar rubriken och produkter', async () => {
    render(
      <MemoryRouter>
        <CartProvider>
          {' '}
          <ProductsPage />
        </CartProvider>
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /produkter/i });
    expect(heading).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/äpple/i)).toBeInTheDocument();
      expect(screen.getByText(/banan/i)).toBeInTheDocument();
    });
  });
});
