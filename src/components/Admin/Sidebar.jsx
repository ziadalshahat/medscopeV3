import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {

    const location = useLocation();


    const menuItems = [

        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: "fa-tachometer-alt"
        },

        {
            name: "Home",
            path: "/admin/home",
            icon: "fa-home"
        },

        {
            name: "Patients",
            path: "/admin/patients",
            icon: "fa-user-injured"
        },

        {
            name: "Appointments",
            path: "/admin/appointments",
            icon: "fa-calendar-check"
        },

        {
            name: "Doctors",
            path: "/admin/doctors",
            icon: "fa-user-md"
        },

        {
            name: "Bed Management",
            path: "/admin/beds",
            icon: "fa-bed"
        },

        {
            name: "Blood Bank",
            path: "/admin/blood-bank",
            icon: "fa-tint"
        },

        {
            name: "Multi Hospital View",
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
                        menuItems.map((item)=> (


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

            <div className="sidebar-footer">


                <Link 
                    to="/"
                    className="logout-btn"
                >

                    <i className="fas fa-sign-out-alt nav-icon"></i>

                    Logout


                </Link>


            </div>



        </aside>

    );
};


export default Sidebar;