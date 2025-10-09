import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import type { Product } from '@/types/Product';

const product: Product = {
  _id: '1',
  title: 'Testprodukt',
  price: 100,
  imageUrl: 'test.jpg',
  description: 'En testprodukt',
};

describe('CartContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
  });

  it('adds product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('adds product with custom quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(product, 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it('increases quantity of existing product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        _id: '1',
        title: 'Testprodukt',
        price: 100,
        imageUrl: 'test.jpg',
        description: 'En testprodukt',
      });
    });

    act(() => {
      result.current.increaseQuantity('1');
    });

    const item = result.current.items.find((i) => i._id === '1');
    expect(item).toBeDefined();
    expect(item?.quantity).toBe(2);
  });

  it('decreases quantity and removes if zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.decreaseQuantity('1');
      result.current.decreaseQuantity('1');
      result.current.decreaseQuantity('1');
      result.current.decreaseQuantity('1'); // now 0 → should remove
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('removes item directly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(product, 2);
      result.current.removeItem('1');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(product);
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
  });

  it('throws error if used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within CartProvider');
    spy.mockRestore();
  });
});
