import React, { useState } from 'react';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    PencilSquareIcon,
    IdentificationIcon,
    CalendarDaysIcon,
    ShieldCheckIcon,
    ClockIcon,
    BellIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import '../styles/Profile.css';

const Profile = () => {
    // State for Modals
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Mock User Data
    const [userData, setUserData] = useState({
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001'
    });

    // Handle Edit Form
    const handleEditChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveEdit = () => {
        // Here you would call an API to save
        setIsEditModalOpen(false);
    };

    const handleDeleteAccount = () => {
        // Here you would call an API to delete
        console.log("Account deleted!");
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="profile-container">

            {/* Personal Information Section */}
            <div className="profile-card">
                <div className="profile-card-header">
                    <h3>Personal Information</h3>
                    <button className="btn-edit" onClick={() => setIsEditModalOpen(true)}>
                        <PencilSquareIcon />
                        Edit
                    </button>
                </div>

                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label"><UserIcon /> Full Name</div>
                        <div className="info-value">{userData.fullName}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label"><EnvelopeIcon /> Email</div>
                        <div className="info-value">{userData.email}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label"><PhoneIcon /> Phone Number</div>
                        <div className="info-value">{userData.phone}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label"><MapPinIcon /> Address</div>
                        <div className="info-value">{userData.address}</div>
                    </div>
                </div>
            </div>

            {/* Account Information Section */}
            <div className="profile-card">
                <div className="profile-card-header">
                    <h3>Account Information</h3>
                </div>

                <div className="account-cards-grid">
                    <div className="account-box">
                        <div className="account-box-label"><IdentificationIcon /> Patient ID</div>
                        <div className="account-box-value">PT-2024-001234</div>
                    </div>
                    <div className="account-box">
                        <div className="account-box-label"><CalendarDaysIcon /> Registration Date</div>
                        <div className="account-box-value">January 15, 2024</div>
                    </div>
                    <div className="account-box">
                        <div className="account-box-label"><ShieldCheckIcon /> Account Status</div>
                        <div className="account-box-value value-active">Active</div>
                    </div>
                    <div className="account-box">
                        <div className="account-box-label"><ClockIcon /> Last Login</div>
                        <div className="account-box-value">January 27, 2026 at 9:30 AM</div>
                    </div>
                </div>
            </div>

            {/* Settings Section */}
            <div className="profile-card">
                <div className="profile-card-header">
                    <h3>Settings</h3>
                </div>

                <h4 style={{ color: '#004f78', fontSize: '0.9rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BellIcon style={{ width: '18px' }} /> Notification Preferences
                </h4>

                <div className="settings-list">
                    <div className="setting-item">
                        <span className="setting-label">Email Notifications</span>
                        <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <span className="setting-label">SMS Notifications</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <span className="setting-label">Appointment Reminders</span>
                        <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="settings-actions">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button className="btn-action-primary">Change Password</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button className="btn-action-danger" onClick={() => setIsDeleteModalOpen(true)}>Delete Account</button>
                        <span className="danger-text">Once you delete your account, there is no going back. Please be certain.</span>
                    </div>
                </div>
            </div>

            {/* --- Modals --- */}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Edit Profile</h3>
                            <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>
                                <XMarkIcon />
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                            <div className="edit-form-group">
                                <label>Full Name</label>
                                <input type="text" name="fullName" value={userData.fullName} onChange={handleEditChange} required />
                            </div>
                            <div className="edit-form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={userData.email} onChange={handleEditChange} required />
                            </div>
                            <div className="edit-form-group">
                                <label>Phone Number</label>
                                <input type="text" name="phone" value={userData.phone} onChange={handleEditChange} required />
                            </div>
                            <div className="edit-form-group">
                                <label>Address</label>
                                <input type="text" name="address" value={userData.address} onChange={handleEditChange} required />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-action-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Delete Account</h3>
                            <button className="modal-close" onClick={() => setIsDeleteModalOpen(false)}>
                                <XMarkIcon />
                            </button>
                        </div>
                        <p className="modal-warning-text">
                            Are you absolutely sure you want to delete your account?
                            <strong> All your medical records, appointments, and personal data will be permanently removed.</strong>
                            This action cannot be undone.
                        </p>
                        <div className="modal-actions">
                            <button type="button" className="btn-cancel" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                            <button type="button" className="btn-action-danger" onClick={handleDeleteAccount}>Yes, Delete Account</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Profile;