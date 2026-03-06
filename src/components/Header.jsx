import React, { useState } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const logoImage = "/ChatGPT Image Sep 29, 2025, 03_40_38 PM.png";

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const isSignupPage = location.pathname === "/signup";
    const buttonText = isSignupPage ? "Sign In" : "Sign Up";
    const buttonIcon = isSignupPage ? "fas fa-user" : "fas fa-user-plus";

    const handleButtonClick = () => {
        navigate(isSignupPage ? "/" : "/signup");
        closeMobileMenu();
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo-section">
                    <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        <div className="logo-icon">
                            <img src={logoImage} alt="MedScope Logo" className="logo-icon-img" width={35} height={35} />
                        </div>
                        <div className="logo-text">
                            <h1 className="logo-title">MedScope</h1>
                            <p className="logo-subtitle">Healthcare Excellence</p>
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="navigation">
                    <ul className="nav-list">
                        <li><a href="#home" className="nav-link">Home</a></li>
                        <li><a href="#hospitals" className="nav-link">Hospitals</a></li>
                        <li><a href="#services" className="nav-link">Services</a></li>
                        <li><a href="#about" className="nav-link">About</a></li>
                    </ul>
                </nav>

                {/* Right Section */}
                <div className="header-right">
                    <button className="signin-btn" onClick={handleButtonClick}>
                        <i className={`${buttonIcon} signin-icon`}></i>
                        {buttonText}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} mobile-menu-icon`}></i>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
                <div className="mobile-menu-content">
                    <nav className="mobile-nav">
                        <ul className="mobile-nav-list">
                            <li><a href="#home" className="mobile-nav-link" onClick={closeMobileMenu}>Home</a></li>
                            <li><a href="#hospitals" className="mobile-nav-link" onClick={closeMobileMenu}>Hospitals</a></li>
                            <li><a href="#services" className="mobile-nav-link" onClick={closeMobileMenu}>Services</a></li>
                            <li><a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>About</a></li>
                        </ul>
                    </nav>
                    <div className="mobile-menu-actions">
                        <button className="mobile-signin-btn" onClick={handleButtonClick}>
                            <i className={`${buttonIcon} mobile-signin-icon`}></i>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
