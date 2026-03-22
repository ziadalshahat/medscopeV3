import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import AppointmentCard from '../../components/AppointmentCard';
import '../../styles/Appointments.css';
import { getAppointments } from '../../services/patientService';

const Upcoming = () => {
    const navigate = useNavigate();
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    useEffect(() => {
        const data = getAppointments();
        // Filter for upcoming (we'll keep all for now as the initial list is all future-like)
        setUpcomingAppointments(data);
    }, []);

    return (
        <div className="appointments-container">

            {/* Action Bar */}
            <div className="appointments-action-bar">
                <div className="appointments-tabs">
                    <NavLink to="/patient/appointments/upcoming" className="tab-link active">
                        Upcoming
                    </NavLink>
                    <NavLink to="/patient/appointments/past" className="tab-link">
                        Past Appointments
                    </NavLink>
                </div>

                <button
                    className="btn-book-new"
                    onClick={() => navigate('/patient/appointments/hospital')}
                >
                    <PlusIcon />
                    Book a New Appointment
                </button>
            </div>

            {/* Grid Layout */}
            <div className="appointments-grid">
                {upcomingAppointments.map((appt) => (
                    <AppointmentCard key={appt.id} data={appt} isPast={false} />
                ))}
            </div>

        </div>
    );
};

export default Upcoming;