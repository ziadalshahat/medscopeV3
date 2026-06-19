import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MultiHospitalCard from '../components/MultiHospitalCard';
import Loader from '../../components/Loader';
import { getMultiHospitals } from '../services/multiHospitalService';
import '../styles/MultiHospital.css';


const MultiHospital = () => {
    const { t } = useTranslation();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMultiHospitals();
            setHospitals(data);
        } catch (err) {
            console.error('Failed to load hospitals:', err);
            setError(t('patient.bedDataError'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="mh-loading-state">
                <Loader message={t('patient.loadingBeds')} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mh-error-state">
                <div className="mh-error-icon">⚠️</div>
                <h3>{t('patient.somethingWentWrong')}</h3>
                <p>{error}</p>
                <button className="mh-retry-btn" onClick={fetchData}>{t('patient.tryAgain')}</button>
            </div>
        );
    }

    if (hospitals.length === 0) {
        return (
            <div className="mh-empty-state">
                <div className="mh-empty-icon">🏥</div>
                <h3>{t('patient.noHospitalData')}</h3>
                <p>{t('patient.noHospitalDataDesc')}</p>
                <button className="mh-retry-btn" onClick={fetchData}>{t('patient.checkAgain')}</button>
            </div>
        );
    }

    return (
        <>

        <div className="mh-page-wrapper">
            <div className="mh-page-header">
                <p className="mh-last-updated">
                    {t('patient.realTimeBeds')}
                </p>
                <button className="mh-refresh-btn" onClick={fetchData} title={t('patient.refresh')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                        <path d="M21 3v5h-5"></path>
                    </svg>
                    {t('patient.refresh')}
                </button>
            </div>

            <div className="mh-container">
                {hospitals.map((hospital) => (
                    <MultiHospitalCard key={hospital.id} hospital={hospital} />
                ))}
            </div>
        </div>
        </>
    );
};

export default MultiHospital;