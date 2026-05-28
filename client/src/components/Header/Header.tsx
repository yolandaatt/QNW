import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { isLoggedIn, isAdmin, logout } = useUser();
  const { items } = useCart();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-gray-200 bg-white">
      {/* Topbar */}
      <div className="bg-black py-2 text-center text-xs tracking-widest text-white">
        {t('topBar')}
      </div>

      {/* Huvudnavigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logotyp */}
        <Link
          to="/"
          className="text-2xl font-bold uppercase tracking-widest text-black"
          onClick={() => setMenuOpen(false)}
        >
          Lumière
        </Link>

        {/* Desktop nav — dold på mobil */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-60"
          >
            {t('home')}
          </Link>
          <Link
            to="/products"
            className="text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-60"
          >
            {t('products')}
          </Link>
          {isLoggedIn && isAdmin && (
            <Link
              to="/admin"
              className="text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-60"
            >
              {t('adminPanel')}
            </Link>
          )}
        </nav>

        {/* Höger sida desktop — dold på mobil */}
        <div className="hidden items-center gap-6 md:flex">
          {isLoggedIn ? (
            <>
              {!isAdmin && (
                <Link
                  to="/mypage"
                  className="text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-60"
                >
                  {t('myPage')}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-60"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-60"
            >
              {t('login')}
            </Link>
          )}

          <Link to="/cart" className="relative transition-opacity hover:opacity-60">
            <span className="text-xs uppercase tracking-widest text-black">{t('cart')}</span>
            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleLanguage}
            className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
          >
            {i18n.language === 'sv' ? 'EN' : 'SV'}
          </button>
        </div>

        {/* Mobil höger sida — varukorg + hamburgare */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative transition-opacity hover:opacity-60">
            <span className="text-xs uppercase tracking-widest text-black">{t('cart')}</span>
            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger-knapp */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Öppna meny"
            className="flex flex-col gap-1.5"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobil meny — visas när menuOpen är true */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
            >
              {t('home')}
            </Link>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
            >
              {t('products')}
            </Link>
            {isLoggedIn && isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
              >
                {t('adminPanel')}
              </Link>
            )}
            {isLoggedIn ? (
              <>
                {!isAdmin && (
                  <Link
                    to="/mypage"
                    onClick={() => setMenuOpen(false)}
                    className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                  >
                    {t('myPage')}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-left text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
              >
                {t('login')}
              </Link>
            )}
            <button
              onClick={toggleLanguage}
              className="text-left text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
            >
              {i18n.language === 'sv' ? 'EN' : 'SV'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
