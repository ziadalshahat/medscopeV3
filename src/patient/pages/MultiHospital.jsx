import React, { useState, useEffect } from 'react';
import MultiHospitalCard from '../components/MultiHospitalCard';
import Loader from '../../components/Loader';
import { getMultiHospitals } from '../services/multiHospitalService';
import '../styles/MultiHospital.css';

const MultiHospital = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMultiHospitals();
                setHospitals(data);
            } catch (err) {
                console.error('Failed to load hospitals:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ position: 'relative', width: '100%', minHeight: '50vh' }}>
                <Loader message="Loading Hospital Data..." />
            </div>
        );
    }

    return (
        <div className="mh-container">
            {hospitals.map((hospital) => (
                <MultiHospitalCard key={hospital.id} hospital={hospital} />
            ))}
        </div>
    );
};

export default MultiHospital;