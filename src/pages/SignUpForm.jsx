import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import SuccessModal from "../components/SuccessModal";
import Loader from "../components/Loader";
import { signupUser } from "../patient/services/authService.js";
import { useTranslation } from "react-i18next";
import "./Auth.css";

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
const EGYPT_PHONE_RE = /^(\+20|01)[0-9]{9,10}$/;

const getPasswordStrength = (password, t) => {
  if (!password) return { level: "", label: "", width: "0%" };

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isLong = password.length >= 8;

  if (isLong && hasLower && hasUpper && hasNumber && hasSpecial)
    return { level: "strong", label: t("auth.strong"), width: "100%" };
  if (isLong && (hasLower || hasUpper) && hasNumber)
    return { level: "medium", label: t("auth.medium"), width: "66%" };
  return { level: "weak", label: t("auth.weak"), width: "33%" };
};

const validateField = (name, value, extra = {}) => {
  const { t } = extra;
  switch (name) {
    case "firstName":
    case "lastName":
      if (!value.trim()) return name === "firstName" ? t("auth.validation.first_name_required") : t("auth.validation.last_name_required");
      if (value.trim().length < 2) return name === "firstName" ? t("auth.validation.first_name_min") : t("auth.validation.last_name_min");
      return "";
    case "email":
      if (!value.trim()) return t("auth.validation.email_required");

      if (value.includes(" "))
        return t("auth.validation.email_spaces");

      if (!EMAIL_RE.test(value))
        return t("auth.validation.email_invalid");

      if (value.length > 100)
        return t("auth.validation.email_too_long");

      return "";
    case "password":
      if (!value) return t("auth.validation.password_required");
      if (value.length < 8) return t("auth.validation.password_min");
      if (!/[A-Z]/.test(value)) return t("auth.validation.password_upper");
      if (!/[a-z]/.test(value)) return t("auth.validation.password_lower");
      if (!/[0-9]/.test(value)) return t("auth.validation.password_number");
      return "";
    case "confirmPassword":
      if (!value) return t("auth.validation.confirm_password_required");
      if (value !== extra.password) return t("auth.validation.passwords_match");
      return "";
    case "phone":
      if (!value.trim()) return t("auth.validation.phone_required");
      if (!EGYPT_PHONE_RE.test(value.replace(/\s/g, ""))) return t("auth.validation.phone_invalid");
      return "";
    case "dob":
      if (!value) return t("auth.validation.dob_required");

      const birthDate = new Date(value);
      const today = new Date();

      if (birthDate > today) return t("auth.validation.dob_future");

      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      const realAge =
        monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ? age - 1
          : age;

      if (realAge < 18) return t("auth.validation.dob_underage");

      return "";
    case "terms":
      if (!value) return t("auth.validation.terms_required");
      return "";
    default:
      return "";
  }
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState(() => sessionStorage.getItem("signup_firstName") || "");
  const [lastName, setLastName] = useState(() => sessionStorage.getItem("signup_lastName") || "");
  const [email, setEmail] = useState(() => sessionStorage.getItem("signup_email") || "");
  const [password, setPassword] = useState(() => sessionStorage.getItem("signup_password") || "");
  const [confirmPassword, setConfirmPassword] = useState(() => sessionStorage.getItem("signup_confirmPassword") || "");
  const [phone, setPhone] = useState(() => sessionStorage.getItem("signup_phone") || "");
  const [gender, setGender] = useState(() => sessionStorage.getItem("signup_gender") || "male");
  const [dob, setDob] = useState(() => sessionStorage.getItem("signup_dob") || "");
  const [termsAccepted, setTermsAccepted] = useState(() => sessionStorage.getItem("signup_termsAccepted") === "true");

  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("signup_firstName", firstName);
  }, [firstName]);

  useEffect(() => {
    sessionStorage.setItem("signup_lastName", lastName);
  }, [lastName]);

  useEffect(() => {
    sessionStorage.setItem("signup_email", email);
  }, [email]);

  useEffect(() => {
    sessionStorage.setItem("signup_password", password);
  }, [password]);

  useEffect(() => {
    sessionStorage.setItem("signup_confirmPassword", confirmPassword);
  }, [confirmPassword]);

  useEffect(() => {
    sessionStorage.setItem("signup_phone", phone);
  }, [phone]);

  useEffect(() => {
    sessionStorage.setItem("signup_gender", gender);
  }, [gender]);

  useEffect(() => {
    sessionStorage.setItem("signup_dob", dob);
  }, [dob]);

  useEffect(() => {
    sessionStorage.setItem("signup_termsAccepted", termsAccepted);
  }, [termsAccepted]);

  const clearSessionStorage = () => {
    sessionStorage.removeItem("signup_firstName");
    sessionStorage.removeItem("signup_lastName");
    sessionStorage.removeItem("signup_email");
    sessionStorage.removeItem("signup_password");
    sessionStorage.removeItem("signup_confirmPassword");
    sessionStorage.removeItem("signup_phone");
    sessionStorage.removeItem("signup_gender");
    sessionStorage.removeItem("signup_dob");
    sessionStorage.removeItem("signup_termsAccepted");
  };

  const strength = useMemo(() => getPasswordStrength(password, t), [password, t]);
  const markTouched = useCallback((field) => setTouched((prev) => ({ ...prev, [field]: true })), []);

  const errors = useMemo(() => ({
    firstName: validateField("firstName", firstName, { t }),
    lastName: validateField("lastName", lastName, { t }),
    email: validateField("email", email, { t }),
    password: validateField("password", password, { t }),
    confirmPassword: validateField("confirmPassword", confirmPassword, { password, t }),
    phone: validateField("phone", phone, { t }),
    dob: validateField("dob", dob, { t }),
    terms: validateField("terms", termsAccepted, { t }),
  }), [firstName, lastName, email, password, confirmPassword, phone, dob, termsAccepted, t]);

  const shouldShow = (field) => (touched[field] || submitAttempted) && errors[field];
  const isFormValid = Object.values(errors).every((e) => !e) && strength.level !== "weak";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!isFormValid) return;
    await handleConfirm();
  };

  const handleConfirm = async () => {
  try {
    setLoading(true);

    const data = await signupUser(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      gender,
      dob
    );

    localStorage.setItem("token", data.token);
    setShowSuccess(true);

  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  const fieldError = (field) => shouldShow(field) ? (
    <span className="field-error"><i className="fas fa-exclamation-circle"></i> {errors[field]}</span>
  ) : null;

  const inputGroupClass = (field) => `auth-input-group${shouldShow(field) ? " input-error" : ""}`;

  return (
    <>
      <AuthCard
        title={t("auth.signup_title")}
        subtitle={t("auth.signup_subtitle")}
        icon="fa-solid fa-user-doctor"
        isSignup={true}
      >
        <form onSubmit={handleSubmit} noValidate>
          {/* First & Last Name */}
          <div className="form-row">
            <div className="form-col">
              <label className="auth-label">{t("auth.first_name")}</label>
              <div className={inputGroupClass("firstName")}>
                <span className="auth-input-icon"><i className="fas fa-user"></i></span>
                <input
                  type="text"
                  className="auth-input"
                  placeholder={t("auth.first_name_placeholder")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => markTouched("firstName")}
                />
              </div>
              {fieldError("firstName")}
            </div>
            <div className="form-col">
              <label className="auth-label">{t("auth.last_name")}</label>
              <div className={inputGroupClass("lastName")}>
                <span className="auth-input-icon"><i className="fas fa-user"></i></span>
                <input
                  type="text"
                  className="auth-input"
                  placeholder={t("auth.last_name_placeholder")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => markTouched("lastName")}
                />
              </div>
              {fieldError("lastName")}
            </div>
          </div>

          {/* Email */}
          <div className="auth-form-group">
            <label className="auth-label">{t("auth.email_label")}</label>
            <div className={inputGroupClass("email")}>
              <span className="auth-input-icon danger"><i className="fas fa-envelope"></i></span>
              <input
                type="email"
                className="auth-input"
                placeholder={t("auth.email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => markTouched("email")}
              />
            </div>
            {fieldError("email")}
          </div>

          {/* Password */}
          <div className="auth-form-group">
            <label className="auth-label">{t("auth.password_label")}</label>
            <div className={inputGroupClass("password")}>
              <span className="auth-input-icon primary"><i className="fas fa-lock"></i></span>
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input"
                placeholder={t("auth.create_password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => markTouched("password")}
              />
              <button type="button" className="auth-btn-icon" onClick={() => setShowPassword(!showPassword)}>
                <i className={`fas fa-eye${showPassword ? "-slash" : ""}`}></i>
              </button>
            </div>
            <div className="password-strength-wrapper">
              <div className="password-strength-bar">
                <div
                  className={`password-strength-fill ${strength.level}`}
                  style={{ width: strength.width }}
                ></div>
              </div>
              <span className={`password-strength-text ${strength.level}`}>
                {strength.label || "—"}
              </span>
            </div>
            <span className="password-hint">{t("auth.validation.password_min")}</span>
            {fieldError("password")}
          </div>

          {/* Confirm Password */}
          <div className="auth-form-group">
            <label className="auth-label">{t("auth.confirm_password")}</label>
            <div className={inputGroupClass("confirmPassword")}>
              <span className="auth-input-icon primary"><i className="fas fa-lock"></i></span>
              <input
                type={showConfirm ? "text" : "password"}
                className="auth-input"
                placeholder={t("auth.confirm_password_placeholder")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => markTouched("confirmPassword")}
              />
              <button type="button" className="auth-btn-icon" onClick={() => setShowConfirm(!showConfirm)}>
                <i className={`fas fa-eye${showConfirm ? "-slash" : ""}`}></i>
              </button>
            </div>
            {fieldError("confirmPassword")}
          </div>

          {/* Phone */}
          <div className="auth-form-group">
            <label className="auth-label">{t("auth.phone_number")}</label>
            <div className={inputGroupClass("phone")}>
              <span className="auth-input-icon danger"><i className="fas fa-phone"></i></span>
              <input
                type="tel"
                className="auth-input"
                placeholder={t("auth.phone_placeholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => markTouched("phone")}
              />
            </div>
            {fieldError("phone")}
          </div>

          {/* Gender */}
          <div className="auth-form-group">
            <label className="auth-label">{t("auth.gender")}</label>
            <div className="gender-group">
              <label className="gender-radio">
                <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} /> {t("auth.gender_male")}
              </label>
              <label className="gender-radio">
                <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} /> {t("auth.gender_female")}
              </label>
              <label className="gender-radio">
                <input type="radio" name="gender" value="preferNotToSay" checked={gender === "preferNotToSay"} onChange={(e) => setGender(e.target.value)} /> {t("auth.gender_prefer_not_to_say")}
              </label>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="auth-form-group">
            <label className="auth-label">{t("auth.dob")}</label>
            <div className={inputGroupClass("dob")}>
              <input
                type="date"
                className="auth-input"
                value={dob}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDob(e.target.value)}
                onBlur={() => markTouched("dob")}
              />
            </div>
            {fieldError("dob")}
          </div>

          {/* Terms */}
          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                markTouched("terms");
              }}
            />
            <span className="terms-label">
              {t("auth.terms_agree")} <Link to="/terms" className="auth-link">{t("auth.terms_cond")}</Link> {t("auth.terms_and")} <Link to="/privacy" className="auth-link">{t("auth.privacy_policy")}</Link> <span className="text-danger">*</span>
            </span>
          </label>
          {fieldError("terms")}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-user-plus"></i> {t("auth.create_account")}</>}
          </button>

          <div className="text-center small-text text-muted mt-3">
            {t("auth.already_have_account")} <Link to="/login" className="auth-link auth-link-danger ms-1" style={{ marginLeft: "0.5rem" }}>{t("auth.signin_btn")}</Link>
          </div>
        </form>
      </AuthCard>
      {/* Loader */}
      {loading && <Loader message={t("auth.creating_account")} />}

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          message="Registration Successful!"
          onClose={() => {
            clearSessionStorage();
            setShowSuccess(false);
            navigate("/login");
          }}
          autoDismiss={2500}
        />
      )}
    </>
  );
};

export default SignUpForm;