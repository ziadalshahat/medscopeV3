import React, { useState, useEffect } from "react";
import "../styles/Settings.css";
import { useTranslation } from "react-i18next";
import {
  getProfile,
  updateProfile,
  changePassword,
  updateNotifications,
} from "../services/superAdminApi";

const Settings = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [tempInfo, setTempInfo] = useState({ ...info });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [passMsg, setPassMsg] = useState("");
  const [savingPass, setSavingPass] = useState(false);

  const [notifications, setNotifications] = useState({
    systemErrors: true,
    securityIncidents: false,
    appointmentReminders: true,
  });

  // ========== Fetch Profile ==========
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const data = response.data;
        setInfo({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
        });
        setTempInfo({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ========== Edit Profile ==========
  const handleEdit = () => {
    setTempInfo({ ...info });
    setIsEditing(true);
  };

  const handleSaveInfo = async () => {
    try {
      const nameParts = tempInfo.fullName.split(" ");
      await updateProfile({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phoneNumber: tempInfo.phone,
      });
      setInfo({ ...tempInfo });
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(err.response?.data || "Failed to update profile");
    }
  };

  // ========== Change Password ==========
  const handleChangePassword = async () => {
    if (!passwords.current) return setPassMsg(t("admin.saving") === "Saving..." ? "Please enter current password." : "الرجاء إدخال كلمة المرور الحالية.");
    if (passwords.newPass.length < 6)
      return setPassMsg(t("admin.saving") === "Saving..." ? "New password must be at least 6 characters." : "يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل.");
    if (passwords.newPass !== passwords.confirm)
      return setPassMsg(t("admin.saving") === "Saving..." ? "Passwords don't match." : "كلمتا المرور غير متطابقتين.");

    try {
      setSavingPass(true);
      setPassMsg("");
      await changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.newPass,
        confirmPassword: passwords.confirm,
      });
      setPassMsg(t("admin.saving") === "Saving..." ? "Password changed successfully!" : "تم تغيير كلمة المرور بنجاح!");
      setPasswords({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      console.error("Error changing password:", err);
      const errorMsg = err.response?.data;
      if (typeof errorMsg === "string") {
        setPassMsg(errorMsg);
      } else if (Array.isArray(errorMsg)) {
        setPassMsg(errorMsg.map((e) => e.description || e).join(", "));
      } else {
        setPassMsg(t("admin.saving") === "Saving..." ? "Failed to change password" : "فشل تغيير كلمة المرور");
      }
    } finally {
      setSavingPass(false);
    }
  };

  // ========== Notifications ==========
  const toggleNotif = async (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);

    try {
      await updateNotifications({
        systemAlerts: updated.systemErrors,
        securityAlerts: updated.securityIncidents,
        appointmentReminders: updated.appointmentReminders,
      });
    } catch (err) {
      console.error("Error updating notifications:", err);
      // Revert on error
      setNotifications(notifications);
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <h2>{t("admin.saving") === "Saving..." ? "Loading..." : "جاري التحميل..."}</h2>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2 className="settings-title">{t("superadmin.settings.title")}</h2>
        <p className="settings-subtitle">
          {t("superadmin.settings.subtitle")}
        </p>
      </div>

      {/* Personal Information */}
      <div className="settings-card">
        <div className="card-top">
          <h3 className="card-title">{t("settings.personal_info")}</h3>
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEdit}>
              <i className="fas fa-edit"></i> {t("settings.edit")}
            </button>
          ) : (
            <button className="edit-btn save" onClick={handleSaveInfo}>
              <i className="fas fa-check"></i> {t("settings.save")}
            </button>
          )}
        </div>

        <div className="info-grid">
          <div className="info-field">
            <label>
              <i className="fas fa-user"></i> {t("settings.full_name")}
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempInfo.fullName}
                onChange={(e) =>
                  setTempInfo({ ...tempInfo, fullName: e.target.value })
                }
              />
            ) : (
              <p>{info.fullName}</p>
            )}
          </div>

          <div className="info-field">
            <label>
              <i className="fas fa-envelope"></i> {t("settings.email")}
            </label>
            <p className="readonly">{info.email}</p>
          </div>

          <div className="info-field">
            <label>
              <i className="fas fa-phone"></i> {t("settings.phone")}
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempInfo.phone}
                onChange={(e) =>
                  setTempInfo({ ...tempInfo, phone: e.target.value })
                }
              />
            ) : (
              <p>{info.phone || t("settings.not_set")}</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="settings-card">
        <div className="card-top">
          <h3 className="card-title">{t("settings.security_settings")}</h3>
          <button
            className="edit-btn"
            onClick={handleChangePassword}
            disabled={savingPass}
          >
            {savingPass ? t("settings.changing") : t("settings.change_password")}
          </button>
        </div>

        {passMsg && (
          <p
            className={`pass-msg ${passMsg.includes("successfully") || passMsg.includes("نجاح") ? "success" : "error"}`}
          >
            {passMsg}
          </p>
        )}

        <div className="pass-grid">
          <div className="info-field full">
            <label>{t("settings.current_password")}</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
            />
          </div>
          <div className="info-field">
            <label>{t("settings.new_password")}</label>
            <input
              type="password"
              value={passwords.newPass}
              onChange={(e) =>
                setPasswords({ ...passwords, newPass: e.target.value })
              }
            />
          </div>
          <div className="info-field">
            <label>{t("settings.confirm_password")}</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="settings-card">
        <h3 className="card-title">{t("superadmin.settings.title")}</h3>
        <div className="notif-section">
          <p className="notif-label">
            <i className="fas fa-bell"></i> {t("settings.notification_preferences")}
          </p>
          {[
            { key: "systemErrors", label: t("settings.system_errors") },
            {
              key: "securityIncidents",
              label: t("settings.security_incidents"),
            },
            { key: "appointmentReminders", label: t("settings.appointment_reminders") },
          ].map(({ key, label }) => (
            <div className="notif-item" key={key}>
              <span>{label}</span>
              <div
                className={`toggle ${notifications[key] ? "on" : ""}`}
                onClick={() => toggleNotif(key)}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
