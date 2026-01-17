'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
    >
      <option value="en">English</option>
      <option value="id">Indonesia</option>
      <option value="de">Deutsch</option>
      <option value="nl">Nederlands</option>
      <option value="ar">العربية</option>
      <option value="ko">한국어</option>
      <option value="pt">Português</option>
    </select>
  );
}
