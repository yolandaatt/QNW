import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import api from '@/api/axios';
import { useTranslation } from 'react-i18next';

type PaymentMethod = 'card' | 'swish' | 'invoice';

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { name, phone, address } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // paymentLabels använder t() så de översätts automatiskt
  const paymentLabels: Record<PaymentMethod, string> = {
    card: t('card'),
    swish: t('swish'),
    invoice: t('invoice'),
  };

  const [formData, setFormData] = useState({
    name: name ?? '',
    phone: phone ?? '',
    street: address?.street ?? '',
    city: address?.city ?? '',
    postalCode: address?.postalCode ?? '',
    country: address?.country ?? '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/orders', {
        items: items.map((item) => ({
          productId: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryAddress: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        phone: formData.phone,
        paymentMethod,
        totalPrice,
      });
      clearCart();
      navigate('/order-confirmation');
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

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
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-10 text-sm uppercase tracking-widest">{t('checkoutTitle')}</h1>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Vänster — formulär */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-xs uppercase tracking-widest text-gray-400">{t('deliveryInfo')}</p>

          <div>
            <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest">
              {t('name')}
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-xs uppercase tracking-widest">
              {t('phone')}
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="street" className="mb-2 block text-xs uppercase tracking-widest">
              {t('streetAddress')}
            </label>
            <input
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="postalCode" className="mb-2 block text-xs uppercase tracking-widest">
                {t('postalCode')}
              </label>
              <input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="city" className="mb-2 block text-xs uppercase tracking-widest">
                {t('city')}
              </label>
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="mb-2 block text-xs uppercase tracking-widest">
              {t('country')}
            </label>
            <input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
            />
          </div>

          {/* Betalsätt */}
          <div className="pt-4">
            <p className="mb-4 text-xs uppercase tracking-widest text-gray-400">
              {t('paymentMethod')}
            </p>
            <div className="flex gap-3">
              {(['card', 'swish', 'invoice'] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`border px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                    paymentMethod === method
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {paymentLabels[method]}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs uppercase tracking-widest text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? t('processing') : t('placeOrder')}
          </button>
        </form>

        {/* Höger — ordersammanfattning */}
        <div>
          <p className="mb-6 text-xs uppercase tracking-widest text-gray-400">{t('yourOrder')}</p>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span className="text-sm">
                  {item.title} x {item.quantity}
                </span>
                <span className="text-sm">{(item.price * item.quantity).toFixed(2)} kr</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t border-gray-200 pt-6">
            <p className="text-xs uppercase tracking-widest">{t('total')}</p>
            <p className="font-bold">{totalPrice.toFixed(2)} kr</p>
          </div>

          {/* Fri frakt-info */}
          {totalPrice >= 500 ? (
            <p className="mt-4 text-xs uppercase tracking-widest text-green-600">
              {t('freeShipping')}
            </p>
          ) : (
            <p className="mt-4 text-xs uppercase tracking-widest text-gray-400">
              {t('freeShippingLeft', { amount: (500 - totalPrice).toFixed(2) })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
