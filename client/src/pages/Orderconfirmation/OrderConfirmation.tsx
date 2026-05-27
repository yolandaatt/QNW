import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      {/* Checkmark */}
      <div className="mb-8 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth={1.5}
          className="h-16 w-16"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <p className="mb-3 text-xs uppercase tracking-widest text-gray-400">{t('orderReceived')}</p>

      <h1 className="mb-6 text-2xl font-bold uppercase tracking-wide">{t('thankYou')}</h1>

      <p className="mb-12 text-sm leading-relaxed text-gray-500">{t('orderConfirmationText')}</p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate('/mypage')}
          className="w-full bg-black py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-gray-800"
        >
          {t('viewOrders')}
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full border border-gray-300 py-3 text-xs uppercase tracking-widest transition-all hover:border-black"
        >
          {t('continueShopping')}
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
