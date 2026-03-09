import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import AppointmentCard from '../../components/AppointmentCard';
import '../../styles/Appointments.css';

const Past = () => {
    const navigate = useNavigate();

    // Mock past appointments data
    const pastAppointments = [
        {
            id: 1,
            date: 'Dec 15, 2025',
            time: '09:00 AM',
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            hospital: 'City General Hospital',
            status: 'Completed'
        },
        {
            id: 2,
            date: 'Nov 12, 2025',
            time: '11:00 AM',
            doctorName: 'Dr. Emily Rodriguez',
            specialty: 'Dermatologist',
            hospital: 'City General Hospital',
            status: 'Completed'
        }
    ];

    return (
        <div className="appointments-container">

            {/* Action Bar */}
            <div className="appointments-action-bar">
                <div className="appointments-tabs">
                    <NavLink to="/patient/appointments/upcoming" className="tab-link">
                        Upcoming
                    </NavLink>
                    <NavLink to="/patient/appointments/past" className="tab-link active">
                        Past Appointments
                    </NavLink>
                </div>

                <button
                    className="btn-book-new"
                    onClick={() => navigate('/patient/appointments/book/hospital')}
                >
                    <PlusIcon />
                    Book a New Appointment
                </button>
            </div>

            {/* Grid Layout */}
            {pastAppointments.length > 0 ? (
                <div className="appointments-grid">
                    {pastAppointments.map((appt) => (
                        <AppointmentCard key={appt.id} data={appt} isPast={true} />
                    ))}
                </div>
            ) : (
                <div className="btn-empty-state">
                    <p>No past appointments found.</p>
                </div>
            )}

        </div>
    );
};

export default Past;