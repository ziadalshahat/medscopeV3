import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingStepper from '../../components/BookingStepper';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import '../../styles/SelectSpecialty.css'; // Common layout
import '../../styles/SelectDateTime.css';

const SelectDateTime = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(9); // Default Oct 9 based on image
    const [selectedTime, setSelectedTime] = useState('10:30 AM');

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Hardcoded mock calendar days for October 2025 like in image
    const calendarDays = [
        { day: 24, disabled: true }, { day: 25, disabled: true }, { day: 26, disabled: true }, { day: 27, disabled: true }, { day: 28, disabled: true }, { day: 29, disabled: true }, { day: 30, disabled: true },
        { day: 1, disabled: false }, { day: 2, disabled: false }, { day: 3, disabled: false }, { day: 4, disabled: false }, { day: 5, disabled: false }, { day: 6, disabled: false }, { day: 7, disabled: false },
        { day: 8, disabled: false }, { day: 9, disabled: false }, { day: 10, disabled: false }, { day: 11, disabled: false }, { day: 12, disabled: false }, { day: 13, disabled: false }, { day: 14, disabled: false }
    ];

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM',
        '10:30 AM', '11:00 AM', '11:30 AM'
    ];

    return (
        <div className="booking-layout">
            <div className="booking-header">
                <h2 className="booking-title">Book a New Appointment</h2>
                <p className="booking-subtitle">Choose specialty, doctor, and time — confirm in one step.</p>
            </div>

            <BookingStepper currentStep={3} />

            <div className="booking-wizard-wrapper">
                <div className="datetime-card">

                    {/* Calendar Section (Left) */}
                    <div className="calendar-section">
                        <div className="calendar-header">
                            <button className="calendar-nav-btn"><ChevronLeftIcon /></button>
                            <h3 className="calendar-month">October 2025</h3>
                            <button className="calendar-nav-btn"><ChevronRightIcon style={{ color: '#991b1b' }} /></button>
                        </div>

                        <div className="calendar-grid">
                            {daysOfWeek.map((day) => (
                                <div key={day} className="calendar-day-header">{day}</div>
                            ))}
                            {calendarDays.map((dateObj, i) => (
                                <button
                                    key={i}
                                    disabled={dateObj.disabled}
                                    className={`calendar-day-btn ${dateObj.disabled ? 'disabled' : ''} ${selectedDate === dateObj.day && !dateObj.disabled ? 'active' : ''}`}
                                    onClick={() => setSelectedDate(dateObj.day)}
                                >
                                    {dateObj.day}
                                </button>
                            ))}
                        </div>

                        <div className="location-note">
                            <MapPinIcon /> Central Clinic, Room 204
                        </div>
                    </div>

                    {/* Time Slots (Right) */}
                    <div className="time-slots-section">
                        <h3 className="time-slots-header">Available Slots for Oct 9, 2025</h3>

                        <div className="time-grid">
                            {timeSlots.map((time, i) => (
                                <button
                                    key={i}
                                    className={`time-slot-btn-large ${selectedTime === time ? 'selected' : ''}`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        <p className="time-footer-note">All slots are 30 minutes. Timezone: Pacific Standard Time (PST).</p>

                        <div className="datetime-footer">
                            <button
                                className="btn-wizard-next"
                                disabled={!selectedTime || !selectedDate}
                                onClick={() => navigate('/patient/appointments/book/confirm')}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SelectDateTime;