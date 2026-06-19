import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { resetPassword } from "../patient/services/authService";
import { useTranslation } from "react-i18next";
import "./Auth.css";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    
    const email = location.state?.email || "";
    const resetToken = location.state?.resetToken || location.state?.otp || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!email || !resetToken) {
            navigate("/forgot-password");
        }
    }, [email, resetToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await resetPassword(email, resetToken, password);
            navigate("/reset-success");
        } catch (err) {
            let errorMessage = "Failed to reset password. Please try again.";
            
            if (err.response?.data?.errors) {
                // Handle ASP.NET Core Validation Errors
                const errors = err.response.data.errors;
                const firstKey = Object.keys(errors)[0];
                if (firstKey && errors[firstKey].length > 0) {
                    errorMessage = errors[firstKey][0];
                }
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (typeof err.response?.data === 'string' && err.response.data.trim() !== '') {
                errorMessage = err.response.data;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard
            title={t("auth.set_new_password")}
            subtitle={t("auth.set_new_password_subtitle")}
            icon="fa-solid fa-lock"
        >
            <form onSubmit={handleSubmit} className="mt-2">
                <div className="auth-form-group">
                    <label className="auth-label">{t("auth.password_label")}</label>
                    <div className="auth-input-group">
                        <span className="auth-input-icon primary">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="auth-input"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="auth-btn-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={`fas fa-eye${showPassword ? "-slash" : ""}`}></i>
                        </button>
                    </div>
                </div>

                <div className="auth-form-group mb-4">
                    <label className="auth-label">{t("auth.confirm_password")}</label>
                    <div className="auth-input-group">
                        <span className="auth-input-icon primary">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input
                            type={showConfirm ? "text" : "password"}
                            className="auth-input"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="auth-btn-icon"
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            <i className={`fas fa-eye${showConfirm ? "-slash" : ""}`}></i>
                        </button>
                    </div>
                </div>

                {error && <div className="auth-error-message mb-3" style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? t("auth.updating") : t("auth.update_password")}
                </button>
            </form>
        </AuthCard>
    );
};

export default ResetPassword;
