import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { fetchProducts } from '@/api/Products';
import type { Product } from '@/types/Product';
import { useCart } from '@/context/CartContext';
import { useCartMenu } from '@/context/CartMenuContext';
import { useTranslation } from 'react-i18next';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

function ProductsPage() {
  const { addToCart } = useCart();
  const { openMenu } = useCartMenu();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  const handleAddToCartClick = (product: Product) => {
    addToCart(product);
    openMenu();
  };

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Hämtar unika kategorier från produkterna dynamiskt
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filtrering och sortering — körs varje gång något filter ändras
  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .filter((p) => (showInStockOnly ? p.stock > 0 : true))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name-asc') return a.title.localeCompare(b.title);
      return 0; // default — behåll ursprunglig ordning
    });

  if (loading) return <p className="mt-10 text-center text-gray-500">{t('loadingProducts')}</p>;
  if (error) return <p className="mt-10 text-center text-red-600">Fel: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Rubrik */}
      <h1 className="mb-10 text-sm uppercase tracking-widest">{t('allProducts')}</h1>

      {/* Filter och sortering */}
      <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6">
        {/* Sökfält */}
        <input
          type="text"
          placeholder={t('searchProducts')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-b border-gray-300 bg-transparent py-2 text-xs uppercase tracking-widest placeholder-gray-400 focus:border-black focus:outline-none"
        />

        {/* Kategorifilter — visas bara om det finns kategorier */}
        {categories.length > 0 && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-b border-gray-300 bg-transparent py-2 text-xs uppercase tracking-widest focus:border-black focus:outline-none"
          >
            <option value="">{t('allCategories')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        {/* Sortering */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border-b border-gray-300 bg-transparent py-2 text-xs uppercase tracking-widest focus:border-black focus:outline-none"
        >
          <option value="default">{t('sortBy')}</option>
          <option value="price-asc">{t('priceAsc')}</option>
          <option value="price-desc">{t('priceDesc')}</option>
          <option value="name-asc">{t('nameAsc')}</option>
        </select>

        {/* I lager-filter */}
        <label className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-widest">
          <input
            type="checkbox"
            checked={showInStockOnly}
            onChange={(e) => setShowInStockOnly(e.target.checked)}
            className="h-3 w-3"
          />
          {t('inStockOnly')}
        </label>

        {/* Återställ filter */}
        {(search || category || sort !== 'default' || showInStockOnly) && (
          <button
            onClick={() => {
              setSearch('');
              setCategory('');
              setSort('default');
              setShowInStockOnly(false);
            }}
            className="text-xs uppercase tracking-widest underline transition-opacity hover:opacity-60"
          >
            {t('reset')}
          </button>
        )}
      </div>

      {/* Antal resultat */}
      <p className="mb-6 text-xs uppercase tracking-widest text-gray-400">
        {t('results', { count: filteredProducts.length })}
      </p>

      {/* Produktgrid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCartClick={handleAddToCartClick}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400">{t('noProductsFound')}</p>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
