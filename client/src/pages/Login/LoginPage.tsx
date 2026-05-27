import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import api from '@/api/axios';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const { t } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.name, res.data.token, res.data.role === 'admin');
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/mypage');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || t('error'));
      } else {
        setError(t('unknownError'));
      }
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-sm uppercase tracking-widest">{t('loginTitle')}</h1>
        <p className="mb-10 text-center text-xs uppercase tracking-widest text-gray-400">
          {t('welcomeBack')}
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest">
              {t('email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-gray-300 bg-transparent py-2 text-sm autofill:shadow-[inset_0_0_0px_1000px_white] autofill:[-webkit-text-fill-color:black] focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs uppercase tracking-widest">
              {t('password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-gray-300 bg-transparent py-2 text-sm autofill:shadow-[inset_0_0_0px_1000px_white] autofill:[-webkit-text-fill-color:black] focus:border-black focus:outline-none"
            />
          </div>

          {error && <p className="text-xs uppercase tracking-widest text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-gray-800"
          >
            {t('loginButton')}
          </button>

          <div className="text-center">
            <Link
              to="/register"
              className="text-xs uppercase tracking-widest underline transition-opacity hover:opacity-60"
            >
              {t('createAccount')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
