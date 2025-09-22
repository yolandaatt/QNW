import { useCart } from '@/context/CartContext';

function CartPage() {
  const { items, clearCart } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Din varukorg</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Din varukorg är tom</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="flex items-center justify-between border-b pb-2">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p>
                  {item.price.toFixed(2)} kr x {item.quantity}{' '}
                </p>
              </div>
              <p className="font-bold">{(item.price * item.quantity).toFixed(2)} kr</p>
            </div>
          ))}

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <p className="text-xl font-bold">
              Totalt: {items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)} kr
            </p>
            <button
              onClick={clearCart}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Töm varukorg
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
