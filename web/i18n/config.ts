// Import Dependencies
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector/cjs";

// Local Imports
import { type LocaleCode, supportedLanguages } from "./langs";

// ----------------------------------------------------------------------

export const defaultLang: LocaleCode = "en";
export const fallbackLang: LocaleCode = "en";

// Get initial language safely for SSR
const getInitialLanguage = (): LocaleCode => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedLang = localStorage.getItem("i18nextLng") as LocaleCode;
    if (storedLang && supportedLanguages.includes(storedLang)) {
      return storedLang;
    }
  }
  return defaultLang;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
    },
    fallbackLng: fallbackLang,
    lng: getInitialLanguage(),
    supportedLngs: supportedLanguages,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
    lowerCaseLng: true,
    debug: false,
  });

i18n.languages = supportedLanguages;

export default i18n;
