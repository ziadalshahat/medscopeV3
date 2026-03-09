import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingStepper from '../../components/BookingStepper';
import {
    MagnifyingGlassIcon,
    HeartIcon, /* Cardiology */
    UserIcon, /* Orthopedics placeholder */
    EyeIcon, /* Ophthalmology */
    SparklesIcon, /* Dermatology placeholder */
    FaceSmileIcon /* Pediatrics placeholder */
} from '@heroicons/react/24/outline';
import '../../styles/SelectSpecialty.css';

const SelectSpecialty = () => {
    const navigate = useNavigate();
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);

    const specialties = [
        { id: 'cardiology', name: 'Cardiology', icon: <HeartIcon className="specialty-icon" /> },
        { id: 'orthopedics', name: 'Orthopedics', icon: <UserIcon className="specialty-icon" /> },
        { id: 'dermatology', name: 'Dermatology', icon: <SparklesIcon className="specialty-icon" /> },
        { id: 'neurology', name: 'Neurology', icon: <FaceSmileIcon className="specialty-icon" /> },
        { id: 'pediatrics', name: 'Pediatrics', icon: <UserIcon className="specialty-icon" /> },
        { id: 'ophthalmology', name: 'Ophthalmology', icon: <EyeIcon className="specialty-icon" /> },
        { id: 'gastroenterology', name: 'Gastroenterology', icon: <UserIcon className="specialty-icon" /> },
        { id: 'psychiatry', name: 'Psychiatry', icon: <FaceSmileIcon className="specialty-icon" /> }
    ];

    return (
        <div className="booking-layout">

            <div className="booking-header">
                <h2 className="booking-title">Book a New Appointment</h2>
                <p className="booking-subtitle">Choose specialty, doctor, and time — confirm in one step.</p>
            </div>

            <BookingStepper currentStep={1} />

            <div className="booking-wizard-wrapper">

                <div className="specialty-search-wrapper">
                    <MagnifyingGlassIcon className="specialty-search-icon" />
                    <input
                        type="text"
                        className="specialty-search-input"
                        placeholder="Search specialties..."
                    />
                </div>

                <div className="specialty-grid">
                    {specialties.map((spec) => (
                        <div
                            key={spec.id}
                            className={`specialty-card ${selectedSpecialty === spec.id ? 'selected' : ''}`}
                            onClick={() => setSelectedSpecialty(spec.id)}
                        >
                            {spec.icon}
                            <span className="specialty-name">{spec.name}</span>
                        </div>
                    ))}
                </div>

                <div className="booking-actions">
                    <button
                        className="btn-wizard-next"
                        disabled={!selectedSpecialty}
                        onClick={() => navigate('/patient/appointments/book/doctor')}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SelectSpecialty;