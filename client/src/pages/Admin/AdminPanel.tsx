import { useEffect, useState } from 'react';
import type { Product } from '@/types/Product';
import { fetchProducts } from '@/api/Products';
import api from '@/api/axios';

type FormMode = 'add' | 'edit' | null;

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const adminName = localStorage.getItem('name');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const prods = await fetchProducts();
        setProducts(prods);
      } catch (err) {
        console.error('Fel vid hämtning av produkter:', err);
        setError('Kunde inte ladda produkter');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Är du säker på att du vill ta bort produkten?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      setError('Kunde inte ta bort produkten');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        const res = await api.post<Product>('/products', {
          ...currentProduct,
          imageUrl: currentProduct.imageUrl ?? '',
        });
        setProducts([...products, res.data]);
      } else if (formMode === 'edit' && currentProduct._id) {
        const { _id, ...productWithoutId } = currentProduct;
        const res = await api.put<Product>(`/products/${_id}`, productWithoutId);
        setProducts(products.map((p) => (p._id === currentProduct._id ? res.data : p)));
      }
      setFormMode(null);
      setCurrentProduct({});
    } catch (err) {
      console.error(err);
      setError('Kunde inte spara produkten');
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Välkommen, {adminName}</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <button
        className="mb-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        onClick={() => {
          setFormMode('add');
          setCurrentProduct({});
        }}
      >
        Lägg till produkt
      </button>

      {formMode && (
        <form onSubmit={handleSave} className="mb-6 space-y-4 rounded border p-4 shadow">
          <h2 className="text-xl font-semibold">
            {formMode === 'add' ? 'Lägg till produkt' : 'Redigera produkt'}
          </h2>
          <input
            type="text"
            placeholder="Titel"
            value={currentProduct.title || ''}
            onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
            className="w-full rounded border px-2 py-1"
            required
          />
          <input
            type="number"
            placeholder="Pris"
            value={currentProduct.price ?? ''}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })
            }
            className="w-full rounded border px-2 py-1"
            required
          />
          <textarea
            placeholder="Beskrivning"
            value={currentProduct.description || ''}
            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
            className="w-full rounded border px-2 py-1"
          />
          <input
            type="text"
            placeholder="Bild-URL"
            value={currentProduct.imageUrl || ''}
            onChange={(e) => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
            className="w-full rounded border px-2 py-1"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Spara
            </button>
            <button
              type="button"
              className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
              onClick={() => {
                setFormMode(null);
                setCurrentProduct({});
              }}
            >
              Avbryt
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Laddar produkter...</p>
      ) : (
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">Titel</th>
              <th className="border px-4 py-2">Pris</th>
              <th className="border px-4 py-2">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border px-4 py-2">{p.title}</td>
                <td className="border px-4 py-2">{p.price} kr</td>
                <td className="flex gap-2 border px-4 py-2">
                  <button
                    className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                    onClick={() => {
                      setFormMode('edit');
                      setCurrentProduct(p);
                    }}
                  >
                    Redigera
                  </button>
                  <button
                    className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                    onClick={() => handleDelete(p._id!)}
                  >
                    Ta bort
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
