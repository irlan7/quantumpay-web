'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

/* =========================
   Types
   ========================= */

export type Language =
  | 'en'
  | 'id'
  | 'de'
  | 'nl'
  | 'ar'
  | 'ko'
  | 'pt';

type Translations = {
  [key: string]: string | Translations;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

/* =========================
   Translation Data
   (simple & stable)
   ========================= */

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      technology: 'Technology',
      security: 'Security',
      roadmap: 'Roadmap',
      crisisMode: 'Crisis Mode',
    },
  },
  id: {
    nav: {
      home: 'Beranda',
      technology: 'Teknologi',
      security: 'Keamanan',
      roadmap: 'Peta Jalan',
      crisisMode: 'Mode Krisis',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      technology: 'Technologie',
      security: 'Sicherheit',
      roadmap: 'Fahrplan',
      crisisMode: 'Krisenmodus',
    },
  },
  nl: {
    nav: {
      home: 'Start',
      technology: 'Technologie',
      security: 'Beveiliging',
      roadmap: 'Routekaart',
      crisisMode: 'Crisismodus',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      technology: 'التقنية',
      security: 'الأمن',
      roadmap: 'خارطة الطريق',
      crisisMode: 'وضع الطوارئ',
    },
  },
  ko: {
    nav: {
      home: '홈',
      technology: '기술',
      security: '보안',
      roadmap: '로드맵',
      crisisMode: '위기 모드',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      technology: 'Tecnologia',
      security: 'Segurança',
      roadmap: 'Roteiro',
      crisisMode: 'Modo de Crise',
    },
  },
};

/* =========================
   Context
   ========================= */

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/* =========================
   Provider
   ========================= */

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quantumpay_language') as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('quantumpay_language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (!value || typeof value !== 'object') return key;
      value = value[k];
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* =========================
   Hook
   ========================= */

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
