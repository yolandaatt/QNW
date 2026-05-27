import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import type { Product } from '@/types/Product';
import { fetchProductById } from '@/api/Products';
import { useCartMenu } from '@/context/CartMenuContext';
import { useFavorites } from '@/context/FavoriteContext';
import { useUser } from '@/context/UserContext';
import { useTranslation } from 'react-i18next';

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { openMenu } = useCartMenu();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isLoggedIn } = useUser();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const { t } = useTranslation();

  const handleAddToCartClick = () => {
    if (!product) return;
    addToCart(product, quantity);
    openMenu();
    // Visa bekräftelse i 2 sekunder
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="mt-10 text-center text-xs uppercase tracking-widest text-gray-400">
        {t('loadingProducts')}
      </p>
    );
  if (error) return <p className="mt-10 text-center text-red-600">Fel: {error}</p>;
  if (!product)
    return (
      <p className="mt-10 text-center text-xs uppercase tracking-widest text-gray-400">
        {t('noProductsFound')}
      </p>
    );

  const favorited = isFavorite(product._id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Tillbaka-länk */}
      <Link
        to="/products"
        className="mb-10 inline-block text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
      >
        {t('backToProducts')}
      </Link>

      <div className="grid gap-16 md:grid-cols-2">
        {/* Produktbild */}
        <div className="overflow-hidden">
          <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
        </div>

        {/* Produktinfo */}
        <div className="flex flex-col justify-center">
          {/* Kategori */}
          {product.category && (
            <p className="mb-3 text-xs uppercase tracking-widest text-gray-400">
              {product.category}
            </p>
          )}

          {/* Titel */}
          <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide">{product.title}</h1>

          {/* Pris */}
          <p className="mb-6 text-xl tracking-wide">
            {typeof product.price === 'number' ? `${product.price.toFixed(2)} kr` : t('noPrice')}
          </p>

          {/* Beskrivning */}
          {product.description && (
            <p className="mb-8 text-sm leading-relaxed text-gray-600">{product.description}</p>
          )}

          {/* Lagerstatus — lågt lager */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="mb-4 text-xs uppercase tracking-widest text-orange-500">
              {t('onlyLeft', { count: product.stock })}
            </p>
          )}

          {product.stock > 0 ? (
            <div className="flex flex-col gap-4">
              {/* Antal-väljare */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-sm transition-colors hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-4 py-2 text-sm transition-colors hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Hjärta — SVG i samma stil som produktkortet */}
                {isLoggedIn && (
                  <button
                    onClick={() => toggleFavorite(product._id)}
                    aria-label={favorited ? t('removeFromFavorites') : t('addToFavorites')}
                    className="transition-opacity hover:opacity-60"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill={favorited ? 'black' : 'none'}
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
                )}
              </div>

              {/* Lägg i varukorg-knapp */}
              <button
                onClick={handleAddToCartClick}
                className="w-full border border-black py-3 text-xs uppercase tracking-widest transition-all hover:bg-black hover:text-white"
              >
                {addedToCart ? t('addedToCart') : t('addToCart')}
              </button>
            </div>
          ) : (
            <div className="border border-gray-200 py-3 text-center text-xs uppercase tracking-widest text-gray-400">
              {t('outOfStock')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
