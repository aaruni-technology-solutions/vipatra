import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('appTitle')}</h1>
      <p>{t('dashboard.adminSubtitle')}</p>
      <button>{t('actions.sendReminder')}</button>
      <p>{t('time.hoursAgo', { count: 5 })}</p> {/* Example with interpolation */}
    </div>
  );
}