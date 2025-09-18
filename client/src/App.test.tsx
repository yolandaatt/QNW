import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { CartProvider } from './context/CartContext';

describe('App', () => {
  it('renderar header och startsidans rubrik', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    expect(screen.getByRole('heading', { name: /min butik/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /välkommen till qnw!/i })).toBeInTheDocument();
  });
});
