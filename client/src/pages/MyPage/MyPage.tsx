import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import api from '@/api/axios';
import { useFavorites } from '@/context/FavoriteContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

const MyPage = () => {
  const { name, email, phone, address, updateUser } = useUser();
  const { t } = useTranslation();

  // statusLabel använder t() så de översätts automatiskt
  const statusLabel: Record<string, string> = {
    pending: t('pending'),
    confirmed: t('confirmed'),
    shipped: t('shipped'),
    delivered: t('delivered'),
  };

  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'orders'>('profile');
  const [formData, setFormData] = useState({
    name: name ?? '',
    phone: phone ?? '',
    street: address?.street ?? '',
    city: address?.city ?? '',
    postalCode: address?.postalCode ?? '',
    country: address?.country ?? '',
  });
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();

  useEffect(() => {
    setFormData({
      name: name ?? '',
      phone: phone ?? '',
      street: address?.street ?? '',
      city: address?.city ?? '',
      postalCode: address?.postalCode ?? '',
      country: address?.country ?? '',
    });
  }, [name, phone, address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({
      name: formData.name,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  useEffect(() => {
    if (activeTab !== 'orders') return;
    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const res = await api.get('/orders/my');
        setOrders(res.data);
      } catch {
        console.error('Kunde inte hämta ordrar');
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [activeTab]);

  const tabs = [
    { key: 'profile', label: t('myDetails') },
    { key: 'favorites', label: t('favorites') },
    { key: 'orders', label: t('orders') },
  ] as const;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Rubrik */}
      <h1 className="mb-10 text-sm uppercase tracking-widest">{t('myPageTitle')}</h1>

      {/* Flikar */}
      <div className="mb-10 flex gap-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-xs uppercase tracking-widest transition-colors ${
              activeTab === tab.key
                ? 'border-b-2 border-black text-black'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mina uppgifter */}
      {activeTab === 'profile' && (
        <section>
          {email && (
            <p className="mb-8 text-xs uppercase tracking-widest text-gray-400">
              {t('loggedInAs')}: {email}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest">
                {t('name')}
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <p className="pt-4 text-xs uppercase tracking-widest text-gray-400">
              {t('deliveryAddress')}
            </p>

            <div>
              <label htmlFor="street" className="mb-2 block text-xs uppercase tracking-widest">
                {t('streetAddress')}
              </label>
              <input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="mb-2 block text-xs uppercase tracking-widest">
                {t('postalCode')}
              </label>
              <input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="mb-2 block text-xs uppercase tracking-widest">
                  {t('city')}
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                />
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
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full border border-black py-3 text-xs uppercase tracking-widest transition-all hover:bg-black hover:text-white"
            >
              {t('save')}
            </button>

            {saved && (
              <p className="text-center text-xs uppercase tracking-widest text-green-600">
                {t('saved')}
              </p>
            )}
          </form>
        </section>
      )}

      {/* Favoriter */}
      {activeTab === 'favorites' && (
        <section>
          {favoritesLoading && (
            <p className="text-xs uppercase tracking-widest text-gray-400">{t('loading')}</p>
          )}

          {!favoritesLoading && favorites.length === 0 && (
            <div className="py-16 text-center">
              <p className="mb-4 text-xs uppercase tracking-widest text-gray-400">
                {t('noFavorites')}
              </p>
              <Link
                to="/products"
                className="text-xs uppercase tracking-widest underline transition-opacity hover:opacity-60"
              >
                {t('exploreProdcuts')}
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {favorites.map((favorite) => (
              <div key={favorite._id} className="group relative">
                <Link to={`/products/${favorite.productId._id}`}>
                  <img
                    src={favorite.productId.imageUrl}
                    alt={favorite.productId.title}
                    className="mb-3 h-48 w-full object-cover transition-opacity group-hover:opacity-80"
                  />
                  <p className="text-xs uppercase tracking-widest">{favorite.productId.title}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {favorite.productId.price.toFixed(2)} kr
                  </p>
                </Link>
                <button
                  onClick={() => toggleFavorite(favorite.productId._id)}
                  aria-label={t('removeFromFavorites')}
                  className="absolute right-2 top-2 transition-opacity hover:opacity-60"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="black"
                    stroke="black"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ordrar */}
      {activeTab === 'orders' && (
        <section>
          {ordersLoading && (
            <p className="text-xs uppercase tracking-widest text-gray-400">{t('loading')}</p>
          )}

          {!ordersLoading && orders.length === 0 && (
            <div className="py-16 text-center">
              <p className="mb-4 text-xs uppercase tracking-widest text-gray-400">
                {t('noOrders')}
              </p>
              <Link
                to="/products"
                className="text-xs uppercase tracking-widest underline transition-opacity hover:opacity-60"
              >
                {t('startShopping')}
              </Link>
            </div>
          )}

          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border border-gray-200 p-6">
                {/* Orderhuvud */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('sv-SE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <span className="text-xs uppercase tracking-widest">
                    {statusLabel[order.status] ?? order.status}
                  </span>
                </div>

                {/* Produkter */}
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toFixed(2)} kr</span>
                    </div>
                  ))}
                </div>

                {/* Totalt */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    {order.paymentMethod === 'card'
                      ? t('card')
                      : order.paymentMethod === 'swish'
                        ? t('swish')
                        : t('invoice')}
                  </p>
                  <p className="text-sm font-bold">{order.totalPrice.toFixed(2)} kr</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyPage;
