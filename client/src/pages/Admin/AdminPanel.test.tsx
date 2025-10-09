import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, beforeEach, expect } from 'vitest';

const { apiMock, fetchProductsMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  fetchProductsMock: vi.fn(),
}));

vi.mock('@/api/axios', () => ({ default: apiMock }));
vi.mock('@/api/Products', () => ({ fetchProducts: fetchProductsMock }));

import AdminPanel from './AdminPanel';
import type { Product } from '@/types/Product';

const sampleProduct = (overrides: Partial<Product> = {}): Product => ({
  _id: '1',
  title: 'Testprodukt',
  price: 100,
  description: 'En fin produkt',
  imageUrl: '',
  ...overrides,
});

describe('AdminPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.confirm = vi.fn(() => true);

    fetchProductsMock.mockResolvedValue([sampleProduct()]);

    const createdProduct = sampleProduct({ _id: 'new123', title: 'Ny produkt', price: 200 });

    apiMock.post.mockResolvedValue({ data: createdProduct });
    apiMock.put.mockResolvedValue({ data: createdProduct });
    apiMock.delete.mockResolvedValue({ data: { ok: true } });
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

  it('renders admin panel correctly', async () => {
    renderPage();

    expect(await screen.findByText(/Välkommen/i)).toBeInTheDocument();
    expect(await screen.findByText('Testprodukt')).toBeInTheDocument();

    expect(await screen.findByRole('button', { name: /Redigera/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Ta bort/i })).toBeInTheDocument();
  });

  it('creates a new product', async () => {
    fetchProductsMock.mockResolvedValueOnce([]);

    renderPage();

    const addBtn = await screen.findByText(/Lägg till produkt/i);
    fireEvent.click(addBtn);

    fireEvent.change(screen.getByPlaceholderText(/Titel/i), {
      target: { value: 'Ny produkt' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Pris/i), {
      target: { value: '200' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Beskrivning/i), {
      target: { value: 'Beskrivning' },
    });
    const imgInput = screen.queryByPlaceholderText(/Bild-URL/i);
    if (imgInput) {
      fireEvent.change(imgInput, { target: { value: '' } });
    }

    fireEvent.click(screen.getByRole('button', { name: /Spara/i }));

    await waitFor(() => {
      expect(apiMock.post).toHaveBeenCalledWith('/products', {
        title: 'Ny produkt',
        price: 200,
        description: 'Beskrivning',
        imageUrl: '',
      });
    });
  });

  it('edits a product', async () => {
    const prod = sampleProduct({ _id: '42', title: 'Gammal titel', price: 50 });
    fetchProductsMock.mockResolvedValueOnce([prod]);

    renderPage();

    const editButton = await screen.findByRole('button', { name: /Redigera/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByPlaceholderText(/Titel/i) as HTMLInputElement;
    const priceInput = screen.getByPlaceholderText(/Pris/i) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: 'Ny titel' } });
    fireEvent.change(priceInput, { target: { value: '75' } });

    fireEvent.click(screen.getByRole('button', { name: /Spara/i }));

    await waitFor(() => {
      expect(apiMock.put).toHaveBeenCalledWith('/products/42', {
        title: 'Ny titel',
        price: 75,
        description: prod.description,
        imageUrl: prod.imageUrl,
      });
    });
  });

  it('deletes a product', async () => {
    const prod = sampleProduct({ _id: 'abc123' });
    fetchProductsMock.mockResolvedValueOnce([prod]);

    renderPage();

    const deleteButton = await screen.findByRole('button', { name: /Ta bort/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(apiMock.delete).toHaveBeenCalledWith('/products/abc123');
    });
  });

  it('shows error message on API failure', async () => {
    fetchProductsMock.mockRejectedValueOnce(new Error('boom'));

    renderPage();

    expect(await screen.findByText(/Kunde inte ladda produkter/i)).toBeInTheDocument();
  });
});
