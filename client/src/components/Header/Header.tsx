import { useUser } from '@/context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { isLoggedIn, isAdmin, logout } = useUser();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // Räknar totalt antal produkter i varukorgen
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-gray-200 bg-white">
      {/* Topbar — smal informationsrad */}
      <div className="bg-black py-2 text-center text-xs tracking-widest text-white">
        {t('topBar')}
      </div>

      {/* Huvudnavigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logotyp */}
        <Link to="/" className="text-2xl font-bold uppercase tracking-widest text-black">
          Lumière
        </Link>

        {/* Navigeringslänkar */}
        <nav className="flex items-center gap-8">
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

        {/* Höger sida — ikoner */}
        <div className="flex items-center gap-6">
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
      </div>
    </header>
  );
};

export default Header;
