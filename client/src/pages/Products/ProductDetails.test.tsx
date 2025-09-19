import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { vi, type MockInstance } from 'vitest';
import ProductDetailsPage from './ProductDetails';
import * as api from '@/api/Products';

const mockProduct = {
  _id: '1',
  title: 'Äpple',
  description: 'Ett fräscht rött äpple',
  price: 12.5,
  imageUrl: 'https://via.placeholder.com/150',
};

describe('ProductDetailsPage', () => {
  let fetchProductByIdMock: MockInstance;

  beforeEach(() => {
    // Mocka fetchProductById
    fetchProductByIdMock = vi.spyOn(api, 'fetchProductById').mockResolvedValue(mockProduct);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('visar produktens detaljer när den finns', async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    expect(await screen.findByRole('heading', { name: /äpple/i })).toBeInTheDocument();
    expect(screen.getByText(/ett fräscht rött äpple/i)).toBeInTheDocument();
    expect(screen.getByText(/12\.50 kr/)).toBeInTheDocument();
  });

  it('visar felmeddelande om produkten inte hittas', async () => {
    fetchProductByIdMock.mockRejectedValueOnce(new Error('Product not found'));

    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/products/999']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    expect(await screen.findByText(/fel: product not found/i)).toBeInTheDocument();
  });
});
