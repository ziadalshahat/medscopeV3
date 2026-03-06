import React from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { useTranslation } from "react-i18next";
import "./Auth.css";

const ForgotPassword = () => {
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, send email logic here
        const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    navigate("/otp-verification");

  } catch (error) {
    alert(error.message);
  }
};
    };

    return (
        <AuthCard
            title="Forgot Password"
            subtitle="Please enter your Email to reset the password"
            icon="fa-solid fa-envelope"
        >
            <form onSubmit={handleSubmit}>
                <div className="auth-form-group mb-4">
                    <label className="auth-label">Email</label>
                    <div className="auth-input-group">
                        <span className="auth-input-icon danger">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="auth-submit-btn">
                    Reset Password
                </button>

                <div className="text-center mt-4">
                    <Link to="/" className="auth-link small-text text-muted">
                        <i className="fas fa-arrow-left"></i> Back to Login
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
};

export default ForgotPassword;
