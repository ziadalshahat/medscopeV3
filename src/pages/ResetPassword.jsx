import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import "./Auth.css";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        otp,
        newPassword: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    navigate("/reset-success");

  } catch (error) {
    alert(error.message);
  }
};

    return (
        <AuthCard
            title="Set a new password"
            subtitle="Create a new password. Ensure it differs from previous ones for security"
            icon="fa-solid fa-lock"
        >
            <form onSubmit={handleSubmit} className="mt-2">
                <div className="auth-form-group">
                    <label className="auth-label">Password</label>
                    <div className="auth-input-group">
                        <span className="auth-input-icon primary">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="auth-input"
                            required
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
                    <label className="auth-label">Confirm Password</label>
                    <div className="auth-input-group">
                        <span className="auth-input-icon primary">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input
                            type={showConfirm ? "text" : "password"}
                            className="auth-input"
                            required
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

                <button type="submit" className="auth-submit-btn">
                    Update Password
                </button>
            </form>
        </AuthCard>
    );
};

export default ResetPassword;
