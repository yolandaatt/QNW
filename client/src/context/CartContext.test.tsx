import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import type { Product } from '@/types/Product';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct: Product = {
  _id: '1',
  title: 'Testprodukt',
  price: 100,
  imageUrl: '',
  description: '',
};

beforeEach(() => {
  localStorage.clear();
});

describe('CartContext', () => {
  it('kan lägga till en produkt i varukorgen', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].title).toBe('Testprodukt');
  });

  it('ökar kvantitet om samma produkt läggs till igen', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it('tömmer varukorgen', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('kan öka och minska kvantitet', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.increaseQuantity('1');
    });

    expect(result.current.items[0].quantity).toBe(2);

    act(() => {
      result.current.decreaseQuantity('1');
    });

    expect(result.current.items[0].quantity).toBe(1);
  });

  it('tar bort produkt när kvantitet blir 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1);
      result.current.decreaseQuantity('1');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('kan ta bort produkt direkt', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.removeItem('1');
    });

    expect(result.current.items).toHaveLength(0);
  });
});
