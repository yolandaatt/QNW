import { useState } from 'react';
import { useUser } from '@/context/UserContext';

const MyPage = () => {
  const { name } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'orders'>('profile');

  return (
    <div className="mx-auto mt-10 max-w-3xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Mina sidor</h1>

      {/* Tabs */}
      <div className="mb-6 flex space-x-4 border-b pb-2">
        <button
          className={activeTab === 'profile' ? 'border-b-2 border-black font-semibold' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Mina uppgifter
        </button>
        <button
          className={activeTab === 'favorites' ? 'border-b-2 border-black font-semibold' : ''}
          onClick={() => setActiveTab('favorites')}
        >
          Favoriter
        </button>
        <button
          className={activeTab === 'orders' ? 'border-b-2 border-black font-semibold' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Ordrar
        </button>
      </div>

      {/* Content */}
      {activeTab === 'profile' && (
        <section>
          <h2 className="mb-2 text-xl font-semibold">Profil</h2>
          <p>
            <strong>Namn:</strong> {name}
          </p>
          {/* Placeholder för redigering */}
          <form className="mt-4 space-y-2">
            <input type="text" placeholder="Nytt namn" className="w-full rounded border p-2" />
            <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
              Spara
            </button>
          </form>
        </section>
      )}

      {activeTab === 'favorites' && (
        <section>
          <h2 className="mb-2 text-xl font-semibold">Favoritprodukter</h2>
          <p>Du har inga favoritprodukter än.</p>
        </section>
      )}

      {activeTab === 'orders' && (
        <section>
          <h2 className="mb-2 text-xl font-semibold">Orderhistorik</h2>
          <p>Du har inte lagt några beställningar än.</p>
        </section>
      )}
    </div>
  );
};

export default MyPage;
