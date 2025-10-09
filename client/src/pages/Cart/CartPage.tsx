import { useCart } from '@/context/CartContext';

function CartPage() {
  const { items, clearCart, increaseQuantity, decreaseQuantity, removeItem } = useCart();

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
                  <span className="font-bold">{(item.price * item.quantity).toFixed(2)} kr</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="rounded bg-gray-300 px-2 py-1 hover:bg-gray-400"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="rounded bg-gray-300 px-2 py-1 hover:bg-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="ml-4 rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                >
                  Radera produkt
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <p className="text-xl font-bold">
              {`Totalt: ${items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)} kr`}
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
