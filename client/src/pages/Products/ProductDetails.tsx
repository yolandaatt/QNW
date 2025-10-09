import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import type { Product } from '@/types/Product';
import { fetchProductById } from '@/api/Products';
import CartMenu from '@/components/CartMenu';

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCartMenu, setShowCartMenu] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="mt-10 text-center">Laddar produkt...</p>;
  if (error) return <p className="mt-10 text-center text-red-600">Fel: {error}</p>;
  if (!product)
    return <p className="mt-10 text-center text-red-600">Produkten kunde inte hittas</p>;

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link to="/products" className="mb-6 inline-block text-blue-600 hover:underline">
          Tillbaka till produkter
        </Link>
        <div className="grid gap-8 md:grid-cols-2">
          <img src={product.imageUrl} alt={product.title} className="rounded-lg shadow-md" />
          <div>
            <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
            <p className="mb-4 text-gray-600">{product.description}</p>
            <p className="mb-6 text-xl font-semibold">
              {typeof product.price === 'number' ? `${product.price.toFixed(2)} kr` : 'Pris saknas'}
            </p>

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
                onClick={() => {
                  addToCart(product!, quantity);
                  setShowCartMenu(true);
                }}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                Lägg i varukorg
              </button>
            </div>
          </div>
        </div>
      </div>
      <CartMenu isOpen={showCartMenu} onClose={() => setShowCartMenu(false)} />
    </>
  );
}

export default ProductDetailsPage;
