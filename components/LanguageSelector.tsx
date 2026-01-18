import { useEffect, useState } from 'react';
import i18n from 'i18next';

type Lang = {
  code: string;
  label: string;
};

const LANGUAGES: Lang[] = [
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
  { code: 'de', label: 'DE' },
  { code: 'ar', label: 'AR' },
  { code: 'ko', label: 'KO' },
  { code: 'nl', label: 'NL' },
  { code: 'pt', label: 'PT' },
];

export default function LanguageSelector() {
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const onChange = (lng: string) => setLang(lng);
    i18n.on('languageChanged', onChange);
    return () => {
      i18n.off('languageChanged', onChange);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    i18n.changeLanguage(value);
    setLang(value);
  };

  return (
    <select
      value={lang}
      onChange={handleChange}
      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:bg-gray-800 dark:text-white"
    >
      {LANGUAGES.map(l => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
