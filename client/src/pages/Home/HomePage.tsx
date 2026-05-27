import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard/ProductCard';
import type { Product } from '@/types/Product';
import { fetchProducts } from '@/api/Products';
import { useCartMenu } from '@/context/CartMenuContext';
import { useCart } from '@/context/CartContext';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const { addToCart } = useCart();
  const { openMenu } = useCartMenu();

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCartClick = (product: Product) => {
    addToCart(product);
    openMenu();
  };

  return (
    <div>
      {/* Hero-sektion */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1773209045532-ce37d47c73c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative text-center text-white">
          <p className="mb-3 text-xs uppercase tracking-widest">{t('welcomeTo')}</p>
          <h1 className="mb-6 text-6xl font-bold uppercase tracking-widest">Lumière</h1>
          <p className="mb-8 text-sm uppercase tracking-widest">{t('discoverProducts')}</p>
          <Link
            to="/products"
            className="border border-white px-8 py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            {t('shopNow')}
          </Link>
        </div>
      </section>

      {/* Produkter */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-widest">{t('ourProducts')}</h2>
          <Link
            to="/products"
            className="text-xs uppercase tracking-widest underline transition-opacity hover:opacity-60"
          >
            {t('seeAll')}
          </Link>
        </div>

        {loading && <p className="text-center text-gray-500">{t('loading')}</p>}
        {error && <p className="text-center text-red-600">Fel: {error}</p>}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCartClick={handleAddToCartClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
