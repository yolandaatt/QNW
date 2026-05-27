import { Link } from 'react-router-dom';
import type { Product } from '@/types/Product';
import { useFavorites } from '@/context/FavoriteContext';
import { useUser } from '@/context/UserContext';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  onAddToCartClick: (product: Product) => void;
}

function ProductCard({ product, onAddToCartClick }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isLoggedIn } = useUser();

  const favorited = isFavorite(product._id);

  const { t } = useTranslation();

  return (
    <div className="group relative flex flex-col bg-white" data-testid="product-card">
      {/* Produktbild med hover-overlay */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Hjärta — minimalistiskt, visas alltid men tonas in tydligare vid hover */}
        {isLoggedIn && (
          <button
            onClick={() => toggleFavorite(product._id)}
            aria-label={favorited ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
            className="absolute right-3 top-3 transition-opacity duration-200"
          >
            {/* SVG-hjärta i Wolf & Badger-stil */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
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

        {/* Slutsåld-badge */}
        {product.stock === 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 py-2 text-center text-xs uppercase tracking-widest">
            {t('outOfStock')}
          </div>
        )}
      </div>

      {/* Produktinfo */}
      <div className="flex flex-col gap-3 py-4">
        <Link to={`/products/${product._id}`}>
          <h2 className="text-sm uppercase tracking-wide transition-opacity hover:opacity-60">
            {product.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-600">{product.price.toFixed(2)} kr</p>

        {product.stock > 0 && (
          <button
            onClick={() => onAddToCartClick(product)}
            className="w-full border border-black py-2 text-xs uppercase tracking-widest transition-all hover:bg-black hover:text-white"
          >
            {t('addToCart')}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
