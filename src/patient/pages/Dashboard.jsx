import React from 'react';
import {
    BellAlertIcon,
    CalendarIcon,
    DocumentTextIcon,
    PlusIcon,
    ChatBubbleLeftRightIcon,
    DocumentIcon
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">

            {/* New Updates Section */}
            <div className="updates-card">
                <div className="updates-header">
                    <BellAlertIcon />
                    <h3>New Updates <span className="updates-count">(3)</span></h3>
                </div>
                <div className="updates-list">
                    <div className="update-item">
                        <p className="update-title">Appointment reminder for tomorrow at 10:00 AM</p>
                        <p className="update-time">2 hours ago</p>
                    </div>
                    <div className="update-item">
                        <p className="update-title">Hypertension check-up are now available</p>
                        <p className="update-time">5 hours ago</p>
                    </div>
                    <div className="update-item">
                        <p className="update-title">Prescription renewal due soon</p>
                        <p className="update-time">1 day ago</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-grid">
                <NavLink to="/patient/appointments/upcoming" className="action-card action-appointments">
                    <div className="action-icon-wrapper">
                        <CalendarIcon />
                    </div>
                    <div className="action-text">
                        <h4>Appointments</h4>
                        <p>View & Manage</p>
                    </div>
                </NavLink>

                <NavLink to="/patient/medical-history" className="action-card action-reports">
                    <div className="action-icon-wrapper">
                        <DocumentTextIcon />
                    </div>
                    <div className="action-text">
                        <h4>Medical Reports</h4>
                        <p>View Documents</p>
                    </div>
                </NavLink>

                <NavLink to="/patient/appointments/book" className="action-card action-book">
                    <div className="action-icon-wrapper">
                        <PlusIcon />
                    </div>
                    <div className="action-text">
                        <h4>Book Appointment</h4>
                        <p>Schedule Visit</p>
                    </div>
                </NavLink>

                <NavLink to="/patient/assistant" className="action-card action-assistant">
                    <div className="action-icon-wrapper">
                        <ChatBubbleLeftRightIcon />
                    </div>
                    <div className="action-text">
                        <h4>Smart Assistant</h4>
                        <p>Ask Questions</p>
                    </div>
                </NavLink>
            </div>

            {/* Bottom Section: 2 Columns */}
            <div className="bottom-sections-grid">

                {/* Upcoming Appointments */}
                <div className="section-card">
                    <div className="section-header">
                        <h3>Upcoming Appointments</h3>
                        <NavLink to="/patient/appointments/upcoming" className="section-link">View All</NavLink>
                    </div>

                    <div className="list-container">
                        <div className="list-item">
                            <div className="item-info-row">
                                <div className="item-details">
                                    <h4>Dr. Sarah Johnson</h4>
                                    <p className="item-subtitle">Cardiologist</p>
                                    <p className="item-date">
                                        <CalendarIcon />
                                        Jan 28, 2026 at 10:00 AM
                                    </p>
                                </div>
                            </div>
                            <span className="badge-confirmed">Confirmed</span>
                        </div>

                        <div className="list-item">
                            <div className="item-info-row">
                                <div className="item-details">
                                    <h4>Dr. Michael Chen</h4>
                                    <p className="item-subtitle">General Physician</p>
                                    <p className="item-date">
                                        <CalendarIcon />
                                        Feb 02, 2026 at 2:30 PM
                                    </p>
                                </div>
                            </div>
                            <span className="badge-confirmed">Confirmed</span>
                        </div>
                    </div>
                </div>

                {/* Medical Reports */}
                <div className="section-card">
                    <div className="section-header">
                        <h3>Medical Reports</h3>
                        <NavLink to="/patient/medical-history" className="section-link">View All</NavLink>
                    </div>

                    <div className="list-container">
                        <div className="list-item">
                            <div className="item-info-row">
                                <DocumentIcon className="item-icon" />
                                <div className="item-details">
                                    <h4>Type 2 Diabetes follow-up</h4>
                                    <p className="item-date" style={{ marginTop: '4px' }}>Jan 25, 2026</p>
                                </div>
                            </div>
                            <span className="badge-ready">Ready</span>
                        </div>

                        <div className="list-item">
                            <div className="item-info-row">
                                <DocumentIcon className="item-icon" />
                                <div className="item-details">
                                    <h4>Hypertension check-up</h4>
                                    <p className="item-date" style={{ marginTop: '4px' }}>Jan 20, 2026</p>
                                </div>
                            </div>
                            <span className="badge-ready">Ready</span>
                        </div>

                        <div className="list-item">
                            <div className="item-info-row">
                                <DocumentIcon className="item-icon" />
                                <div className="item-details">
                                    <h4>Liver function follow-up</h4>
                                    <p className="item-date" style={{ marginTop: '4px' }}>Jan 15, 2026</p>
                                </div>
                            </div>
                            <span className="badge-ready">Ready</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
