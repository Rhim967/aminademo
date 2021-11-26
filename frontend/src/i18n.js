import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import translationEN from './langs/en/translationEN.json'
import translationRU from './langs/ru/translationRU.json'

// the translation
const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    }
};

i18n
    .use(initReactI18next) //passes i18n down to react-i18next
    .init({
        resources,
        lng: 'ru',

        keySeparator: false, // we don't use keys in form message.welcome // might be i'm using that

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });
export default i18n
