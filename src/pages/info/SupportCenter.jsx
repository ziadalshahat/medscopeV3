import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/InfoPages.css';

const SupportCenter = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      // Auto-hide alert after 5s
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="info-page-wrapper">
      <div className="info-card">
        <button onClick={() => navigate('/')} className="info-back-btn">
          <i className="fas fa-arrow-left"></i> {t("support.back_to_login")}
        </button>

        <div className="info-header">
          <h1 className="info-title">{t("support.title")}</h1>
          <p className="info-subtitle">{t("support.intro")}</p>
        </div>

        <div className="support-layout">
          {/* Form */}
          <div className="support-form-container">
            <h3>{t("support.form_title")}</h3>
            
            {submitted && (
              <div className="support-success-alert mb-4">
                <i className="fas fa-check-circle mr-2"></i>
                {t("support.success")}
              </div>
            )}

            <form onSubmit={handleSubmit} className="support-form">
              <div className="support-field">
                <label>{t("support.name")}</label>
                <input 
                  type="text" 
                  className="support-input"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="support-field">
                <label>{t("support.email")}</label>
                <input 
                  type="email" 
                  className="support-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="support-field">
                <label>{t("support.subject")}</label>
                <input 
                  type="text" 
                  className="support-input"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="support-field">
                <label>{t("support.message")}</label>
                <textarea 
                  className="support-input"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="support-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    {t("support.send")}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="support-info-container">
            <h3>{t("support.info_title")}</h3>
            
            <div className="support-info-list">
              <div className="support-info-item">
                <div className="support-info-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="support-info-text">
                  <h4>{t("support.phone")}</h4>
                  <a href="tel:01003252891">01003252891</a>
                </div>
              </div>

              <div className="support-info-item">
                <div className="support-info-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  <i className="fas fa-ambulance"></i>
                </div>
                <div className="support-info-text">
                  <h4>{t("support.emergency")}</h4>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>123</span>
                </div>
              </div>

              <div className="support-info-item">
                <div className="support-info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="support-info-text">
                  <h4>{t("footer_info.email")}</h4>
                  <a href="mailto:info@medscope.com">info@medscope.com</a>
                </div>
              </div>

              <div className="support-info-item">
                <div className="support-info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="support-info-text">
                  <h4>{t("support.hours")}</h4>
                  <p>{t("support.hours_desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
