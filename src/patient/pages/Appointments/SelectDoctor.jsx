import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BookingStepper from '../../components/BookingStepper';
import { MagnifyingGlassIcon, StarIcon as StarIconSolid, XMarkIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline, CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import { usePatient } from '../../context/PatientContext';
import appointmentService from '../../services/appointmentService';
import Loader from '../../../components/Loader';
import '../../styles/SelectSpecialty.css'; // Reusing layout common styles
import '../../styles/SelectDoctor.css';

const SelectDoctor = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { bookingData, setBookingData } = usePatient();
    
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
    const [selectedScheduleDoctor, setSelectedScheduleDoctor] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [scheduleLoading, setScheduleLoading] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Defensive checks: ensure hospital and specialty exist
                if (!bookingData?.hospitalId) {
                    setError(t('patient.hospitalNotSelected'));
                    setLoading(false);
                    return;
                }

                const specArg = typeof bookingData?.specialty === 'string' 
                                ? bookingData.specialty 
                                : (bookingData?.specialtyName || bookingData?.specialtyId);

                if (!specArg) {
                    setError(t('patient.specialtyNotSelected'));
                    setLoading(false);
                    return;
                }

                console.log(`[SelectDoctor] Preparing API request => hospitalId: ${bookingData.hospitalId}, specialty: ${specArg}`);

                const data = await appointmentService.getDoctors(bookingData.hospitalId, specArg);
                setDoctors(data || []);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
                // Extract detailed errors if available
                let detailedErrs = "";
                if (err.response?.data?.errors) {
                    detailedErrs = JSON.stringify(err.response.data.errors);
                } else if (err.response?.data) {
                    detailedErrs = JSON.stringify(err.response.data);
                }
                
                setError(`${t('patient.couldNotLoadDoctors')} (${err.response?.status || 'Error'})`);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [bookingData, t]);

    const filteredDoctors = doctors.filter(doc => 
        (doc.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderStars = (rating = 0) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<StarIconSolid key={i} className="star-icon" style={{width: 16, height: 16}} />);
            } else {
                stars.push(<StarIconOutline key={i} className="star-icon empty" style={{width: 16, height: 16}} />);
            }
        }
        return stars;
    };

    const handleSelectDoctor = (doc) => {
        setBookingData(prev => ({
            ...prev,
            doctorId: doc.id,
            doctorName: doc.name,
            doctorImage: doc.image
        }));
        navigate('/patient/appointments/book/datetime');
    };

    const handleViewSchedule = async (doc) => {
        setSelectedScheduleDoctor(doc);
        setScheduleModalOpen(true);
        setScheduleLoading(true);
        try {
            const data = await appointmentService.getDoctorSchedule(doc.id);
            setScheduleData(data);
        } catch (err) {
            console.error("Failed to fetch schedule", err);
            setScheduleData(null);
        } finally {
            setScheduleLoading(false);
        }
    };

    return (
        <div className="booking-layout">
            <div className="booking-header">
                <h2 className="booking-title">{t('patient.bookNewAppointment')}</h2>
                <p className="booking-subtitle">{t('patient.chooseSpecialtyDoctorTime')}</p>
            </div>

            <BookingStepper currentStep={2} />

            <div className="booking-wizard-wrapper">

                <div className="specialty-search-wrapper">
                    <MagnifyingGlassIcon className="specialty-search-icon" style={{ color: '#64748b', width: 24, height: 24 }} />
                    <input
                        type="text"
                        className="specialty-search-input"
                        placeholder={t('patient.searchDoctors') || "Search by doctor's name..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {loading && <Loader />}
                {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>}

                {!loading && !error && (
                    <div className="doctor-list-container">
                        {filteredDoctors.length === 0 ? (
                            <p style={{ textAlign: 'center' }}>{t('patient.noDoctorsFound')}</p>
                        ) : (
                            filteredDoctors.map((doc) => (
                                <div key={doc.id} className="doctor-card">
                                    <div className="doctor-info-section">
                                        <img src={doc.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'} alt={doc.name} className="doctor-avatar" />
                                        <div className="doctor-details">
                                            <h3 className="doctor-name-title">{doc.name}</h3>
                                            <p className="doctor-card-specialty">
                                                {t(`specialties.${doc.specialty?.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')}`, doc.specialty)}
                                            </p>
                                            <div className="doctor-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span style={{ color: '#004a61', fontWeight: '600' }}>{doc.rating || 0}</span>
                                                <div style={{ display: 'flex' }}>{renderStars(doc.rating)}</div>
                                                <span>({doc.reviews || 0} {t('patient.reviews')})</span>
                                            </div>
                                            <p className="doctor-bio">{doc.bio || t('patient.noBio')}</p>
                                        </div>
                                    </div>
                                    <div className="doctor-action-section">
                                        <button className="btn-view-schedule" onClick={() => handleViewSchedule(doc)}>{t('patient.viewSchedule')}</button>
                                        <button className="btn-select-doctor" onClick={() => handleSelectDoctor(doc)}>{t('patient.select')}</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* View Schedule Modal */}
            {scheduleModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--modal-bg, #ffffff)', padding: '24px', borderRadius: '12px',
                        width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto',
                        position: 'relative',
                        color: 'var(--text-color, #0f172a)'
                    }}>
                        <button 
                            onClick={() => setScheduleModalOpen(false)}
                            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <XMarkIcon style={{width: 24, height: 24, color: 'var(--text-muted, #64748b)'}} />
                        </button>
                        
                        <h3 style={{ marginTop: 0, marginBottom: '8px', color: 'var(--text-color, #0f172a)' }}>{t('patient.scheduleFor')} {selectedScheduleDoctor?.name}</h3>
                        <p style={{ color: 'var(--text-muted, #64748b)', fontSize: '14px', marginBottom: '20px' }}>{t('patient.previewSlots')}</p>

                        {scheduleLoading ? (
                            <Loader />
                        ) : scheduleData && scheduleData.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {scheduleData.map((dayObj, index) => {
                                    const dayName = dayObj.day || dayObj.date || dayObj.dayOfWeek || '';
                                    const lookupKey = dayName ? (dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase()) : '';
                                    const daySlots = dayObj.slots || dayObj.availableTimes || dayObj.times || [];
                                    const hasShift = dayObj.from && dayObj.to;
                                    return (
                                        <div key={index} style={{ border: '1px solid var(--border-color, #e2e8f0)', borderRadius: '8px', padding: '16px', background: 'var(--card-bg, #ffffff)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: '600', color: 'var(--text-color, #334155)' }}>
                                                <CalendarDaysIcon style={{width: 20, height: 20, color: '#0ea5e9'}} />
                                                {t(`doctor.${lookupKey}`, dayName)}
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {daySlots.length > 0 ? (
                                                    daySlots.map((slot, i) => {
                                                        const slotText = typeof slot === 'string' ? slot : (slot.time || slot.Time || slot.slot || '');
                                                        return (
                                                            <span key={i} style={{ 
                                                                background: 'var(--input-bg, #f1f5f9)', padding: '6px 12px', borderRadius: '6px', 
                                                                fontSize: '13px', color: 'var(--text-color, #475569)', display: 'flex', alignItems: 'center', gap: '4px',
                                                                border: '1px solid var(--border-color, transparent)'
                                                            }}>
                                                                <ClockIcon style={{width: 14, height: 14}} /> {slotText}
                                                            </span>
                                                        );
                                                    })
                                                ) : hasShift ? (
                                                    <span style={{ 
                                                        background: 'var(--input-bg, #f1f5f9)', padding: '6px 12px', borderRadius: '6px', 
                                                        fontSize: '13px', color: 'var(--text-color, #475569)', display: 'flex', alignItems: 'center', gap: '4px',
                                                        border: '1px solid var(--border-color, transparent)'
                                                    }}>
                                                        <ClockIcon style={{width: 14, height: 14}} /> {dayObj.from} - {dayObj.to}
                                                    </span>
                                                ) : (
                                                    <span style={{ fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>{t('patient.noSlotsAvailable')}</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-muted, #64748b)' }}>{t('patient.noScheduleData')}</p>
                        )}
                        
                        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button 
                                className="btn-select-doctor"
                                onClick={() => {
                                    setScheduleModalOpen(false);
                                    handleSelectDoctor(selectedScheduleDoctor);
                                }}
                            >
                                {t('patient.continueWithDoctor')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectDoctor;