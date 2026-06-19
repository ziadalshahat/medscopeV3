import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/InfoPages.css';

const FAQs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    { q: t("faqs.q1"), a: t("faqs.a1") },
    { q: t("faqs.q2"), a: t("faqs.a2") },
    { q: t("faqs.q3"), a: t("faqs.a3") },
    { q: t("faqs.q4"), a: t("faqs.a4") }
  ];

  return (
    <div className="info-page-wrapper">
      <div className="info-card">
        <button onClick={() => navigate('/')} className="info-back-btn">
          <i className="fas fa-arrow-left"></i> {t("support.back_to_login")}
        </button>

        <div className="info-header">
          <h1 className="info-title">{t("faqs.title")}</h1>
          <p className="info-subtitle">{t("faqs.intro")}</p>
        </div>

        <div className="faq-accordion">
          {faqItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item ${isActive ? 'active' : ''}`}
              >
                <button 
                  className="faq-question" 
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.q}</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
