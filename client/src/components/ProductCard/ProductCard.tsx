import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/Product';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div
      className="flex flex-col items-center rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      data-testid="product-card"
    >
      <Link to={`/products/${product._id}`} className="block w-full text-center">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="mx-auto mb-4 h-32 w-32 rounded object-cover"
        />
        <h2 className="mb-2 text-lg font-semibold">{product.title}</h2>
        <p className="mb-4 text-gray-700">{product.price.toFixed(2)} kr</p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Lägg i varukorg
      </button>
    </div>
  );
}

export default ProductCard;
