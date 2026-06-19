import React, { useEffect, useState } from 'react';
import '../../styles/Home/Home.css';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../api/axiosInstance';

const Partners = () => {
  const { t } = useTranslation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeHospitals = async () => {
      try {
        const res = await axiosInstance.get('/hospitals/home');
        setHospitals(res.data || []);
      } catch (err) {
        console.error('Failed to load home page hospitals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeHospitals();
  }, []);

  const getHospitalImage = (img) => {
    if (!img) {
      return "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800";
    }
    if (img.startsWith('http://') || img.startsWith('https://')) {
      return img;
    }
    const baseHost = 'https://med-scope1.runasp.net';
    const cleanImg = img.startsWith('/') ? img : `/${img}`;
    return `${baseHost}${cleanImg}`;
  };

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

      {loading ? (
        <div style={{ textAlign: 'center', color: '#fff', padding: '2rem' }}>
          {t("admin.loading", "Loading...")}
        </div>
      ) : (
        <div className="partners-grid">
          {hospitals.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#fff' }}>
              {t("admin.no_hospitals_found", "No hospitals found")}
            </p>
          ) : (
            hospitals.map((hospital) => (
              <div className="partner-card" key={hospital.id}>
                <img 
                  src={getHospitalImage(hospital.imageUrl)} 
                  alt={hospital.name} 
                  className="partner-img"
                />
                <div className="partner-overlay">
                  <h3>{t("hospitals." + hospital.name.toLowerCase().replace(/\s+/g, '_').replace(/al_/g, '').replace(/el_/g, '').trim(), hospital.name)}</h3>
                  <p>{hospital.location || 'N/A'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <button className="view-all-btn">
        {t("partners.view_all")}
      </button>
    </div>
  );
};

export default Partners;
