import React from 'react';
import '../../styles/Home/Home.css';
import partner1Img from '../../assets/images/home/partner-1.jpg';
import { useTranslation } from 'react-i18next';

const Partners = () => {
  const { t } = useTranslation();

  return (
    <div id="hospitals" className="home-section partners-section">
      <div style={{ marginBottom: '20px' }}>
        <span className="home-badge-white">
          {t("partners.badge")}
        </span>
      </div>
      <h2 className="home-section-title">{t("partners.title")}</h2>
      <p className="home-section-subtitle">
        {t("partners.subtitle")}
      </p>

      <div className="partners-grid">
        <div className="partner-card">
          <img 
            src={partner1Img} 
            alt={t("partners.city_hospital")} 
            className="partner-img"
          />
          <div className="partner-overlay">
            <h3>{t("partners.city_hospital")}</h3>
            <p>123 Healthcare Ave, NY</p>
          </div>
        </div>

        <div className="partner-card">
          <img 
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop" 
            alt={t("partners.metro_hospital")} 
            className="partner-img"
          />
          <div className="partner-overlay">
            <h3>{t("partners.metro_hospital")}</h3>
            <p>456 Wellness Blvd, CA</p>
          </div>
        </div>
      </div>

      <button className="view-all-btn">
        {t("partners.view_all")}
      </button>
    </div>
  );
};

export default Partners;
