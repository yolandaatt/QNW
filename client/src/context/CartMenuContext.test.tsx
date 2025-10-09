import { renderHook, act } from '@testing-library/react';
import { CartMenuProvider, useCartMenu } from './CartMenuContext';

describe('CartMenuContext', () => {
  it('should return default values', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartMenuProvider>{children}</CartMenuProvider>
    );

    const { result } = renderHook(() => useCartMenu(), { wrapper });

    expect(result.current.isOpen).toBe(false);
  });

  it('should open and close the cart menu', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartMenuProvider>{children}</CartMenuProvider>
    );

    const { result } = renderHook(() => useCartMenu(), { wrapper });

    act(() => {
      result.current.openMenu();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeMenu();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('throws error if used outside provider', () => {
    // Silence expected error log
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useCartMenu())).toThrow(
      'useCartMenu must be used within CartMenuProvider'
    );

    spy.mockRestore();
  });
});
