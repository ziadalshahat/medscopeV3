import React from 'react';
import { useTranslation } from 'react-i18next';

const BloodTypeCard = ({ type, units }) => {
    const { t } = useTranslation();

    const getStatus = (count) => {
        if (count > 40) return { label: t('patient.high'), cls: 'high' };
        if (count >= 20) return { label: t('patient.medium'), cls: 'medium' };
        return { label: t('patient.low'), cls: 'low' };
    };

    const status = getStatus(units);

    return (
        <div className="blood-type-card">
            <span className="blood-type-label">{type}</span>
            <span className="blood-type-units">{units}</span>
            <span className={`status-badge ${status.cls}`}>{status.label}</span>
        </div>
    );
};

export default BloodTypeCard;
