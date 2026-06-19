import React from 'react';
import '../../styles/Home/Home.css';
import heroBg from '../../assets/images/home/hero-bg.jpg';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div 
      id="home"
      className="hero-section" 
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>
          {t("hero.title")}
          <span>{t("hero.subtitle")}</span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
