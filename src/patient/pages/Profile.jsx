// src/patient/pages/Profile.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePatient } from "../context/PatientContext";
import profileService from "../services/profileService";
import {
    UserIcon, PhoneIcon, MapPinIcon, PencilSquareIcon,
    IdentificationIcon, CalendarDaysIcon, ShieldCheckIcon, ClockIcon,
    BellIcon, XMarkIcon, HeartIcon
} from '@heroicons/react/24/outline';
import Loader from '../../components/Loader';
import '../styles/Profile.css';


/* ── Toast ─────────────────────────────────────────────────────────────── */
const Toast = ({ message, type, onClose }) => (
    <div className={`profile-toast profile-toast--${type}`}>
        <span>{message}</span>
        <button className="profile-toast__close" onClick={onClose}>
            <XMarkIcon />
        </button>
    </div>
);

/* ── Profile Page ───────────────────────────────────────────────────────── */
const Profile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setPatient, profileData, setProfileData } = usePatient();

    /* ── State ── */
    const [loading, setLoading]   = useState(true);
    const [saving, setSaving]     = useState(false);
    const [toast, setToast]       = useState(null);

    const [editForm, setEditForm] = useState({
        firstName: '', lastName: '', phoneNumber: '', address: '', bloodGroup: ''
    });
    const [notifications, setNotifications] = useState({
        emailNotifications: true, smsNotifications: false, appointmentReminders: true
    });
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '', newPassword: '', confirmPassword: ''
    });
    const [passwordError, setPasswordError]   = useState('');
    const [isEditModalOpen, setIsEditModalOpen]         = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen]     = useState(false);

    /* ── Helpers ── */
    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    }, []);

    const applyProfileToState = useCallback((data) => {
        setProfileData(data);
        setEditForm({
            firstName:   data.firstName   || '',
            lastName:    data.lastName    || '',
            phoneNumber: data.phoneNumber || '',
            address:     data.address     || '',
            bloodGroup:  data.bloodGroup  || '',
        });
        setNotifications({
            emailNotifications:  data.notifications?.emailNotifications  ?? true,
            smsNotifications:    data.notifications?.smsNotifications    ?? false,
            appointmentReminders: data.notifications?.appointmentReminders ?? true,
        });
    }, [setProfileData]);

    /* ── Fetch on mount ── */
    useEffect(() => {
        // profileData may already be loaded by PatientContext; use it immediately
        // and still refresh in the background to guarantee freshness.
        if (profileData) {
            applyProfileToState(profileData);
            setLoading(false);
        }

        const fetchProfile = async () => {
            try {
                const data = await profileService.getProfile();
                applyProfileToState(data);
            } catch (err) {
                showToast(err?.response?.data?.message || 'Failed to load profile', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ── Edit Profile ── */
    const handleEditChange = (e) => {
        setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await profileService.updateProfile(editForm);
            // Re-fetch to get the latest server-confirmed data
            const refreshed = await profileService.getProfile();
            applyProfileToState(refreshed);
            setPatient(prev => ({ ...prev, name: refreshed.firstName || 'Patient' }));
            setIsEditModalOpen(false);
            showToast('Profile updated successfully');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to update profile', 'error');
        } finally {
            setSaving(false);
        }
    };

    /* ── Notifications (optimistic update) ── */
    const handleNotificationToggle = async (field) => {
        const previous = { ...notifications };
        const updated  = { ...notifications, [field]: !notifications[field] };
        setNotifications(updated); // optimistic
        try {
            await profileService.updateNotifications({ [field]: updated[field] });
        } catch {
            setNotifications(previous); // rollback
            showToast('Failed to update notification setting', 'error');
        }
    };

    /* ── Change Password ── */
    const handlePasswordChange = (e) => {
        setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setPasswordError('');
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // Strong password check: min 8 chars, 1 uppercase, 1 lowercase, 1 number
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if (!strongRegex.test(passwordForm.newPassword)) {
            setPasswordError('Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, and 1 number');
            return;
        }

        setSaving(true);
        try {
            await profileService.changePassword({
                oldPassword:     passwordForm.oldPassword,
                newPassword:     passwordForm.newPassword,
                confirmPassword: passwordForm.confirmPassword,
            });
            setIsPasswordModalOpen(false);
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
            showToast('Password changed successfully. Please login again.');
            
            // Force logout after password change
            setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }, 2500);
            
        } catch (err) {
            setPasswordError(err?.response?.data?.message || 'Incorrect current password');
        } finally {
            setSaving(false);
        }
    };

    /* ── Delete Account ── */
    const handleDeleteAccount = async () => {
        setSaving(true);
        try {
            await profileService.deleteAccount();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to delete account', 'error');
            setSaving(false);
        }
    };

    /* ── Render ── */
    if (loading) return <Loader message={t('patient.loadingProfile')} />;

    return (
        <>

        <div className="profile-container">

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* ─── Personal Information ─── */}
            <div className="profile-card">
                <div className="profile-card-header">
                    <h3>{t('patient.personalInfo')}</h3>
                    <button className="btn-edit" onClick={() => setIsEditModalOpen(true)}>
                        <PencilSquareIcon /> {t('patient.edit')}
                    </button>
                </div>
                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label"><UserIcon /> {t('patient.firstName')}</div>
                        <div className="info-value">{profileData?.firstName || '—'}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label"><UserIcon /> {t('patient.lastName')}</div>
                        <div className="info-value">{profileData?.lastName || '—'}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label"><PhoneIcon /> {t('patient.phoneNumber')}</div>
                        <div className="info-value">{profileData?.phoneNumber || '—'}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label"><MapPinIcon /> {t('patient.address')}</div>
                        <div className="info-value">{profileData?.address || '—'}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label"><HeartIcon /> {t('patient.bloodGroup')}</div>
                        <div className="info-value">{profileData?.bloodGroup || '—'}</div>
                    </div>
                </div>
            </div>

            {/* ─── Account Information ─── */}
            <div className="profile-card">
                <div className="profile-card-header">
                    <h3>{t('patient.accountInfo')}</h3>
                </div>
                <div className="account-cards-grid">
                    <div className="account-box">
                        <div className="account-box-label"><IdentificationIcon /> {t('patient.patientId')}</div>
                        <div className="account-box-value">{profileData?.patientId || '—'}</div>
                    </div>
                    <div className="account-box">
                        <div className="account-box-label"><CalendarDaysIcon /> {t('patient.registrationDate')}</div>
                        <div className="account-box-value">{profileData?.registrationDate || '—'}</div>
                    </div>
                    <div className="account-box">
                        <div className="account-box-label"><ShieldCheckIcon /> {t('patient.accountStatus')}</div>
                        <div className={`account-box-value ${profileData?.accountStatus === 'Active' ? 'value-active' : ''}`}>
                            {profileData?.accountStatus === 'Active' ? t('patient.active') : profileData?.accountStatus || '—'}
                        </div>
                    </div>
                    <div className="account-box">
                        <div className="account-box-label"><ClockIcon /> {t('patient.lastLogin')}</div>
                        <div className="account-box-value">{profileData?.lastLogin === 'Never' || !profileData?.lastLogin ? t('patient.never') : profileData?.lastLogin}</div>
                    </div>
                </div>
            </div>

            {/* ─── Settings ─── */}
            <div className="profile-card">
                <div className="profile-card-header"><h3>{t('patient.settings')}</h3></div>
                <h4 className="notification-heading"><BellIcon /> {t('patient.notificationPreferences')}</h4>
                <div className="settings-list">
                    {[
                        { key: 'emailNotifications',  label: t('patient.emailNotifications') },
                        { key: 'smsNotifications',    label: t('patient.smsNotifications') },
                        { key: 'appointmentReminders',label: t('patient.appointmentReminders') },
                    ].map(({ key, label }) => (
                        <div className="setting-item" key={key}>
                            <span className="setting-label">{label}</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={notifications[key]}
                                    onChange={() => handleNotificationToggle(key)}
                                />
                                <span className="slider" />
                            </label>
                        </div>
                    ))}
                </div>
                <div className="settings-actions">
                    <div className="settings-action-col">
                        <button className="btn-action-primary" onClick={() => setIsPasswordModalOpen(true)}>
                            {t('patient.changePassword')}
                        </button>
                    </div>
                    <div className="settings-action-col">
                        <button className="btn-action-danger" onClick={() => setIsDeleteModalOpen(true)}>
                            {t('patient.deleteAccount')}
                        </button>
                        <span className="danger-text">
                            {t('patient.deleteWarnText')}
                        </span>
                    </div>
                </div>
            </div>

            {/* ══════════════════ MODALS ══════════════════ */}

            {/* Edit Profile */}
            {isEditModalOpen && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{t('patient.editProfile')}</h3>
                            <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>
                                <XMarkIcon />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEdit}>
                            {[
                                { name: 'firstName',   label: t('patient.firstName'),    required: true },
                                { name: 'lastName',    label: t('patient.lastName'),     required: true },
                                { name: 'phoneNumber', label: t('patient.phoneNumber'),  required: true },
                                { name: 'address',     label: t('patient.address'),       required: true },
                                { name: 'bloodGroup',  label: t('patient.bloodGroup'),   required: false },
                            ].map(({ name, label, required }) => (
                                <div className="edit-form-group" key={name}>
                                    <label>{label}</label>
                                    <input
                                        type="text"
                                        name={name}
                                        value={editForm[name]}
                                        onChange={handleEditChange}
                                        required={required}
                                    />
                                </div>
                            ))}
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>
                                    {t('patient.cancel')}
                                </button>
                                <button type="submit" className="btn-action-primary" disabled={saving}>
                                    {saving ? t('patient.saving') : t('patient.saveChanges')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Change Password */}
            {isPasswordModalOpen && (
                <div className="modal-overlay" onClick={() => setIsPasswordModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{t('patient.changePassword')}</h3>
                            <button className="modal-close" onClick={() => { setIsPasswordModalOpen(false); setPasswordError(''); }}>
                                <XMarkIcon />
                            </button>
                        </div>
                        <form onSubmit={handlePasswordSubmit}>
                            {[
                                { name: 'oldPassword',     label: t('patient.currentPassword') },
                                { name: 'newPassword',     label: t('patient.newPassword') },
                                { name: 'confirmPassword', label: t('patient.confirmNewPassword') },
                            ].map(({ name, label }) => (
                                <div className="edit-form-group" key={name}>
                                    <label>{label}</label>
                                    <input
                                        type="password"
                                        name={name}
                                        value={passwordForm[name]}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                            ))}
                            {passwordError && <p className="password-error">{passwordError}</p>}
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => { setIsPasswordModalOpen(false); setPasswordError(''); }}>
                                    {t('patient.cancel')}
                                </button>
                                <button type="submit" className="btn-action-primary" disabled={saving}>
                                    {saving ? t('patient.changing') : t('patient.changePassword')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Account */}
            {isDeleteModalOpen && (
                <div className="modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{t('patient.deleteAccount')}</h3>
                            <button className="modal-close" onClick={() => setIsDeleteModalOpen(false)}>
                                <XMarkIcon />
                            </button>
                        </div>
                        <p className="modal-warning-text">
                            {t('patient.deleteWarnLong')}
                        </p>
                        <div className="modal-actions">
                            <button type="button" className="btn-cancel" onClick={() => setIsDeleteModalOpen(false)}>
                                {t('patient.cancel')}
                            </button>
                            <button type="button" className="btn-action-danger" onClick={handleDeleteAccount} disabled={saving}>
                                {saving ? t('patient.deleting') : t('patient.yesDeleteAccount')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
        </>

    );
};

export default Profile;