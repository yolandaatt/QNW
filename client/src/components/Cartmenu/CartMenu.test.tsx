import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartMenu from './CartMenu';
import * as CartContext from '@/context/CartContext';

// Mockad produkt
const mockItem = {
  _id: 'abc123',
  title: 'Testprodukt',
  price: 100,
  quantity: 2,
  description: 'Detta är en testprodukt',
  imageUrl: 'https://example.com/image.jpg',
};

const mockIncrease = vi.fn();
const mockDecrease = vi.fn();
const mockRemove = vi.fn();

const emptyCartMock = {
  items: [],
  increaseQuantity: vi.fn(),
  decreaseQuantity: vi.fn(),
  removeItem: vi.fn(),
  addToCart: vi.fn(),
  clearCart: vi.fn(),
};

const filledCartMock = {
  items: [mockItem],
  increaseQuantity: mockIncrease,
  decreaseQuantity: mockDecrease,
  removeItem: mockRemove,
  addToCart: vi.fn(),
  clearCart: vi.fn(),
};

describe('CartMenu', () => {
  beforeEach(() => {
    document.body.style.overflow = 'auto';
    vi.spyOn(CartContext, 'useCart').mockReturnValue(emptyCartMock);
  });

  it('renderar inte när isOpen är false', () => {
    render(<CartMenu isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText(/varukorg/i)).not.toBeInTheDocument();
  });

  it('renderar "Varukorg" och tomt-meddelande när öppen utan produkter', () => {
    render(<CartMenu isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('heading', { name: /varukorg/i })).toBeInTheDocument();
    expect(screen.getByText(/din varukorg är tom/i)).toBeInTheDocument();
  });

  it('låser scroll när öppen och återställer vid stängning', () => {
    const { rerender } = render(<CartMenu isOpen={true} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<CartMenu isOpen={false} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('kör onClose när overlay klickas', () => {
    const onClose = vi.fn();
    render(<CartMenu isOpen={true} onClose={onClose} />);
    const overlay = screen.getAllByRole('button').find((el) => el.getAttribute('tabindex') === '0');
    expect(overlay).toBeTruthy();
    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalled();
  });

  it('kör onClose när "Stäng"-knappen klickas', () => {
    const onClose = vi.fn();
    render(<CartMenu isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByText(/stäng/i));
    expect(onClose).toHaveBeenCalled();
  });

  describe('med produkter i varukorgen', () => {
    beforeEach(() => {
      vi.spyOn(CartContext, 'useCart').mockReturnValue(filledCartMock);
    });

    it('renderar produktinformation och totalpris korrekt', () => {
      render(<CartMenu isOpen={true} onClose={() => {}} />);
      expect(screen.getByText(/testprodukt/i)).toBeInTheDocument();
      expect(screen.getByText('2 x 100.00 kr')).toBeInTheDocument();
      expect(screen.getByText('Totalt: 200.00 kr')).toBeInTheDocument();
    });

    it('ökar kvantiteten när +-knappen klickas', () => {
      render(<CartMenu isOpen={true} onClose={() => {}} />);
      fireEvent.click(screen.getByText('+'));
      expect(mockIncrease).toHaveBeenCalledWith('abc123');
    });

    it('minskar kvantiteten när --knappen klickas', () => {
      render(<CartMenu isOpen={true} onClose={() => {}} />);
      fireEvent.click(screen.getByText('-'));
      expect(mockDecrease).toHaveBeenCalledWith('abc123');
    });

    it('tar bort produkt när "Ta bort"-knappen klickas', () => {
      render(<CartMenu isOpen={true} onClose={() => {}} />);
      fireEvent.click(screen.getByText(/ta bort/i));
      expect(mockRemove).toHaveBeenCalledWith('abc123');
    });
  });

  it('kör onClose vid Enter-tangent på overlay', () => {
    const onClose = vi.fn();
    render(<CartMenu isOpen={true} onClose={onClose} />);
    const overlay = screen.getAllByRole('button').find((el) => el.getAttribute('tabindex') === '0');
    expect(overlay).toBeTruthy();
    fireEvent.keyDown(overlay!, { key: 'Enter', code: 'Enter', keyCode: 13 });
    expect(onClose).toHaveBeenCalled();
  });
});
