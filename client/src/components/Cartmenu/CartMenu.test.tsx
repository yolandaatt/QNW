import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartMenu from './CartMenu';
import { CartProvider } from '@/context/CartContext';

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe('CartMenu', () => {
  beforeEach(() => {
    // Reset scroll lock
    document.body.style.overflow = 'auto';
  });

  it('renderar inte när isOpen är false', () => {
    renderWithProvider(<CartMenu isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText(/varukorg/i)).not.toBeInTheDocument();
  });

  it('renderar "varukorg" och "tom"-meddelande när isOpen är true och varukorgen är tom', () => {
    renderWithProvider(<CartMenu isOpen={true} onClose={() => {}} />);
    const headings = screen.getAllByText(/varukorg/i);
    expect(headings.length).toBeGreaterThan(0);
    expect(screen.getByText(/din varukorg är tom/i)).toBeInTheDocument();
  });

  it('låser scroll när öppen och återställer vid stängning', () => {
    const { rerender } = renderWithProvider(<CartMenu isOpen={true} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <CartProvider>
        <CartMenu isOpen={false} onClose={() => {}} />
      </CartProvider>
    );
    expect(document.body.style.overflow).toBe('auto');
  });

  it('kör onClose när overlay klickas', () => {
    const onClose = vi.fn();
    renderWithProvider(<CartMenu isOpen={true} onClose={onClose} />);

    const buttons = screen.getAllByRole('button');
    const overlay = buttons.find((btn) => btn.getAttribute('tabindex') === '0');

    expect(overlay).toBeDefined();
    fireEvent.click(overlay!);

    expect(onClose).toHaveBeenCalled();
  });

  it('kör onClose när "Stäng"-knappen klickas', () => {
    const onClose = vi.fn();
    renderWithProvider(<CartMenu isOpen={true} onClose={onClose} />);
    const button = screen.getByText(/stäng/i);
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalled();
  });
});
