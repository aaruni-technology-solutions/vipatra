// src/App.jsx
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation(); // 'translation' is the default namespace

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentDate = new Date();
  const exampleAmount = 12345.67;
  const itemCount = 5;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <button
          onClick={() => changeLanguage('en')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage('hi')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          हिन्दी (Hindi)
        </button>
        <button
          onClick={() => changeLanguage('kn')}
          className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
        >
          ಕನ್ನಡ (Kannada)
        </button>
      </div>

      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        {t('welcomeMessage')}
      </h1>
      <p className="text-xl text-gray-700 mb-2">
        {t('greeting', { name: 'User' })}
      </p>
      <p className="text-lg text-gray-600 mb-2">
        {t('invoice')}: #123
      </p>
      <p className="text-lg text-gray-600 mb-2">
        {t('invoiceDate', { date: currentDate })}
      </p>
      <p className="text-lg font-semibold text-gray-800 mb-2">
        {t('totalAmount', { amount: exampleAmount })}
      </p>
      <p className="text-lg text-gray-600">
        {t('item', { count: itemCount })} {/* Using default pluralization key ending _other */}
      </p>

      {/* Example of different plural forms if needed explicitly, though default _one/_other works */}
      {/* <p>{t(itemCount === 1 ? 'item_one' : 'item_other', { count: itemCount })}</p> */}

    </div>
  );
}

export default App;