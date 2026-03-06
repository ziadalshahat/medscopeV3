import React from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import "./Auth.css";

const OtpVerification = () => {

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    navigate("/reset-password");

  } catch (error) {
    alert(error.message);
  }
};

    return (
        <AuthCard
            title="Enter OTP"
            subtitle="Please enter the OTP sent to your registered Email: ******h52@gmail.com"
            icon="fa-solid fa-shield-halved"
        >
            <form onSubmit={handleSubmit}>
                <div className="otp-container mt-2">
                    {[1, 2, 3, 4, 5].map((digit) => (
                        <input
                            key={digit}
                            type="text"
                            maxLength="1"
                            className="otp-input"
                            required
                        />
                    ))}
                </div>

                <button type="submit" className="auth-submit-btn">
                    Verify Code
                </button>

                <div className="text-center mt-4">
                    <Link to="/forgot-password" className="auth-link small-text text-muted">
                        Didn't receive code? Resend
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
};

export default OtpVerification;
