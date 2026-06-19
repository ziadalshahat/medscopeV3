import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/InfoPages.css';

const TermsConditions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="info-page-wrapper">
      <div className="info-card">
        <button onClick={() => navigate(-1)} className="info-back-btn">
          <i className="fas fa-arrow-left"></i> {t("support.back")}
        </button>

        <div className="info-header">
          <h1 className="info-title">{t("terms.title")}</h1>
          <p className="info-subtitle">{t("terms.intro")}</p>
        </div>

        <div className="info-sections">
          <div className="info-section-block">
            <h3>
              <i className="fas fa-user-cog" style={{ color: '#0081c7' }}></i>
              {t("terms.account_title")}
            </h3>
            <p>{t("terms.account_desc")}</p>
          </div>

          <div className="info-section-block">
            <h3>
              <i className="fas fa-calendar-check" style={{ color: '#10b981' }}></i>
              {t("terms.booking_title")}
            </h3>
            <p>{t("terms.booking_desc")}</p>
          </div>

          <div className="info-section-block">
            <h3>
              <i className="fas fa-user-md" style={{ color: '#f59e0b' }}></i>
              {t("terms.liability_title")}
            </h3>
            <p>{t("terms.liability_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
