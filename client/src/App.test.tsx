import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { CartProvider } from './context/CartContext';

describe('App', () => {
  it('renderar en huvudrubrik', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    const h1 = screen.getByRole('heading', { level: 1, name: /välkommen/i });
    expect(h1).toBeInTheDocument();
  });
});
