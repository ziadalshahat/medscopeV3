import React from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { useTranslation } from "react-i18next";
import "./Auth.css";

const ResetSuccess = () => {
    const { t } = useTranslation();
    return (
        <AuthCard
            title={t("auth.success_title")}
            subtitle={t("auth.success_subtitle")}
            icon="fa-solid fa-check text-success"
        >
            <div className="text-center mt-2">
                <Link to="/" className="auth-submit-btn" style={{ textDecoration: 'none' }}>
                    {t("auth.continue_btn")}
                </Link>
            </div>
        </AuthCard>
    );
};

export default ResetSuccess;
