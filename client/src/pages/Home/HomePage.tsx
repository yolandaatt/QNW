import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import type { Product } from '@/types/Product';
import { fetchProducts } from '@/api/Products';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="mt-10 text-center">Laddar produkter...</p>;
  if (error) return <p className="mt-10 text-center text-red-600">Fel: {error}</p>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Välkommen till QNW!</h1>
      <p className="text-lg text-gray-700">Det här är startsidan.</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p>Inga produkter tillgängliga just nu.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
