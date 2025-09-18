import { render, screen } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetailsPage from './ProductDetails';

describe('ProductDetailsPage', () => {
  it('visar produktens detaljer när den finns', () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText('Äpple')).toBeInTheDocument();
    expect(screen.getByText(/ett fräscht rött äpple/i)).toBeInTheDocument();
    expect(screen.getByText(/12(\.50)? kr/)).toBeInTheDocument();
  });

  it('visar felmeddelande om produkten inte hittas', () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/products/999']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/produkten kunde inte hittas/i)).toBeInTheDocument();
  });
});
