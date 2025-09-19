import { render, screen, waitFor } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('visar rubrik från startsidan', async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </CartProvider>
    );

    expect(
      await screen.findByRole('heading', { name: /välkommen till qnw!/i })
    ).toBeInTheDocument();
  });

  it('renderar produktkort för alla produkter', async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/äpple/i)).toBeInTheDocument();
      expect(screen.getByText(/banan/i)).toBeInTheDocument();
      expect(screen.getByText(/apelsin/i)).toBeInTheDocument();
    });
  });
});
