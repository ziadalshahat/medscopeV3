import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon } from '@heroicons/react/24/outline';
import '../../styles/SelectHospital.css';

const SelectHospital = () => {
    const navigate = useNavigate();

    const handleSelectHospital = (hospitalId) => {
        // In a real app, save this to Context/Redux
        console.log("Selected hospital:", hospitalId);
        navigate('/patient/appointments/book/specialty');
    };

    return (
        <div className="hospital-selection-container">
            <div className="hospital-title-wrapper">
                <h2 className="hospital-title">Select a hospital to book a new appointment</h2>
            </div>

            <div className="hospital-grid">

                {/* Hospital 1 */}
                <div className="hospital-card" onClick={() => handleSelectHospital('city-general')}>
                    <img
                        src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800"
                        alt="City General Hospital"
                        className="hospital-image"
                    />
                    <div className="hospital-overlay">
                        <div className="hospital-name-badge">
                            City General Hospital
                        </div>
                        <div className="hospital-location">
                            <MapPinIcon /> New York, NY
                        </div>
                    </div>
                </div>

                {/* Hospital 2 */}
                <div className="hospital-card" onClick={() => handleSelectHospital('cleveland')}>
                    <img
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                        alt="Cleveland Hospital"
                        className="hospital-image"
                    />
                    <div className="hospital-overlay">
                        <div className="hospital-name-badge">
                            Cleveland Hospital
                        </div>
                        <div className="hospital-location">
                            <MapPinIcon /> New York, NY
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SelectHospital;