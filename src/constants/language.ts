export type LanguageKey =
  | 'en'
  | 'id'
  | 'de'
  | 'nl'
  | 'ar'
  | 'ko'
  | 'pt';

export const LANGUAGES: Record<
  LanguageKey,
  { label: string; title: string; welcome: string; dir?: 'ltr' | 'rtl' }
> = {
  en: { label: 'English', title: 'Title', welcome: 'Welcome' },
  id: { label: 'Indonesia', title: 'Judul', welcome: 'Selamat datang' },
  de: { label: 'Deutsch', title: 'Titel', welcome: 'Willkommen' },
  nl: { label: 'Nederlands', title: 'Titel', welcome: 'Welkom' },
  ar: { label: 'العربية', title: 'العنوان', welcome: 'مرحبا', dir: 'rtl' },
  ko: { label: '한국어', title: '제목', welcome: '환영합니다' },
  pt: { label: 'Português', title: 'Título', welcome: 'Bem-vindo' }
};
