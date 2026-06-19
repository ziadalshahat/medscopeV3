import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PatientProvider } from './context/PatientContext';
import Sidebar from './components/Sidebar';
import { BellIcon } from '@heroicons/react/24/outline';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UpcomingAppointments from './pages/Appointments/Upcoming';
import PastAppointments from './pages/Appointments/Past';
import SelectHospital from './pages/Appointments/SelectHospital';
import SelectSpecialty from './pages/Appointments/SelectSpecialty';
import SelectDoctor from './pages/Appointments/SelectDoctor';
import SelectDateTime from './pages/Appointments/SelectDateTime';
import ReviewConfirm from './pages/Appointments/ReviewConfirm';
import BloodBank from './pages/BloodBank';
import MedicalHistory from './pages/MedicalHistory';
import Notes from './pages/Notes';
import MultiHospital from './pages/MultiHospital';
import SmartAssistant from './pages/SmartAssistant';
import './styles/PatientLayout.css';
import { usePatient } from "./context/PatientContext";
import Chatbot from './components/Chatbot';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';

// Patient Layout: includes the top Header, Sidebar and the main content area
const PatientLayout = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { patient } = usePatient();

    // Determine Header text based on path
    const getHeaderText = () => {
        if (location.pathname.includes('/profile')) {
            return {
                title: t('patient.profile'),
                subtitle: t('patient.managePersonalInfo')
            };
        }
        if (location.pathname.includes('/appointments/upcoming') || location.pathname.includes('/appointments/past')) {
            return {
                title: t('patient.myAppointments'),
                subtitle: t('patient.viewManageAppointments')
            };
        }
        if (location.pathname.includes('/medical-history')) {
            return {
                title: t('patient.patientRecord'),
                subtitle: ''
            };
        }
        if (location.pathname.includes('/appointments/book')) {
            return {
                title: t('patient.bookNewAppointment'),
                subtitle: 'Choose specialty, doctor, and time — confirm in one step.'
            };
        }
        if (location.pathname.includes('/hospitals')) {
            return {
                title: t('patient.multiHospital'),
                subtitle: t('patient.multiHospitalSubtitle')
            };
        }
        if (location.pathname.includes('/blood-bank')) {
            return {
                title: t('patient.bloodBank'),
                subtitle: t('patient.bloodBankSubtitle')
            };
        }

        // Default Header
        return {
            title: `${t('patient.welcomeBack')}, ${patient.name || "Patient"}`,
            subtitle: t('patient.healthToday')
        };
    };

    const headerContent = getHeaderText();

    return (
        <div className="patient-layout-wrapper">
            <Chatbot />
            {/* Sidebar Container (Left) */}
            <div className="patient-sidebar-container">
                <div className="patient-branding">
                    <h1>{t('patient.portalTitle')}</h1>
                </div>
                <Sidebar />
            </div>

            {/* Main Content Area (Right) */}
            <div className="patient-main-area">
                {/* Top Header */}
                <header className="patient-header">
                    <div className="patient-header-info">
                        <h2>{headerContent.title}</h2>
                        <p>{headerContent.subtitle}</p>
                    </div>  
                    <div className="patient-header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <LanguageToggle style={{ color: '#a4cce4' }} />
                        <ThemeToggle style={{ color: '#a4cce4' }} />
                    </div>
                </header>

                {/* Page Content */}
                <main className="patient-content-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const PatientRoutes = () => {
    return (
        <PatientProvider>
            <Routes>
                <Route element={<PatientLayout />}>
                    {/* Main Dashboard */}
                    <Route path="dashboard" element={<Dashboard />} />

                    {/* Profile */}
                    <Route path="profile" element={<Profile />} />

                    {/* Appointments Flow */}
                    <Route path="appointments/upcoming" element={<UpcomingAppointments />} />
                    <Route path="appointments/past" element={<PastAppointments />} />

                    <Route path="appointments/hospital" element={<SelectHospital />} />
                    <Route path="appointments/book/hospital" element={<SelectHospital />} />
                    <Route path="appointments/book/specialty" element={<SelectSpecialty />} />
                    <Route path="appointments/book/doctor" element={<SelectDoctor />} />
                    <Route path="appointments/book/datetime" element={<SelectDateTime />} />
                    <Route path="appointments/book/confirm" element={<ReviewConfirm />} />

                    {/* Other Pages */}
                    <Route path="blood-bank" element={<BloodBank />} />
                    <Route path="medical-history" element={<MedicalHistory />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="hospitals" element={<MultiHospital />} />
                    <Route path="assistant" element={<SmartAssistant />} />

                    {/* Default route redirects to dashboard */}
                    <Route path="*" element={<Dashboard />} />
                </Route>
            </Routes>
        </PatientProvider>
    );
};

export default PatientRoutes;
