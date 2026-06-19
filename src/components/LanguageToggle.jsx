import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = ({ style, className }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language && i18n.language.startsWith("ar") ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  const currentLang = i18n.language || "en";

  return (
    <button 
      onClick={toggleLanguage} 
      className={`language-toggle-btn ${className || ""}`}
      aria-label="Toggle Language" 
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        marginRight: '10px',
        gap: '6px',
        transition: 'opacity 0.2s',
        ...style
      }}
    >
      <i className="fas fa-globe" style={{ fontSize: '1.1rem' }}></i>
      <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
        {currentLang.startsWith("ar") ? "EN" : "العربية"}
      </span>
    </button>
  );
};

export default LanguageToggle;
