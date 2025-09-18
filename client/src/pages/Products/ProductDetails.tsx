import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
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

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return <p className="mt-10 text-center">Produkten kunde inte hittas</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/products" className="mb-6 inline-block text-blue-600 hover:underline">
        Tillbaka till produkter
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <img src={product.imageUrl} alt={product.title} className="rounded-lg shadow-md" />
        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
          <p className="mb-4 text-gray-600">{product.description}</p>
          <p className="mb-6 text-xl font-semibold">{product.price.toFixed(2)} kr</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg"
              >
                -
              </button>

              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 text-lg">
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Lägg i varukorg
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
