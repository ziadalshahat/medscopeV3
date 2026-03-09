import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingStepper from '../../components/BookingStepper';
import {
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    CalendarDaysIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import '../../styles/SelectSpecialty.css'; // Common layout
import '../../styles/ReviewConfirm.css';

const ReviewConfirm = () => {
    const navigate = useNavigate();

    // Mock initial user data
    const [patientData, setPatientData] = useState({
        name: 'Ziad Mahmoud',
        phone: '01098215646',
        email: 'ziad.mah@example.com',
        notes: ''
    });

    const handleConfirmBooking = () => {
        // Here you would make API call to confirm the booking
        console.log('Booking Confirmed!', patientData);
        navigate('/patient/appointments/upcoming');
    };

    return (
        <div className="booking-layout">
            <div className="booking-header">
                <h2 className="booking-title">Book a New Appointment</h2>
                <p className="booking-subtitle">Choose specialty, doctor, and time — confirm in one step.</p>
            </div>

            <BookingStepper currentStep={4} />

            <div className="booking-wizard-wrapper">
                <div className="review-container">
                    <h3 className="review-header">Review & Confirm</h3>

                    <div className="review-content">
                        {/* Left Side Form */}
                        <div className="review-form-section">
                            <div className="form-group-review">
                                <label className="review-label review-label-blue"><UserIcon /> Patient Name</label>
                                <input
                                    type="text"
                                    className="review-input"
                                    value={patientData.name}
                                    onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-row-2col">
                                <div className="form-group-review">
                                    <label className="review-label"><PhoneIcon /> Phone</label>
                                    <input
                                        type="tel"
                                        className="review-input"
                                        value={patientData.phone}
                                        onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="form-group-review">
                                    <label className="review-label review-label-blue"><EnvelopeIcon /> Email</label>
                                    <input
                                        type="email"
                                        className="review-input"
                                        value={patientData.email}
                                        onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group-review" style={{ marginTop: '8px' }}>
                                <label className="review-label review-label-blue" style={{ color: '#004a61' }}>Appointment Notes (Optional)</label>
                                <textarea
                                    className="review-textarea"
                                    placeholder="e.g., reason for visit, symptoms..."
                                    value={patientData.notes}
                                    onChange={(e) => setPatientData({ ...patientData, notes: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        {/* Right Side Summary */}
                        <div className="review-summary-section">
                            <div className="summary-card-inner">
                                <h3>Your Appointment</h3>

                                <div className="summary-doctor-preview">
                                    <img
                                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150"
                                        alt="Doctor"
                                        className="summary-doc-img"
                                    />
                                    <div className="summary-doc-details">
                                        <h4>Dr. Morgan Reed</h4>
                                        <p>Cardiology</p>
                                    </div>
                                </div>

                                <div className="summary-date-time">
                                    <div className="summary-dt-row">
                                        <CalendarDaysIcon /> Tuesday, October 9, 2025
                                    </div>
                                    <div className="summary-dt-row time-row">
                                        <ClockIcon /> 10:30 AM (PDT)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="review-actions">
                        <button className="btn-review-back" onClick={() => navigate('/patient/appointments/book/datetime')}>Back</button>
                        <button className="btn-review-confirm" onClick={handleConfirmBooking}>Confirm Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewConfirm;