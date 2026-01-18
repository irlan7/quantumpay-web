export type LanguageKey = 'en' | 'id';

export interface TranslationMap {
  [key: string]: {
    en: string;
    id: string;
  };
}
