import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartMenu({ isOpen, onClose }: Props) {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="fixed bottom-0 right-0 top-0 z-50 w-64 overflow-y-auto bg-white p-4 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">Varukorg</h2>
        {items.length === 0 ? (
          <p>Din varukorg är tom</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item._id} className="border-b pb-2">
                <p className="font-semibold">{item.title}</p>
                <p>
                  {item.quantity} x {item.price.toFixed(2)} kr
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="rounded bg-gray-200 px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="rounded bg-gray-200 px-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="ml-auto text-sm text-red-600 hover:underline"
                  >
                    Ta bort
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && <p className="mt-4 font-semibold">Totalt: {total.toFixed(2)} kr</p>}

        <button onClick={onClose} className="mt-4 w-full rounded bg-gray-800 py-2 text-white">
          Stäng
        </button>
      </div>

      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Enter' && onClose()}
        role="button"
        tabIndex={0}
      />
    </>
  );
}
