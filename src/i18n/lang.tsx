import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ne';

// Minimal EN/NE dictionary for chrome (nav/footer/CTA). Page bodies stay in
// English until Nepali copy is provided; toggle persists via localStorage.
const STRINGS: Record<string, { en: string; ne: string }> = {
  Home: { en: 'Home', ne: 'गृहपृष्ठ' },
  About: { en: 'About', ne: 'हाम्रो बारेमा' },
  Academics: { en: 'Academics', ne: 'शैक्षिक' },
  Admissions: { en: 'Admissions', ne: 'भर्ना' },
  'School Life': { en: 'School Life', ne: 'विद्यालय जीवन' },
  Contact: { en: 'Contact', ne: 'सम्पर्क' },
  'Apply for Admission': { en: 'Apply for Admission', ne: 'भर्नाका लागि आवेदन' },
  Enquire: { en: 'Enquire', ne: 'सोधपुछ' },
  Explore: { en: 'Explore', ne: 'अन्वेषण' },
  School: { en: 'School', ne: 'विद्यालय' },
  'Find us': { en: 'Find us', ne: 'हामीलाई भेट्नुहोस्' },
  'Follow Us': { en: 'Follow Us', ne: 'फलो गर्नुहोस्' },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('surachana:lang') as Lang) === 'ne' ? 'ne' : 'en';
    } catch {
      return 'en';
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('surachana:lang', lang);
    } catch { /* ignore */ }
    document.documentElement.lang = lang === 'ne' ? 'ne' : 'en';
  }, [lang]);
  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => STRINGS[key]?.[lang] ?? key;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
