import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { fetchProducts } from '@/api/Products';
import type { Product } from '@/types/Product';
import { useCart } from '@/context/CartContext';
import { useCartMenu } from '@/context/CartMenuContext';

function ProductsPage() {
  const { addToCart } = useCart();
  const { openMenu } = useCartMenu();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Laddar produkter...</p>;
  if (error) return <p className="text-red-600">Fel: {error}</p>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Produkter</h1>

      <input
        type="text"
        placeholder="Sök produkter..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCartClick={handleAddToCartClick}
            />
          ))
        ) : (
          <p>Inga produkter matchade din sökning.</p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
