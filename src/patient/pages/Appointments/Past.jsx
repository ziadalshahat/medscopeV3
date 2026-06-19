import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import AppointmentCard from '../../components/AppointmentCard';
import appointmentService from '../../services/appointmentService';
import Loader from '../../../components/Loader';
import '../../styles/Appointments.css';

const Past = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [pastAppointments, setPastAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPast = async () => {
            try {
                const data = await appointmentService.getPast();
                setPastAppointments(data || []);
            } catch (err) {
                console.error("Failed to fetch past appointments:", err);
                setError(t('patient.noPastAppointments'));
            } finally {
                setLoading(false);
            }
        };
        fetchPast();
    }, [t]);

    if (loading) return <Loader />;

    return (
        <div className="appointments-container">

            {/* Action Bar */}
            <div className="appointments-action-bar">
                <div className="appointments-tabs">
                    <NavLink to="/patient/appointments/upcoming" className="tab-link">
                        {t('patient.upcoming')}
                    </NavLink>
                    <NavLink to="/patient/appointments/past" className="tab-link active">
                        {t('patient.pastAppointments')}
                    </NavLink>
                </div>

                <button
                    className="btn-book-new"
                    onClick={() => navigate('/patient/appointments/book/hospital')}
                >
                    <PlusIcon />
                    {t('patient.bookNewAppointment')}
                </button>
            </div>

            {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>}

            {/* Grid Layout */}
            {!error && (
                pastAppointments.length > 0 ? (
                    <div className="appointments-grid">
                        {pastAppointments.map((appt) => (
                            <AppointmentCard key={appt.id} data={appt} isPast={true} />
                        ))}
                    </div>
                ) : (
                    <div className="btn-empty-state" style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b' }}>
                        <p>{t('patient.noPastAppointments')}</p>
                    </div>
                )
            )}

        </div>
    );
};

export default Past;