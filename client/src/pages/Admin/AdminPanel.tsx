import { useEffect, useState } from 'react';
import type { Product } from '@/types/Product';
import { fetchProducts } from '@/api/Products';
import api from '@/api/axios';

type FormMode = 'add' | 'edit' | null;
type AdminTab = 'products' | 'orders';

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: { name: string; email: string };
  items: OrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

const paymentLabels: Record<string, string> = {
  card: 'Kort',
  swish: 'Swish',
  invoice: 'Faktura',
};

const statusLabels: Record<string, string> = {
  pending: 'Bearbetas',
  confirmed: 'Bekräftad',
  shipped: 'Skickad',
  delivered: 'Levererad',
};

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const prods = await fetchProducts();
        setProducts(prods);
      } catch {
        setError('Kunde inte ladda produkter');
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (activeTab !== 'orders') return;
    const loadOrders = async () => {
      setOrdersLoading(true);
      try {
        const res = await api.get('/orders/all');
        setOrders(res.data);
      } catch {
        setError('Kunde inte ladda ordrar');
      } finally {
        setOrdersLoading(false);
      }
    };
    loadOrders();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    if (!confirm('Är du säker på att du vill ta bort produkten?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch {
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
        setSuccess('Produkten har lagts till!');
      } else if (formMode === 'edit' && currentProduct._id) {
        const { _id, ...productWithoutId } = currentProduct;
        const res = await api.put<Product>(`/products/${_id}`, productWithoutId);
        setProducts(products.map((p) => (p._id === currentProduct._id ? res.data : p)));
        setSuccess('Produkten har uppdaterats!');
      }
      setFormMode(null);
      setCurrentProduct({});
      setImagePreview(null);
    } catch {
      setError('Kunde inte spara produkten');
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
    } catch {
      setError('Kunde inte uppdatera status');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await api.post<{ imageUrl: string }>('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCurrentProduct((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
    } catch {
      setError('Kunde inte ladda upp bilden');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Rubrik */}
      <div className="mb-10">
        <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">Adminpanel</p>
      </div>

      {error && <p className="mb-6 text-xs uppercase tracking-widest text-red-600">{error}</p>}
      {success && (
        <p className="mb-6 text-xs uppercase tracking-widest text-green-600">✓ {success}</p>
      )}

      {/* Flikar */}
      <div className="mb-10 flex gap-8 border-b border-gray-200">
        {(['products', 'orders'] as AdminTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs uppercase tracking-widest transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-black text-black'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            {tab === 'products' ? 'Produkter' : 'Ordrar'}
          </button>
        ))}
      </div>

      {/* Produkter-fliken */}
      {activeTab === 'products' && (
        <div>
          <button
            onClick={() => {
              setFormMode('add');
              setCurrentProduct({});
              setImagePreview(null);
            }}
            className="mb-8 border border-black px-6 py-2 text-xs uppercase tracking-widest transition-all hover:bg-black hover:text-white"
          >
            + Lägg till produkt
          </button>

          {/* Formulär */}
          {formMode && (
            <div className="mb-10 border border-gray-200 p-6">
              <p className="mb-6 text-xs uppercase tracking-widest text-gray-400">
                {formMode === 'add' ? 'Ny produkt' : 'Redigera produkt'}
              </p>
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label htmlFor="title" className="mb-2 block text-xs uppercase tracking-widest">
                    Titel
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={currentProduct.title || ''}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, title: e.target.value })
                    }
                    required
                    className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="mb-2 block text-xs uppercase tracking-widest">
                    Pris (kr)
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={currentProduct.price ?? ''}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })
                    }
                    required
                    className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-xs uppercase tracking-widest"
                  >
                    Beskrivning
                  </label>
                  <textarea
                    id="description"
                    value={currentProduct.description || ''}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, description: e.target.value })
                    }
                    className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-xs uppercase tracking-widest"
                  >
                    Kategori
                  </label>
                  <input
                    id="category"
                    type="text"
                    value={currentProduct.category || ''}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, category: e.target.value })
                    }
                    className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                    placeholder="T.ex. Frukt, Grönsaker..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="image-upload"
                    className="mb-2 block text-xs uppercase tracking-widest"
                  >
                    Produktbild
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-gray-500 file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-widest file:text-white hover:file:bg-gray-800"
                  />
                  {(imagePreview || currentProduct.imageUrl) && (
                    <img
                      src={imagePreview ?? currentProduct.imageUrl}
                      alt="Förhandsgranskning"
                      className="mt-4 h-32 w-32 object-cover"
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="stock" className="mb-2 block text-xs uppercase tracking-widest">
                    Lagersaldo
                  </label>
                  <input
                    id="stock"
                    type="number"
                    value={currentProduct.stock ?? ''}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })
                    }
                    required
                    className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    className="bg-black px-6 py-2 text-xs uppercase tracking-widest text-white transition-all hover:bg-gray-800"
                  >
                    Spara
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormMode(null);
                      setCurrentProduct({});
                      setImagePreview(null);
                    }}
                    className="border border-gray-300 px-6 py-2 text-xs uppercase tracking-widest transition-all hover:border-black"
                  >
                    Avbryt
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Produkttabell */}
          {productsLoading ? (
            <p className="text-xs uppercase tracking-widest text-gray-400">Laddar produkter...</p>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-8 text-xs uppercase tracking-widest text-gray-400">
                    Titel
                  </th>
                  <th className="py-3 pr-8 text-xs uppercase tracking-widest text-gray-400">
                    Pris
                  </th>
                  <th className="py-3 pr-8 text-xs uppercase tracking-widest text-gray-400">
                    Kategori
                  </th>
                  <th className="py-3 pr-8 text-xs uppercase tracking-widest text-gray-400">
                    Lager
                  </th>
                  <th className="py-3 text-xs uppercase tracking-widest text-gray-400">Åtgärder</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-gray-100">
                    <td className="py-4 pr-8 text-sm">{p.title}</td>
                    <td className="py-4 pr-8 text-sm">{p.price} kr</td>
                    <td className="py-4 pr-8 text-sm text-gray-500">{p.category ?? '—'}</td>
                    <td className="py-4 pr-8 text-sm">
                      {p.stock === 0 ? (
                        <span className="text-red-500">Slutsåld</span>
                      ) : (
                        <span className={p.stock <= 5 ? 'text-orange-500' : ''}>{p.stock} st</span>
                      )}
                    </td>
                    <td className="flex gap-3 py-4">
                      <button
                        onClick={() => {
                          setFormMode('edit');
                          setCurrentProduct(p);
                          setImagePreview(null);
                        }}
                        className="text-xs uppercase tracking-widest underline transition-opacity hover:opacity-60"
                      >
                        Redigera
                      </button>
                      <button
                        onClick={() => handleDelete(p._id!)}
                        className="text-xs uppercase tracking-widest text-red-500 underline transition-opacity hover:opacity-60"
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
      )}

      {/* Ordrar-fliken */}
      {activeTab === 'orders' && (
        <div>
          {ordersLoading && (
            <p className="text-xs uppercase tracking-widest text-gray-400">Laddar ordrar...</p>
          )}

          {!ordersLoading && orders.length === 0 && (
            <p className="text-xs uppercase tracking-widest text-gray-400">Inga ordrar ännu.</p>
          )}

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border border-gray-200 p-6">
                {/* Orderhuvud */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{order.userId?.name}</p>
                    <p className="text-xs text-gray-400">{order.userId?.email}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('sv-SE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {/* Statusväljare */}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border border-gray-300 bg-transparent px-3 py-1 text-xs uppercase tracking-widest focus:border-black focus:outline-none"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Produkter */}
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toFixed(2)} kr</span>
                    </div>
                  ))}
                </div>

                {/* Leverans och totalt */}
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">
                      Leveransadress
                    </p>
                    <p className="text-sm">{order.deliveryAddress.street}</p>
                    <p className="text-sm">
                      {order.deliveryAddress.postalCode} {order.deliveryAddress.city}
                    </p>
                    <p className="text-sm">{order.deliveryAddress.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">
                      {paymentLabels[order.paymentMethod] ?? order.paymentMethod}
                    </p>
                    <p className="text-lg font-bold">{order.totalPrice.toFixed(2)} kr</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
