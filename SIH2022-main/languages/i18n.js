import i18next from 'i18next'
import english from './english.json'
import hindi from './hindi.json'
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: english,
        hi: hindi,
    },
    react: {
        useSuspense: false,
    }
});

export default i18next;