import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('securepassword');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Något gick fel. Försök igen');
      } else {
        console.error('Okänt fel:', err);
        setError('Ett okänt fel inträffade');
      }
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-4 shadow">
      <h1 className="mb-4 text-xl font-bold">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
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
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Logga in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
