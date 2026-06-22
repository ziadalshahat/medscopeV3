import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Sidebar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const menuItems = [
        {
            name: t("admin.dashboard", "Dashboard"),
            path: "/admin/dashboard",
            icon: "fa-tachometer-alt"
        },
        {
            name: t("admin.home", "Home"),
            path: "/admin/home",
            icon: "fa-home"
        },
        {
            name: t("admin.patients", "Patients"),
            path: "/admin/patients",
            icon: "fa-user-injured"
        },
        {
            name: t("admin.appointments", "Appointments"),
            path: "/admin/appointments",
            icon: "fa-calendar-check"
        },
        {
            name: t("admin.doctors", "Doctors"),
            path: "/admin/doctors",
            icon: "fa-user-md"
        },
        {
            name: t("admin.beds", "Bed Management"),
            path: "/admin/beds",
            icon: "fa-bed"
        },
        {
            name: t("admin.bloodBank", "Blood Bank"),
            path: "/admin/blood-bank",
            icon: "fa-tint"
        },
        {
            name: t("admin.multiHospital", "Multi Hospital View"),
            path: "/admin/multi-hospitals",
            icon: "fa-hospital"
        },
    ];

    return (
        <aside className="sidebar">
            {/* Header */}
            <div className="sidebar-header">
                <div className="logo-icon">
                    <FontAwesomeIcon
                        icon={faClinicMedical}
                    />
                </div>
                <h2>
                    MedScope
                </h2>
            </div>

            {/* Menu */}
            <nav className="sidebar-nav">
                <ul>
                    {
                        menuItems.map((item) => (
                            <li
                                key={item.path}
                                className={
                                    location.pathname === item.path
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link to={item.path}>
                                    <i
                                        className={
                                            `fas ${item.icon} nav-icon`
                                        }
                                    >
                                    </i>
                                    <span>
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* Logout */}
            <div className="sidebar-footer" style={{ padding: '10px 15px' }}>
                <Link
                    to="/"
                    className="logout-btn"
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 15px', borderRadius: '8px', width: '100%' }}
                >
                    <i className="fas fa-sign-out-alt nav-icon" style={{ width: '20px', fontSize: '16px' }}></i>
                    {t("admin.logout", "Logout")}
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;