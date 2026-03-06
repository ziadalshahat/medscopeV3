import React from "react";
import "./Footer.css";

const logoImage = "/ChatGPT Image Sep 29, 2025, 03_40_38 PM.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Row: Logo + Social */}
        <div className="footer-top">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <img src={logoImage} alt="MedScope Logo" className="logo-icon-img" width={30} height={30} />
            </div>
            <div className="footer-logo-text">
              <h2 className="footer-logo-title">MedScope</h2>
              <p className="footer-logo-subtitle">Healthcare Excellence</p>
            </div>
          </div>

          <div className="footer-social">
            <a href="#facebook" className="social-link" aria-label="Facebook">
              <i className="fab fa-facebook-f social-icon"></i>
            </a>
            <a href="#instagram" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram social-icon"></i>
            </a>
            <a href="#twitter" className="social-link" aria-label="Twitter">
              <i className="fab fa-twitter social-icon"></i>
            </a>
            <a href="#linkedin" className="social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in social-icon"></i>
            </a>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="footer-bottom">
          <p className="copyright-text">© 2025 MedScope. All rights reserved. Empowering Healthcare Excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
