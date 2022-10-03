import type { FC } from 'react';
import { initReactI18next } from 'react-i18next';
import { default as i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import usFlag from 'country-flag-icons/react/3x2/US';
import esFlag from 'country-flag-icons/react/3x2/ES';

import { resources } from './resources';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        keySeparator: false,
        fallbackLng: 'en',
        react: { useSuspense: true },
        interpolation: { escapeValue: false }
    });

export { i18n };

export type Language = keyof typeof resources;

export interface LanguageDetails {
    key: Language;
    displayName: string;
    icon: FC;
}

export const languages: Record<Language, LanguageDetails> = {
    en: { key: 'en', displayName: 'English', icon: usFlag },
    es: { key: 'es', displayName: 'Español', icon: esFlag }
};
