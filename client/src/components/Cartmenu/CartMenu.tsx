import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartMenu({ isOpen, onClose }: Props) {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Enter' && onClose()}
        role="button"
        tabIndex={0}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 right-0 top-0 z-50 flex w-80 flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-xs uppercase tracking-widest">{t('cart')}</h2>
          <button
            onClick={onClose}
            aria-label={t('closeCart')}
            className="text-gray-400 transition-colors hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Produktlista */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <p className="text-xs uppercase tracking-widest text-gray-400">{t('cartEmpty')}</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item._id} className="flex gap-4 border-b border-gray-100 pb-6">
                  {/* Produktinfo */}
                  <div className="flex-1">
                    <p className="mb-1 text-xs uppercase tracking-widest">{item.title}</p>
                    <p className="mb-3 text-sm text-gray-500">{item.price.toFixed(2)} kr</p>

                    {/* Antal */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        aria-label="Minska antal"
                        className="flex h-6 w-6 items-center justify-center border border-gray-300 text-sm transition-colors hover:border-black"
                      >
                        −
                      </button>
                      <span className="text-xs">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        aria-label="Öka antal"
                        className="flex h-6 w-6 items-center justify-center border border-gray-300 text-sm transition-colors hover:border-black"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Delpris och ta bort */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-sm">{(item.price * item.quantity).toFixed(2)} kr</p>
                    <button
                      onClick={() => removeItem(item._id)}
                      aria-label="Ta bort produkt"
                      className="text-xs uppercase tracking-widest text-gray-400 transition-colors hover:text-black"
                    >
                      {t('remove')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — totalt och knappar */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest">{t('total')}</p>
              <p className="text-sm font-bold">{total.toFixed(2)} kr</p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-black py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-gray-800"
            >
              {t('checkout')}
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full border border-gray-300 py-3 text-xs uppercase tracking-widest transition-all hover:border-black"
            >
              {t('continueShopping')}
            </button>
          </div>
        )}

        {items.length === 0 && (
          <div className="border-t border-gray-200 px-6 py-6">
            <button
              onClick={onClose}
              className="w-full border border-black py-3 text-xs uppercase tracking-widest transition-all hover:bg-black hover:text-white"
            >
              {t('continueShopping')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
