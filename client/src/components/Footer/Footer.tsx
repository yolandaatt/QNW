import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-6 text-xl font-bold uppercase tracking-widest">Lumière</h3>
            <p className="text-xs leading-relaxed tracking-wide text-gray-400">
              {t('footerTagline')}
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs uppercase tracking-widest text-gray-400">
              {t('navigation')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                >
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/mypage"
                  className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                >
                  {t('myPage')}
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                >
                  {t('cart')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs uppercase tracking-widest text-gray-400">
              {t('customerService')}
            </h4>
            <ul className="space-y-3">
              <li className="text-xs uppercase tracking-widest text-gray-400">
                {t('freeShippingOver')}
              </li>
              <li className="text-xs uppercase tracking-widest text-gray-400">
                {t('openPurchase')}
              </li>
              <li className="text-xs uppercase tracking-widest text-gray-400">
                {t('securePayment')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
