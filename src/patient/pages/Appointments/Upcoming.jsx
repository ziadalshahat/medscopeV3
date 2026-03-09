import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import AppointmentCard from '../../components/AppointmentCard';
import '../../styles/Appointments.css';

const Upcoming = () => {
    const navigate = useNavigate();

    // Mock upcoming appointments data
    const upcomingAppointments = [
        {
            id: 1,
            date: 'Jan 28, 2026',
            time: '10:00 AM',
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            hospital: 'City General Hospital',
            status: 'Confirmed'
        },
        {
            id: 2,
            date: 'Jan 28, 2026',
            time: '10:00 AM',
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            hospital: 'City General Hospital',
            status: 'Confirmed'
        },
        {
            id: 3,
            date: 'Feb 02, 2026',
            time: '2:30 PM',
            doctorName: 'Dr. Michael Chen',
            specialty: 'General Physician',
            hospital: 'City General Hospital',
            status: 'Confirmed'
        },
        {
            id: 4,
            date: 'Jan 28, 2026',
            time: '10:00 AM',
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            hospital: 'City General Hospital',
            status: 'Confirmed'
        },
        {
            id: 5,
            date: 'Feb 10, 2026',
            time: '11:00 AM',
            doctorName: 'Dr. Emily Rodriguez',
            specialty: 'Dermatologist',
            hospital: 'City General Hospital',
            status: 'Pending'
        },
        {
            id: 6,
            date: 'Jan 28, 2026',
            time: '10:00 AM',
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            hospital: 'City General Hospital',
            status: 'Confirmed'
        }
    ];

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
                    onClick={() => navigate('/patient/appointments/book/hospital')}
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