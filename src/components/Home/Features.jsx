import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faClock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Home/Home.css';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  return (
    <div id="about" className="home-section">
      <div style={{ marginBottom: '20px' }}>
        <span className="home-badge-blue">
          {t("features.badge")}
        </span>
      </div>
      <h2 className="home-section-title">
        {t("features.title").split(" ").slice(0, 2).join(" ")}
        <br />
        {t("features.title").split(" ").slice(2).join(" ")}
      </h2>
      <p className="home-section-subtitle">
        {t("features.subtitle")}
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faStethoscope} />
          </div>
          <h3>{t("features.expert_care")}</h3>
          <p>{t("features.expert_care_desc")}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <h3>{t("features.availability")}</h3>
          <p>{t("features.availability_desc")}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <h3>{t("features.secure_platform")}</h3>
          <p>{t("features.secure_platform_desc")}</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
