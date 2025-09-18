import ProductCard from '@/components/ProductCard/ProductCard';
import type { Product } from '@/types/Product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Äpple',
    price: 12.5,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Ett fräscht rött äpple.',
  },
  {
    id: 2,
    title: 'Banan',
    price: 8.0,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'En söt och mogen banan.',
  },
  {
    id: 3,
    title: 'Apelsin',
    price: 15.0,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'En saftig apelsin full av C-vitamin.',
  },
];

function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Välkommen till QNW!</h1>
      <p className="text-lg text-gray-700">Det här är startsidan.</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
