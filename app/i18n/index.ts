import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';

let clientI18n: typeof i18n | null = null;

export function createI18nInstance(lang: 'en' | 'ru' = 'en') {
  if (clientI18n) {
    clientI18n.changeLanguage(lang);
    return clientI18n;
  }

  clientI18n = i18n.createInstance();
  clientI18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: lang,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

  return clientI18n;
}

export function getClientI18n() {
  if (!clientI18n) {
    return createI18nInstance();
  }
  return clientI18n;
}

const instance = getClientI18n();
export default instance;
