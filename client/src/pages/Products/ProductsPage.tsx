import { useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import type { Product } from '@/types/Product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Äpple',
    price: 12.5,
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Ett fräscht rött äpple.',
  },
  {
    id: 2,
    title: 'Banan',
    price: 8.0,
    imageUrl: 'https://via.placeholder.com/300',
    description: 'En söt och mogen banan.',
  },
  {
    id: 3,
    title: 'Apelsin',
    price: 15.0,
    imageUrl: 'https://via.placeholder.com/300',
    description: 'En saftig apelsin full av C-vitamin.',
  },
];

function ProductsPage() {
  const [search, setSearch] = useState('');

  const filteredProducts = mockProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

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
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Inga produkter matchade din sökning.</p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
