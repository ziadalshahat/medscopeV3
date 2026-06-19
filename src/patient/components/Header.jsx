import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ searchQuery, setSearchQuery, sortMethod, setSortMethod }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="bb-notice">
                <strong>{t('patient.note')}:</strong> {t('patient.bloodBankNote')}
            </div>

            <div className="bb-controls">
                <div className="bb-search-wrapper">
                    <input
                        type="text"
                        className="bb-input"
                        placeholder={t('patient.searchHospitals')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="bb-sort-wrapper">
                    <select
                        className="bb-select"
                        value={sortMethod}
                        onChange={(e) => setSortMethod(e.target.value)}
                    >
                        <option value="none">{t('patient.sortBy')}...</option>
                        <option value="highest">{t('patient.highestBlood')}</option>
                        <option value="lowest">{t('patient.lowestBlood')}</option>
                        <option value="name">{t('patient.hospitalNameAZ')}</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Header;
