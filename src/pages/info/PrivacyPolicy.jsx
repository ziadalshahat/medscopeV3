import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/InfoPages.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="info-page-wrapper">
      <div className="info-card">
        <button onClick={() => navigate(-1)} className="info-back-btn">
          <i className="fas fa-arrow-left"></i> {t("support.back")}
        </button>

        <div className="info-header">
          <h1 className="info-title">{t("privacy.title")}</h1>
          <p className="info-subtitle">{t("privacy.intro")}</p>
        </div>

        <div className="info-sections">
          <div className="info-section-block">
            <h3>
              <i className="fas fa-file-medical-alt" style={{ color: '#0081c7' }}></i>
              {t("privacy.collection_title")}
            </h3>
            <p>{t("privacy.collection_desc")}</p>
          </div>

          <div className="info-section-block">
            <h3>
              <i className="fas fa-shield-alt" style={{ color: '#10b981' }}></i>
              {t("privacy.security_title")}
            </h3>
            <p>{t("privacy.security_desc")}</p>
          </div>

          <div className="info-section-block">
            <h3>
              <i className="fas fa-user-shield" style={{ color: '#f59e0b' }}></i>
              {t("privacy.sharing_title")}
            </h3>
            <p>{t("privacy.sharing_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
