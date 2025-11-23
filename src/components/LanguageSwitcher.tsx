import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 p-1">
      <button
        onClick={() => changeLanguage('ko')}
        className={`px-3 py-1 text-sm ${
          i18n.language === 'ko'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => changeLanguage('ja')}
        className={`px-3 py-1 text-sm ${
          i18n.language === 'ja'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        日本語
      </button>
    </div>
  );
}
