import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko';
import ja from './locales/ja';

// 브라우저에서 저장된 언어 또는 기본값 (한국어)
const savedLanguage = localStorage.getItem('language') || 'ko';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko,
      ja,
    },
    lng: savedLanguage,
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
