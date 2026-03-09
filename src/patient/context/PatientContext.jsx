import React, { createContext, useState, useEffect } from 'react';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock fetching data
    useEffect(() => {
        const fetchPatientData = async () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setPatientData({
                    id: 'PAT-12345',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    phone: '+1 234 567 8900',
                    bloodType: 'O+',
                    upcomingAppointments: 2,
                    unreadNotes: 1
                });
                setLoading(false);
            }, 500);
        };

        fetchPatientData();
    }, []);

    return (
        <PatientContext.Provider value={{ patientData, setPatientData, loading }}>
            {children}
        </PatientContext.Provider>
    );
};
