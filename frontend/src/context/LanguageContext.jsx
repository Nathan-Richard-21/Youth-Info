import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONTENT as englishContent } from '../constants/content.en';
import { translations as xhosaContent } from '../constants/translations.xh';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  // Get the content based on current language
  const content = language === 'en' ? englishContent : xhosaContent;

  // Toggle between English and isiXhosa
  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'xh' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    content,
    toggleLanguage,
    isEnglish: language === 'en',
    isXhosa: language === 'xh'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
