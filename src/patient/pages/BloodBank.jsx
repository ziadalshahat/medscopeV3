import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HospitalCard from '../components/HospitalCard';
import Loader from '../../components/Loader';
import { getHospitals } from '../services/bloodBankService';
import '../styles/bloodbank.css';

const BloodBank = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortMethod, setSortMethod] = useState('none');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHospitals();
                setHospitals(data);
            } catch (err) {
                console.error('Failed to load hospitals:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getProcessedHospitals = () => {
        let result = hospitals.filter((h) =>
            h.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortMethod === 'highest' || sortMethod === 'lowest') {
            result = [...result].sort((a, b) => {
                const totalA = Object.values(a.bloodTypes).reduce((s, v) => s + v, 0);
                const totalB = Object.values(b.bloodTypes).reduce((s, v) => s + v, 0);
                return sortMethod === 'highest' ? totalB - totalA : totalA - totalB;
            });
        } else if (sortMethod === 'name') {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    };

    const processed = getProcessedHospitals();

    /* Loading state uses the shared Loader component */
    if (loading) {
        return (
            <div style={{ position: 'relative', width: '100%', minHeight: '50vh' }}>
                <Loader message="Loading Blood Bank Data..." />
            </div>
        );
    }

    return (
        <div className="bloodbank-container">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
            />

            <div className="bb-hospital-grid">
                {processed.length > 0 ? (
                    processed.map((hospital, idx) => (
                        <HospitalCard key={idx} hospital={hospital} />
                    ))
                ) : (
                    <div className="bb-empty-state">
                        No hospitals match your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodBank;
