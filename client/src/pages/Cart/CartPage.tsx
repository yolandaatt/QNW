import { useCart } from '@/context/CartContext';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

function CartPage() {
  const { items, clearCart, increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mb-6 text-xs uppercase tracking-widest text-gray-400">{t('cartEmpty')}</p>
        <Link
          to="/products"
          className="text-xs uppercase tracking-widest underline transition-opacity hover:opacity-60"
        >
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-10 text-sm uppercase tracking-widest">{t('yourCart')}</h1>

      {/* Produktlista */}
      <div className="space-y-0">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b border-gray-100 py-6"
          >
            {/* Produktinfo */}
            <div className="flex-1">
              <p className="mb-1 text-xs uppercase tracking-widest">{item.title}</p>
              <p className="text-sm text-gray-500">{item.price.toFixed(2)} kr</p>
            </div>

            {/* Antal-kontroller */}
            <div className="flex items-center gap-3">
              <button
                aria-label={t('decreaseQuantity')}
                onClick={() => decreaseQuantity(item._id)}
                className="flex h-7 w-7 items-center justify-center border border-gray-300 text-sm transition-colors hover:border-black"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <button
                aria-label={t('increaseQuantity')}
                onClick={() => increaseQuantity(item._id)}
                className="flex h-7 w-7 items-center justify-center border border-gray-300 text-sm transition-colors hover:border-black"
              >
                +
              </button>
            </div>

            {/* Delpris och ta bort */}
            <div className="ml-8 flex flex-col items-end gap-2">
              <p className="text-sm">{(item.price * item.quantity).toFixed(2)} kr</p>
              <button
                aria-label={t('remove')}
                onClick={() => removeItem(item._id)}
                className="text-xs uppercase tracking-widest text-gray-400 transition-colors hover:text-black"
              >
                {t('remove')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Totalt och knappar */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest">{t('total')}</p>
          <p className="text-lg font-bold">{total.toFixed(2)} kr</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-black py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-gray-800"
          >
            {t('checkout')}
          </button>
          <button
            onClick={clearCart}
            className="w-full border border-gray-300 py-3 text-xs uppercase tracking-widest transition-all hover:border-black"
          >
            {t('clearCart')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
