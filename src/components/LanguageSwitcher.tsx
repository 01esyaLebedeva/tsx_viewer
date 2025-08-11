import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => changeLanguage('en')} className="hover:text-blue-400 transition">
        EN
      </button>
      |
      <button onClick={() => changeLanguage('ru')} className="hover:text-blue-400 transition">
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;