import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookingStepper from '../../components/BookingStepper';
import { MagnifyingGlassIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import '../../styles/SelectSpecialty.css'; // Reusing layout common styles
import '../../styles/SelectDoctor.css';

const SelectDoctor = () => {
    const navigate = useNavigate();

    const doctors = [
        {
            id: 'dr-dexter',
            name: 'Dr. Dexter Morgan',
            specialty: 'Cardiologist',
            rating: 4.9,
            reviews: 124,
            bio: 'Dr. Morgan is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions.',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 'dr-gina',
            name: 'Dr. Gina Moser',
            specialty: 'Cardiologist',
            rating: 4.5,
            reviews: 98,
            bio: 'Dr. Moser Specializing in preventative cardiology and lifestyle management to promote long-term heart health.',
            image: 'https://images.unsplash.com/photo-1594824432240-a35b138e6dfd?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 'dr-ninas',
            name: 'Dr. Ninas Rakia',
            specialty: 'Cardiologist',
            rating: 4.9,
            reviews: 90,
            bio: 'Dr. Rakia Specializing in preventative cardiology and lifestyle management to promote long-term heart health.',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 'dr-tiaa',
            name: 'Dr. Tiaa Dare',
            specialty: 'Cardiologist',
            rating: 4.1,
            reviews: 98,
            bio: 'Dr. Dare Specializing in preventative cardiology and lifestyle management to promote long-term heart health.',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 'dr-rema',
            name: 'Dr. Rema Sian',
            specialty: 'Cardiologist',
            rating: 4.9,
            reviews: 100,
            bio: 'Dr. Sian Specializing in preventative cardiology and lifestyle management to promote long-term heart health.',
            image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=200'
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<StarIconSolid key={i} className="star-icon" />);
            } else {
                stars.push(<StarIconOutline key={i} className="star-icon empty" />);
            }
        }
        return stars;
    };

    const handleSelectDoctor = (doctorId) => {
        // Save selected doctor to Context/Redux in a real app
        navigate('/patient/appointments/book/datetime');
    };

    return (
        <div className="booking-layout">
            <div className="booking-header">
                <h2 className="booking-title">Book a New Appointment</h2>
                <p className="booking-subtitle">Choose specialty, doctor, and time — confirm in one step.</p>
            </div>

            <BookingStepper currentStep={2} />

            <div className="booking-wizard-wrapper">

                <div className="specialty-search-wrapper">
                    <MagnifyingGlassIcon className="specialty-search-icon" style={{ color: '#64748b' }} />
                    <input
                        type="text"
                        className="specialty-search-input"
                        placeholder="Search by doctor's name..."
                    />
                </div>

                <div className="doctor-list-container">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="doctor-card">
                            <div className="doctor-info-section">
                                <img src={doc.image} alt={doc.name} className="doctor-avatar" />
                                <div className="doctor-details">
                                    <h3 className="doctor-name-title">{doc.name}</h3>
                                    <p className="doctor-card-specialty">{doc.specialty}</p>
                                    <div className="doctor-rating">
                                        <span style={{ color: '#004a61', fontWeight: '600' }}>{doc.rating}</span>
                                        {renderStars(doc.rating)}
                                        <span>({doc.reviews} reviews)</span>
                                    </div>
                                    <p className="doctor-bio">{doc.bio}</p>
                                </div>
                            </div>
                            <div className="doctor-action-section">
                                <button className="btn-view-schedule">View Schedule</button>
                                <button className="btn-select-doctor" onClick={() => handleSelectDoctor(doc.id)}>Select</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SelectDoctor;