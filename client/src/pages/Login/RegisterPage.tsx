import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { AxiosError } from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/login');
    } catch (err: unknown) {
      if ((err as AxiosError<{ message: string }>).isAxiosError) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setError(axiosErr.response?.data?.message || 'Registrering misslyckades');
      } else {
        console.error('Okänt fel:', err);
        setError('Ett okänt fel inträffade');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-4 shadow">
      <h1 className="mb-4 text-xl font-bold">Skapa konto</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block">
            Namn
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded border px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded border px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block">
            Lösenord
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded border px-2 py-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1 block">
            Bekräfta lösenord
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded border px-2 py-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Registrerar...' : 'Registrera dig'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
