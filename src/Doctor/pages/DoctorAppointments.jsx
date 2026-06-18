import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorAppointments.css";
import { getUpcomingAppointments } from "../services/doctorAppointmentsApi";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";
import SuccessModal from "../../components/SuccessModal";

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState("Day");
  const [activePage, setActivePage] = useState(1);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ConfirmModal — for logout confirmation
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // SuccessModal — ready for future use
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const today = new Date().toISOString().split("T")[0];

        const data = await getUpcomingAppointments(
          today,
          activeTab,
          activePage
        );

        if (Array.isArray(data)) {
          setAppointments(data);
        } else if (data.data && Array.isArray(data.data)) {
          setAppointments(data.data);
        } else if (data.items) {
          setAppointments(data.items);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [activeTab, activePage]);

  // Step 1: click Logout → open ConfirmModal
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // Step 2: user confirms → clear storage and navigate
  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="da-page">
      {/* Loader — shown while fetching appointments */}
      {loading && <Loader message="Loading appointments..." />}

      {/* ConfirmModal — logout confirmation */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
        isDestructive={true}
      />

      {/* SuccessModal — ready for future use */}
      <SuccessModal
        message={successMessage}
        onClose={() => setSuccessMessage("")}
        autoDismiss={4000}
      />

      {/* Sidebar */}
      <aside className="da-sidebar">
        <div className="da-sidebar-top">
          <div className="da-logo">
            <div className="da-logo-icon">+</div>
          </div>

          <nav className="da-nav">
            <div
              className="da-nav-item da-nav-active"
              onClick={() => navigate("/doctor/appointments")}
            >
              <span>Appointments</span>
            </div>

            <div
              className="da-nav-item"
              onClick={() => navigate("/doctor/patients")}
            >
              <span>Patients</span>
            </div>

            <div
              className="da-nav-item"
              onClick={() => navigate("/doctor/patient-record")}
            >
              <span>Patient Record</span>
            </div>

            <div
              className="da-nav-item"
              onClick={() => navigate("/doctor/working-hours")}
            >
              <span>Working Hours</span>
            </div>
          </nav>
        </div>

        <div className="da-logout" onClick={handleLogoutClick}>
          <span>Logout</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="da-main">
        {/* Top Header */}
        <div className="da-topbar">
          <div>
            <h1 className="da-page-title">Appointments</h1>
            <p className="da-subtitle">Manage all upcoming patient appointments</p>
          </div>
        </div>

        {/* Card */}
        <div className="da-card">
          <div className="da-card-header">
            <div>
              <h2 className="da-card-title">Upcoming Appointments</h2>
              <p className="da-card-subtitle">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="da-tabs">
            {["Day", "Week", "Month"].map((tab) => (
              <button
                key={tab}
                className={`da-tab ${activeTab === tab ? "da-tab-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="da-table-wrap">
            <table className="da-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Patient Name</th>
                  <th>Hospital</th>
                  <th>Visit Type</th>
                  <th>User Action</th>
                </tr>
              </thead>

              <tbody>
                {error ? (
                  <tr>
                    <td colSpan="6" className="da-error">{error}</td>
                  </tr>
                ) : appointments.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="6" className="da-empty">No appointments found</td>
                  </tr>
                ) : (
                  appointments.map((item, i) => (
                    <tr key={item.id || i}>
                      <td>{item.time || item.appointmentTime || "N/A"}</td>
                      <td>{item.date || item.appointmentDate || "N/A"}</td>
                      <td>{item.patient || item.patientName || "Unknown"}</td>
                      <td>{item.hospital || item.hospitalName || "N/A"}</td>
                      <td>
                        <span className="da-visit-badge">
                          {item.visit || item.visitType || "Consultation"}
                        </span>
                      </td>
                      <td>
                        <div className="da-actions">
                          <button
                            className="da-btn-details"
                            onClick={() =>
                              navigate("/doctor/appointment-details", {
                                state: item,
                              })
                            }
                          >
                            Details
                          </button>

                          <button
                            className="da-btn-visit"
                            onClick={() =>
                              navigate("/doctor/start-visit", {
                                state: {
                                  appointmentId: item.id || item.appointmentId,
                                },
                              })
                            }
                          >
                            Start Visit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="da-pagination">
            <button
              className="da-page-nav"
              onClick={() => { if (activePage > 1) setActivePage(activePage - 1); }}
            >
              Previous
            </button>

            <div className="da-pages">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`da-page-btn ${activePage === page ? "da-page-active" : ""}`}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="da-page-nav"
              onClick={() => setActivePage(activePage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorAppointments;