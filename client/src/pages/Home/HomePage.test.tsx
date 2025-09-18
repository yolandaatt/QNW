import { render, screen } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('visar rubrik och introduktionstext', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByRole('heading', { name: /välkommen till qnw!/i })).toBeInTheDocument();

    expect(screen.getByText(/det här är startsidan/i)).toBeInTheDocument();
  });

  it('renderar produktkort för alla produkter', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </CartProvider>
    );
    expect(screen.getByText(/äpple/i)).toBeInTheDocument();
    expect(screen.getByText(/banan/i)).toBeInTheDocument();
    expect(screen.getByText(/apelsin/i)).toBeInTheDocument();
  });
});
