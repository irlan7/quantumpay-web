'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES, LanguageKey } from '../constants/language';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as LanguageKey)}
    >
      {Object.entries(LANGUAGES).map(([key, value]) => (
        <option key={key} value={key}>
          {value.label}
        </option>
      ))}
    </select>
  );
}
