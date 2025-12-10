import { useUser } from '@/context/UserContext';

const MyPage = () => {
  const { name } = useUser();

  return (
    <div className="mx-auto mt-10 max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Mina sidor</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Profil</h2>
        <p>
          <strong>Namn:</strong> {name}
        </p>
        {/* Lägg till redigeringsformulär senare */}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Favoritprodukter</h2>
        <p>Du har inga favoritprodukter än.</p>
        {/* Här kommer listan på favoriter */}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Orderhistorik</h2>
        <p>Du har inte lagt några beställningar än.</p>
      </section>
    </div>
  );
};

export default MyPage;
