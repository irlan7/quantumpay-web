import React, { createContext, useContext, useState, ReactNode } from "react";

import en from "../../locales/en.json";
import id from "../../locales/id.json";
import de from "../../locales/de.json";
import nl from "../../locales/nl.json";
import ar from "../../locales/ar.json";
import ko from "../../locales/ko.json";
import pt from "../../locales/pt.json";

export type LanguageCode = "en" | "id" | "de" | "nl" | "ar" | "ko" | "pt";

type Translations = Record<string, string>;

const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en,
  id,
  de,
  nl,
  ar,
  ko,
  pt,
};

interface LanguageContextType {
  language: LanguageCode;
  t: (key: string) => string;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
