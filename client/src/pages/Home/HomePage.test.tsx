import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { CartProvider } from '@/context/CartContext';
import { BrowserRouter } from 'react-router-dom';

describe('HomePage', () => {
  it('visar rubrik och introduktionstext', () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </CartProvider>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/välkommen/i);

    expect(screen.getByText(/det här är startsidan/i)).toBeInTheDocument();
  });
});
