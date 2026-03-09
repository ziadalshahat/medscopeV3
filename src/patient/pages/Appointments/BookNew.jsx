import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeftIcon,
    UserIcon,
    BuildingOfficeIcon,
    CalendarDaysIcon,
    TagIcon
} from '@heroicons/react/24/outline';
import '../../styles/BookNew.css';

const BookNew = () => {
    const navigate = useNavigate();
    const [selectedTime, setSelectedTime] = useState('');

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock successful submission
        navigate('/patient/appointments/upcoming');
    };

    return (
        <div className="book-new-container">
            <div className="book-form-card">

                <div className="book-header">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        <ArrowLeftIcon /> Back to Appointments
                    </button>
                    <h2 className="book-title">Book a New Appointment</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="book-form-grid">

                        {/* Department / Specialty */}
                        <div className="form-group">
                            <label className="form-label">Specialty / Department</label>
                            <div className="input-wrapper">
                                <TagIcon className="input-icon" />
                                <select className="form-select" required defaultValue="">
                                    <option value="" disabled>Select Specialty</option>
                                    <option value="cardiology">Cardiology</option>
                                    <option value="dermatology">Dermatology</option>
                                    <option value="orthopedics">Orthopedics</option>
                                    <option value="neurology">Neurology</option>
                                    <option value="pediatrics">Pediatrics</option>
                                </select>
                            </div>
                        </div>

                        {/* Doctor Selection */}
                        <div className="form-group">
                            <label className="form-label">Select Doctor</label>
                            <div className="input-wrapper">
                                <UserIcon className="input-icon" />
                                <select className="form-select" required defaultValue="">
                                    <option value="" disabled>Choose a Doctor</option>
                                    <option value="dr-sarah">Dr. Sarah Johnson</option>
                                    <option value="dr-michael">Dr. Michael Chen</option>
                                    <option value="dr-emily">Dr. Emily Rodriguez</option>
                                    <option value="dr-dexter">Dr. Dexter Morgan</option>
                                </select>
                            </div>
                        </div>

                        {/* Hospital/Branch */}
                        <div className="form-group">
                            <label className="form-label">Hospital Branch</label>
                            <div className="input-wrapper">
                                <BuildingOfficeIcon className="input-icon" />
                                <select className="form-select" required defaultValue="">
                                    <option value="" disabled>Select Location</option>
                                    <option value="city-general">City General Hospital</option>
                                    <option value="cleveland">Cleveland Hospital</option>
                                </select>
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="form-group">
                            <label className="form-label">Appointment Date</label>
                            <div className="input-wrapper">
                                <CalendarDaysIcon className="input-icon" />
                                <input type="date" className="form-input" required />
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="form-group full-width">
                            <label className="form-label">Available Time Slots</label>
                            <div className="time-slots-container">
                                {timeSlots.map((time, index) => (
                                    <div
                                        key={index}
                                        className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reason for Visit */}
                        <div className="form-group full-width">
                            <label className="form-label">Reason for Visit (Optional)</label>
                            <textarea
                                className="form-textarea"
                                placeholder="Please briefly detail your symptoms or reason for visit..."
                                rows="3"
                            ></textarea>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="book-actions">
                        <button type="button" className="btn-form-cancel" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-form-confirm" disabled={!selectedTime}>
                            Confirm Appointment
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default BookNew;