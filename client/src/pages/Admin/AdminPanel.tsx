import { useEffect, useState } from 'react';
import type { Product } from '@/types/Product';
import api from '@/api/axios';

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const adminName = localStorage.getItem('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get<Product[]>('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Fel vid hämtning av produkter:', err);
        setError('Kunde inte ladda produkter');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="p-4">
      <h1 className="mb-2 text-2xl font-bold">Adminpanel</h1>
      <p className="mb-4">Välkommen, {adminName}</p>
      <p className="mb-6">Här kan du lägga till, redigera och ta bort produkter.</p>

      {loading && <p>Laddar produkter...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="flex items-center justify-between rounded border p-2">
            <div>
              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.price} kr</p>
            </div>
            <div className="space-x-2">
              <button className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600">
                Redigera
              </button>
              <button className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
                Ta bort
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          Lägg till ny produkt
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
