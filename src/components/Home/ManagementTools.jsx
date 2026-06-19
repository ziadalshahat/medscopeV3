import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faTint, faCalendarCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Home/Home.css';
import managementImg from '../../assets/images/home/management-tools.jpg';
import { useTranslation } from 'react-i18next';

const ManagementTools = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to the main login page
  };

  return (
    <div className="home-section management-tools-section">
      <div style={{ marginBottom: '20px' }}>
        <span className="platform-services-badge">
          {t("tools.badge")}
        </span>
      </div>
      <h2 className="home-section-title">
        {t("tools.title")}
      </h2>
      <div className="title-divider"></div>
      <p className="home-section-subtitle">
        {t("tools.subtitle")}
      </p>

      {/* Main Tool Card */}
      <div className="main-tool-card">
        <img 
          src={managementImg} 
          alt="Doctors examining holographic lungs" 
          className="main-tool-img"
        />
        <div className="main-tool-overlay">
          <div className="main-tool-header">
            <div className="main-tool-calendar-box">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <span className="most-popular-badge">{t("tools.most_popular")}</span>
          </div>

          <div className="main-tool-content">
            <h2>{t("tools.booking")}</h2>
            
            <div className="main-tool-features">
              <span className="feature-item">
                <i className="fas fa-clock feature-icon-red"></i> {t("tools.instant_booking")}
              </span>
              <span className="feature-item">
                <i className="fas fa-bell feature-icon-red"></i> {t("tools.reminders")}
              </span>
            </div>
          </div>

          <div className="main-tool-footer">
            <button className="login-btn-wide" onClick={handleLoginRedirect}>
              {t("tools.login_to_book")}
            </button>
          </div>
        </div>
      </div>

      {/* Sub Tools Grid */}
      <div className="sub-tools-grid">
        {/* Beds */}
        <div className="sub-tool-card">
          <div className="sub-tool-icon">
            <FontAwesomeIcon icon={faBed} />
          </div>
          <h3>{t("tools.beds")}</h3>
          <div className="sub-tool-features">
            <span><FontAwesomeIcon icon={faCheckCircle} /> {t("tools.live_status")}</span>
            <span><FontAwesomeIcon icon={faCheckCircle} /> {t("tools.all_departments")}</span>
          </div>
          <button className="login-btn-small" onClick={handleLoginRedirect}>
            {t("tools.login_to_view")}
          </button>
        </div>

        {/* Blood Bank */}
        <div className="sub-tool-card">
          <div className="sub-tool-icon">
            <FontAwesomeIcon icon={faTint} />
          </div>
          <h3>{t("tools.blood_bank")}</h3>
          <div className="sub-tool-features">
            <span><FontAwesomeIcon icon={faCheckCircle} /> {t("tools.available_quantities")}</span>
          </div>
          <button className="login-btn-small" onClick={handleLoginRedirect}>
            {t("tools.login_to_view_blood")}
          </button>
        </div>

        {/* My Appointments */}
        <div className="sub-tool-card">
          <div className="sub-tool-icon">
            <FontAwesomeIcon icon={faCalendarCheck} />
          </div>
          <h3>{t("tools.my_appointments")}</h3>
          <div className="sub-tool-features">
            <span><FontAwesomeIcon icon={faCheckCircle} /> {t("tools.history")}</span>
            <span><FontAwesomeIcon icon={faCheckCircle} /> {t("tools.upcoming")}</span>
          </div>
          <button className="login-btn-small" onClick={handleLoginRedirect}>
            {t("tools.login_to_manage")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementTools;
