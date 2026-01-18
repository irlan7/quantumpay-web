import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import JSON sesuai isi folder locales
import en from './locales/en.json';
import id from './locales/id.json';
import de from './locales/de.json';
import ar from './locales/ar.json';
import ko from './locales/ko.json';
import nl from './locales/nl.json';
import pt from './locales/pt.json';

const resources = {
  en: { translation: en },
  id: { translation: id },
  de: { translation: de },
  ar: { translation: ar },
  ko: { translation: ko },
  nl: { translation: nl },
  pt: { translation: pt },
} as const;

// ⛔ penting: cek agar tidak init 2x (Next.js)
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',          // default
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false, // wajib utk pages router
      },
    });
}

export default i18n;
