import React, { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Superadminlayout.css";
import ThemeToggle from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle";
import { useTranslation } from "react-i18next";

const pageInfo = {
  "/super-admin/hospitals": { title: "superadmin.hospitals.title", subtitle: "superadmin.hospitals.subtitle" },
  "/super-admin/admins":    { title: "superadmin.admins.title", subtitle: "superadmin.admins.subtitle" },
  "/super-admin/reports":   { title: "superadmin.reports.title", subtitle: "superadmin.reports.subtitle" },
  "/super-admin/settings":  { title: "superadmin.settings.title", subtitle: "superadmin.settings.subtitle" },
};

const initialNotifications = [
  { id: 1, icon: "fas fa-hospital", message: "New hospital added: Al Salam Hospital", time: "2 min ago", read: false },
  { id: 2, icon: "fas fa-user", message: "New admin created: Sara Al-Mutairi", time: "15 min ago", read: false },
  { id: 3, icon: "fas fa-exclamation-triangle", message: "Hospital H004 has been suspended", time: "1 hour ago", read: false },
  { id: 4, icon: "fas fa-sync-alt", message: "Admin password reset: EMP1003", time: "3 hours ago", read: true },
  { id: 5, icon: "fas fa-check-circle", message: "System backup completed successfully", time: "1 day ago", read: true },
];

const SuperAdminLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const notifRef = useRef(null);

  const [userName, setUserName] = useState("Gina");
  const [userRole, setUserRole] = useState("Super Admin");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.fullName) setUserName(parsed.fullName);
        if (parsed.role) {
          setUserRole(parsed.role === "SuperAdmin" ? "Super Admin" : parsed.role);
        }
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, []);

  const current = pageInfo[location.pathname] || { title: "", subtitle: "" };
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { label: "Hospitals", icon: "fas fa-home",     path: "/super-admin/hospitals" },
    { label: "Admins",    icon: "fas fa-user",     path: "/super-admin/admins" },
    { label: "Reports",   icon: "fas fa-file-alt", path: "/super-admin/reports" },
    { label: "Settings",  icon: "fas fa-cog",      path: "/super-admin/settings" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="super-admin-wrapper">

      {/* Sidebar */}
      <aside className="super-sidebar">
        <div className="super-sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "35px",
              height: "35px",
              background: "linear-gradient(145deg, #ffffff, #7aacc8)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img 
                src="/ChatGPT Image Sep 29, 2025, 03_40_38 PM.png" 
                alt="MedScope Logo" 
                style={{ width: "22px", height: "22px", objectFit: "contain" }} 
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2", textAlign: "start" }}>
              <span style={{ 
                fontSize: "18px", 
                fontWeight: "700", 
                background: "linear-gradient(110deg, #0a8cd8, #3ae8b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>MedScope</span>
              <span style={{ fontSize: "10px", color: "#a8c8e0" }}>{t("footer.empower")}</span>
            </div>
          </div>
        </div>

        <nav className="super-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `super-nav-item ${isActive ? "active" : ""}`}
            >
              <i className={item.icon}></i>
              <span>{t(`sidebar.${item.label.toLowerCase()}`)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="super-sidebar-footer">
          <button className="logout-btn" onClick={() => navigate("/")}>
            <i className="fas fa-sign-out-alt"></i>
            <span>{t("header.logout")}</span>
          </button>
        </div>
      </aside>

      {/* Right Side */}
      <div className="super-right">

        {/* Header */}
        <header className="super-header">
          <div className="super-header-left">
            <h2 className="super-header-title">{t(current.title)}</h2>
            <p className="super-header-subtitle">{t(current.subtitle)}</p>
          </div>
          <div className="super-header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Language Toggle Button */}
            <LanguageToggle style={{ color: '#ffffff' }} />
            {/* Theme Toggle Button */}
            <ThemeToggle style={{ color: '#ffffff' }} />

            {/* User Info */}
            <div className="super-user-info">
              <div className="super-avatar initials-avatar">
                {(() => {
                  if (!userName) return "SA";
                  const parts = userName.trim().split(/\s+/);
                  if (parts.length > 1) {
                    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                  }
                  return userName.slice(0, 2).toUpperCase();
                })()}
              </div>
              <div>
                <p className="super-user-name">{userName}</p>
                <p className="super-user-role">{userRole}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="super-main">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default SuperAdminLayout;