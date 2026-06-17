import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faTint, faCalendarCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Home/Home.css';
import managementImg from '../../assets/images/home/management-tools.jpg';

const ManagementTools = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to the main login page
  };

  return (
    <div className="home-section management-tools-section">
      <div style={{ marginBottom: '20px' }}>
        <span style={{ backgroundColor: '#ffffff', color: '#1c5b7c', padding: '5px 15px', borderRadius: '15px', fontSize: '12px', fontWeight: '600', border: '1px solid #d1e2f3' }}>
          MANAGEMENT TOOLS
        </span>
      </div>
      <h2 className="home-section-title">Comprehensive Healthcare<br />Management Tools</h2>
      <p className="home-section-subtitle">
        Access powerful healthcare management tools designed to streamline your medical journey.
      </p>

      {/* Main Tool Card */}
      <div className="main-tool-card">
        <img 
          src={managementImg} 
          alt="Doctors examining holographic lungs" 
          className="main-tool-img"
        />
        <div className="main-tool-overlay">
          <h2>Doctor Appointments Booking</h2>
          <button className="login-btn-large" onClick={handleLoginRedirect}>
            Login to Book &rarr;
          </button>
        </div>
      </div>

      {/* Sub Tools Grid */}
      <div className="sub-tools-grid">
        {/* Beds */}
        <div className="sub-tool-card">
          <div className="sub-tool-icon">
            <FontAwesomeIcon icon={faBed} />
          </div>
          <h3>Available Beds (ICU & Incubators)</h3>
          <div className="sub-tool-features">
            <span><FontAwesomeIcon icon={faCheckCircle} /> Live status</span>
            <span><FontAwesomeIcon icon={faCheckCircle} /> All departments</span>
          </div>
          <button className="login-btn-small" onClick={handleLoginRedirect}>
            Login to View &rarr;
          </button>
        </div>

        {/* Blood Bank */}
        <div className="sub-tool-card">
          <div className="sub-tool-icon">
            <FontAwesomeIcon icon={faTint} />
          </div>
          <h3>Blood Bank</h3>
          <div className="sub-tool-features">
            <span><FontAwesomeIcon icon={faCheckCircle} /> Available quantities</span>
          </div>
          <button className="login-btn-small" onClick={handleLoginRedirect}>
            Login to View Blood &rarr;
          </button>
        </div>

        {/* My Appointments */}
        <div className="sub-tool-card">
          <div className="sub-tool-icon">
            <FontAwesomeIcon icon={faCalendarCheck} />
          </div>
          <h3>My Appointments</h3>
          <div className="sub-tool-features">
            <span><FontAwesomeIcon icon={faCheckCircle} /> History</span>
            <span><FontAwesomeIcon icon={faCheckCircle} /> Upcoming</span>
          </div>
          <button className="login-btn-small" onClick={handleLoginRedirect}>
            Login to Manage Appointments &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementTools;
