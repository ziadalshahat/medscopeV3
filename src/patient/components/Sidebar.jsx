import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    UserIcon,
    CalendarIcon,
    BeakerIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    ArrowRightOnRectangleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import '../styles/Sidebar.css';
import '../styles/Profile.css'; // For modal styles

const Sidebar = () => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
    const navigate = useNavigate();

    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);
        if (nextDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const handleLogout = () => {
        // Perform logout logic here
        setIsLogoutModalOpen(false);
        navigate('/');
    };
    const navLinks = [
        { name: 'Dashboard', path: '/patient/dashboard', icon: <HomeIcon className="sidebar-icon" /> },
        { name: 'Profile', path: '/patient/profile', icon: <UserIcon className="sidebar-icon" /> },
        { name: 'Appointments', path: '/patient/appointments/upcoming', icon: <CalendarIcon className="sidebar-icon" /> },
        { name: 'Blood Bank', path: '/patient/blood-bank', icon: <BeakerIcon className="sidebar-icon" /> },
        { name: 'Multi-Hospital', path: '/patient/hospitals', icon: <BuildingOfficeIcon className="sidebar-icon" /> },
        { name: 'Patient Record', path: '/patient/medical-history', icon: <DocumentTextIcon className="sidebar-icon" /> },
        { name: 'Smart Assistant', path: '/patient/assistant', icon: <ChatBubbleLeftRightIcon className="sidebar-icon" /> },
    ];

    return (
        <div className="sidebar-content">
            <ul className="sidebar-nav-list">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
                        >
                            {link.icon}
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button 
                    onClick={toggleTheme} 
                    className="theme-toggle-btn"
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', color: '#688c9f', padding: '12px 15px', width: '100%', fontFamily: 'inherit', fontSize: '14px', borderRadius: '8px', transition: 'background-color 0.2s' }}
                >
                    <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`} style={{ width: '20px', fontSize: '16px' }}></i>
                    <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>

                <button className="sidebar-logout" onClick={() => setIsLogoutModalOpen(true)} style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 15px', borderRadius: '8px' }}>
                    <ArrowRightOnRectangleIcon className="sidebar-icon" style={{ width: '20px', height: '20px' }} />
                    Logout
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Confirm Logout</h3>
                            <button className="modal-close" onClick={() => setIsLogoutModalOpen(false)}>
                                <XMarkIcon />
                            </button>
                        </div>
                        <p className="modal-warning-text" style={{ color: '#004f78', fontWeight: '500' }}>
                            Are you sure you want to log out of the Patient Portal?
                        </p>
                        <div className="modal-actions">
                            <button type="button" className="btn-cancel" onClick={() => setIsLogoutModalOpen(false)}>Cancel</button>
                            <button type="button" className="btn-action-danger" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
