import { useEffect, useState } from 'react';
import api from '@/api/axios';
import { type AxiosResponse, AxiosError } from 'axios';

const AdminPanel = () => {
  const [adminEmail, setAdminEmail] = useState<string>('');

  useEffect(() => {
    api
      .get<string>('/admin')
      .then((res: AxiosResponse<string>) => {
        setAdminEmail(res.data);
      })
      .catch((err: AxiosError) => {
        console.error('Något gick fel. Försök igen.', err);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-2 text-2xl font-bold">Adminpanel</h1>
      <p className="mb-4">Inloggad som: {adminEmail}</p>
      {/* Här lägger vi senare till formulär + lista */}
      <p>Här kan du lägga till, redigera och ta bort produkter.</p>
    </div>
  );
};

export default AdminPanel;
