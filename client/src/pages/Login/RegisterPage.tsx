import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/api/axios';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/login');
    } catch (err: unknown) {
      if ((err as AxiosError<{ message: string }>).isAxiosError) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setError(axiosErr.response?.data?.message || t('error'));
      } else {
        setError(t('unknownError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-sm uppercase tracking-widest">{t('registerTitle')}</h1>
        <p className="mb-10 text-center text-xs uppercase tracking-widest text-gray-400">
          {t('welcomeToShop')}
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest">
              {t('name')}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border-b border-gray-300 bg-transparent py-2 text-sm autofill:shadow-[inset_0_0_0px_1000px_white] autofill:[-webkit-text-fill-color:black] focus:border-black focus:outline-none"
            />
          </div>

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

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs uppercase tracking-widest"
            >
              {t('confirmPassword')}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border-b border-gray-300 bg-transparent py-2 text-sm autofill:shadow-[inset_0_0_0px_1000px_white] autofill:[-webkit-text-fill-color:black] focus:border-black focus:outline-none"
            />
          </div>

          {error && <p className="text-xs uppercase tracking-widest text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? t('loading') : t('registerButton')}
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-xs uppercase tracking-widest underline transition-opacity hover:opacity-60"
            >
              {t('alreadyHaveAccount')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
