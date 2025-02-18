import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { I18N_NAME_SPACE, KEEPERWALLET_DEBUG } from './appConfig';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: KEEPERWALLET_DEBUG,
    lng: 'en',
    fallbackLng: 'en',
    ns: [I18N_NAME_SPACE],
    defaultNS: I18N_NAME_SPACE,
    backend: {
      loadPath: '/_locales/{{lng}}/{{ns}}.{{lng}}.json',
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export const LANGS = [
  {
    id: 'en',
    name: 'English',
  },
  {
    id: 'ru',
    name: 'Русский',
  },
  {
    id: 'tr',
    name: 'Türkçe',
  },
  {
    id: 'pt',
    name: 'Portugal',
  },
];

export default i18n;
