import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from 'next-themes';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
  { code: 'de', label: 'DE' },
  { code: 'nl', label: 'NL' },
  { code: 'ar', label: 'AR' },
  { code: 'ko', label: 'KO' },
  { code: 'pt', label: 'PT' },
];

const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/" className="logo">
          QuantumPay
        </Link>
      </div>

      <div className="navbar-right">
        {/* Language Switcher */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="navbar-select"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>

        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
