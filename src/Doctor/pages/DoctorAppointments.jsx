import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/DoctorAppointments.css";
import { getUpcomingAppointments } from "../services/doctorAppointmentsApi";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";
import SuccessModal from "../../components/SuccessModal";
import ThemeToggle from "../../components/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle";

const DoctorAppointments = () => {
  const { t, i18n } = useTranslation();
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

  const filteredAppointments = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get end of current week (Saturday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Get end of current month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    return appointments.filter((item) => {
      const itemDateStr = item.date || item.appointmentDate;
      if (!itemDateStr) return false;

      const apptDate = new Date(itemDateStr);
      apptDate.setHours(0, 0, 0, 0);

      // Only today and future appointments
      if (apptDate < today) {
        return false;
      }

      if (activeTab === "Day") {
        return apptDate.getTime() === today.getTime();
      } else if (activeTab === "Week") {
        return apptDate >= today && apptDate <= endOfWeek;
      } else if (activeTab === "Month") {
        return apptDate >= today && apptDate <= endOfMonth;
      }

      return true;
    });
  }, [appointments, activeTab]);

  const displayedAppointments = filteredAppointments;

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
              <span>{t("doctor.appointments")}</span>
            </div>

            <div
              className="da-nav-item"
              onClick={() => navigate("/doctor/patients")}
            >
              <span>{t("doctor.patients")}</span>
            </div>

            <div
              className="da-nav-item"
              onClick={() => navigate("/doctor/patient-record")}
            >
              <span>{t("doctor.patientRecord")}</span>
            </div>

            <div
              className="da-nav-item"
              onClick={() => navigate("/doctor/working-hours")}
            >
              <span>{t("doctor.workingHours")}</span>
            </div>
          </nav>
        </div>

        <div className="da-logout" onClick={handleLogoutClick}>
          <span>{t("doctor.logout")}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="da-main">
        {/* Top Header */}
        <div className="da-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="da-page-title">{t("doctor.appointments")}</h1>
            <p className="da-subtitle">{t("doctor.appointmentsSubtitle")}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Card */}
        <div className="da-card">
          <div className="da-card-header">
            <div>
              <h2 className="da-card-title">{t("doctor.upcomingAppointments")}</h2>
              <p className="da-card-subtitle">
                {new Date().toLocaleDateString(i18n.language && i18n.language.startsWith("ar") ? "ar-EG" : "en-US", {
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
                {t(`doctor.${tab.toLowerCase()}`)}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="da-table-wrap">
            <table className="da-table">
              <thead>
                <tr>
                  <th>{t("doctor.time")}</th>
                  <th>{t("doctor.date")}</th>
                  <th>{t("doctor.patientName")}</th>
                  <th>{t("doctor.hospital")}</th>
                  <th>{t("doctor.visitType")}</th>
                  <th>{t("doctor.userAction")}</th>
                </tr>
              </thead>

              <tbody>
                {error ? (
                  <tr>
                    <td colSpan="6" className="da-error">{error}</td>
                  </tr>
                ) : filteredAppointments.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="6" className="da-empty">No appointments found</td>
                  </tr>
                ) : (
                  displayedAppointments.map((item, i) => (
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
                            {t("doctor.details")}
                          </button>

                          <button
                            className="da-btn-visit"
                            onClick={() =>
                              navigate("/doctor/start-visit", {
                                state: {
                                  ...item,
                                  appointmentId: item.id || item.appointmentId,
                                },
                              })
                            }
                          >
                            {t("doctor.startVisit")}
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
              {t("doctor.previous")}
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
              {t("doctor.next")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorAppointments;