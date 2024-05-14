import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import EnglishLocale from './assets/locales/en.json';
import JapaneseLocale from './assets/locales/jp.json';

const resources = {
    en:{translation:EnglishLocale},
    jp:{translation:JapaneseLocale}
}

i18next.use(initReactI18next)
       .init({
        resources,
        lng:"en" //default fallback language 
       });
export default i18next;
