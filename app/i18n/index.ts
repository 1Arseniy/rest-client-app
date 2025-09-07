import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

let initialized = false;

export async function initI18n(lang: "en" | "ru") {
  if (initialized) {
    if (i18n.language !== lang) {
      await i18n.changeLanguage(lang);
    }
    return i18n;
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ru: { translation: ru },
      },
      lng: lang,
      fallbackLng: "en",
      supportedLngs: ["en", "ru"],
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });

  initialized = true;
  return i18n;
}

export default i18n;