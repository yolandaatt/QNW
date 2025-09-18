import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  onAddToCart?: () => void;
};

function ProductCard({ id, title, price, imageUrl }: ProductCardProps) {
  const { addToCart } = useCart();
  return (
    <div
      className="flex flex-col items-center rounded-lg border bg-white p-4 shadow-sm"
      data-testid="product-card"
    >
      <img src={imageUrl} alt={title} className="mb-4 h-32 w-32 rounded object-cover" />
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <p className="mb-4 text-gray-700">{price.toFixed(2)} kr</p>
      <button
        onClick={() => addToCart({ id, title, price })}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Lägg i varukorg
      </button>
    </div>
  );
}

export default ProductCard;
