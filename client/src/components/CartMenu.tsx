import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartMenu({ isOpen, onClose }: Props) {
  const { items } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;
  console.log('MENYN ÄR ÖPPEN');

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
              </li>
            ))}
          </ul>
        )}

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
