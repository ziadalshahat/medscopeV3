import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import { getMedicalHistory } from '../services/medicalHistoryService';
import '../styles/MedicalHistory.css';
import {
    PrinterIcon,
    ChartBarIcon,
    Bars3CenterLeftIcon,
    BeakerIcon,
    ExclamationCircleIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline'; // Using approximate icons from heroicons

const MedicalHistory = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('history');

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const result = await getMedicalHistory();
                setData(result);
            } catch (err) {
                console.error("Failed to load medical history", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecord();
    }, []);

    if (loading || !data) {
        return (
            <div style={{ position: 'relative', width: '100%', minHeight: '50vh' }}>
                <Loader message="Loading Patient Record..." />
            </div>
        );
    }

    return (
        <div className="mh-record-container">
            {/* Action Bar */}
            <div className="mh-action-bar">
                <div className="mh-action-bar-left"></div>
                <button className="mh-print-btn">
                    <PrinterIcon />
                    Print Patient Record
                </button>
            </div>

            {/* Patient Info Card */}
            <div className="mh-patient-card">
                <div className="mh-patient-header">
                    <div className="mh-patient-name-container">
                        <h2>{data.patient.name}</h2>
                        <p className="mh-patient-id">Patient ID: <strong>{data.patient.id}</strong></p>
                    </div>
                    <div className="mh-blood-badge">{data.patient.bloodType}</div>
                </div>

                <div className="mh-patient-details">
                    <div className="mh-detail-item">
                        <span className="mh-detail-label">Age</span>
                        <span className="mh-detail-value">{data.patient.age}</span>
                    </div>
                    <div className="mh-detail-item">
                        <span className="mh-detail-label">Gender</span>
                        <span className="mh-detail-value">{data.patient.gender}</span>
                    </div>
                    <div className="mh-detail-item">
                        <span className="mh-detail-label">Phone</span>
                        <span className="mh-detail-value">{data.patient.phone}</span>
                    </div>
                    <div className="mh-detail-item">
                        <span className="mh-detail-label">Email</span>
                        <span className="mh-detail-value">{data.patient.email}</span>
                    </div>
                </div>
            </div>

            {/* Summaries */}
            <div className="mh-summary-grid">
                <div className="mh-summary-card">
                    <div className="mh-summary-header">
                        <ChartBarIcon /> Chronic Diseases
                    </div>
                    <h3 className="mh-summary-count">{data.summary.chronicDiseases}</h3>
                </div>
                <div className="mh-summary-card">
                    <div className="mh-summary-header">
                        <Bars3CenterLeftIcon /> Surgeries
                    </div>
                    <h3 className="mh-summary-count">{data.summary.surgeries}</h3>
                </div>
                <div className="mh-summary-card">
                    <div className="mh-summary-header">
                        <BeakerIcon /> Medications
                    </div>
                    <h3 className="mh-summary-count">{data.summary.medications}</h3>
                </div>
                <div className="mh-summary-card">
                    <div className="mh-summary-header">
                        <ExclamationCircleIcon className="mh-icon-red" /> Allergies
                    </div>
                    <h3 className="mh-summary-count">{data.summary.allergies}</h3>
                </div>
            </div>

            {/* Tabs */}
            <div className="mh-tabs-container">
                <button 
                    className={`mh-tab ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    <ChartBarIcon /> Medical History
                </button>
                <button 
                    className={`mh-tab ${activeTab === 'notes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notes')}
                >
                    <DocumentTextIcon /> Notes (2)
                </button>
            </div>

            {/* Lists content */}
            {activeTab === 'history' && (
                <div className="mh-details-wrapper">
                    
                    {/* Chronic Diseases */}
                    <div className="mh-section-card">
                        <h4 className="mh-section-title"><ChartBarIcon /> Chronic Diseases</h4>
                        {data.history.chronicDiseases.map(item => (
                            <div className="mh-list-item" key={item.id}>
                                <div className="mh-item-content">
                                    <p className="mh-item-name">{item.name}</p>
                                    <p className="mh-item-detail">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Surgeries */}
                    <div className="mh-section-card">
                        <h4 className="mh-section-title"><Bars3CenterLeftIcon /> Surgical History</h4>
                        {data.history.surgeries.map(item => (
                            <div className="mh-list-item" key={item.id}>
                                <div className="mh-item-content">
                                    <p className="mh-item-name">{item.name}</p>
                                    <p className="mh-item-detail">{item.date}</p>
                                    <p className="mh-item-detail">{item.hospital}</p>
                                    <p className="mh-item-detail">{item.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Medications */}
                    <div className="mh-section-card">
                        <h4 className="mh-section-title"><BeakerIcon /> Current Medications</h4>
                        {data.history.medications.map(item => (
                            <div className="mh-list-item" key={item.id}>
                                <div className="mh-item-content">
                                    <p className="mh-item-name">{item.name}</p>
                                    <p className="mh-item-detail">{item.frequency}</p>
                                    <p className="mh-item-detail">{item.started}</p>
                                </div>
                                <div className="mh-med-pill">{item.dosage}</div>
                            </div>
                        ))}
                    </div>

                    {/* Allergies */}
                    <div className="mh-section-card">
                        <h4 className="mh-section-title"><ExclamationCircleIcon className="mh-icon-red" /> Allergies</h4>
                        {data.history.allergies.map(item => (
                            <div className="mh-list-item" key={item.id}>
                                <div className="mh-item-content">
                                    <p className="mh-item-name">{item.name}</p>
                                    <p className="mh-item-detail">{item.reaction}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
            
            {/* Notes placeholder state */}
            {activeTab === 'notes' && (
                <div className="mh-section-card" style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                    <p style={{ color: '#5a7d91' }}>Notes will be displayed here.</p>
                </div>
            )}

        </div>
    );
};

export default MedicalHistory;