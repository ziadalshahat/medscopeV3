import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/BloodBank.css";
import { getBloodBank, increaseBlood, decreaseBlood } from "../services/bloodBank";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../../components/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle";

const BloodBank = () => {
  const { t } = useTranslation();
  const [bloodData, setBloodData] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Retrieve user details from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.fullName || "Admin";
  const userRole = user.role || "Admin";

  useEffect(() => {
    fetchBlood();
  }, []);

  const fetchBlood = async () => {
    try {
      setLoading(true);
      const res = await getBloodBank();
      setBloodData(res.data);
    } catch (err) {
      toast.error("Failed to load blood data");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 increase
  const handleIncrease = async (id) => {
    try {
      setLoadingIds((prev) => [...prev, id]);

      await increaseBlood(id);

      setBloodData((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, quantity: b.quantity + 1, animate: true }
            : b
        )
      );

      toast.success("Added unit 🩸");
    } catch {
      toast.error("Error increasing");
    } finally {
      setLoadingIds((prev) => prev.filter((i) => i !== id));
      setTimeout(() => {
        setBloodData((prev) =>
          prev.map((b) => ({ ...b, animate: false }))
        );
      }, 300);
    }
  };

  // 🔥 decrease
  const handleDecrease = async (id) => {
    const item = bloodData.find((b) => b.id === id);
    if (item.quantity === 0) return;

    try {
      setLoadingIds((prev) => [...prev, id]);

      await decreaseBlood(id);

      setBloodData((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, quantity: b.quantity - 1, animate: true }
            : b
        )
      );

      toast.success("Removed unit");
    } catch {
      toast.error("Error decreasing");
    } finally {
      setLoadingIds((prev) => prev.filter((i) => i !== id));
      setTimeout(() => {
        setBloodData((prev) =>
          prev.map((b) => ({ ...b, animate: false }))
        );
      }, 300);
    }
  };

  return (
    <div className="blood-container">
      {loading && <Loader message={t("admin.loading_blood_bank", "Loading blood bank inventory...")} />}

      {/* Top Profile Header */}
      <div className="admin-bed-header-block">
        <h2 className="admin-bed-page-title">🩸 {t("admin.bloodBank", "Blood Bank")}</h2>
        <div className="admin-bed-profile-area">
          <LanguageToggle />
          <ThemeToggle />
          <div className="notification-bell-container">
            <FontAwesomeIcon icon={faBell} className="bell-icon" />
            <span className="bell-badge"></span>
          </div>
          <div className="admin-bed-profile-details">
            <span className="profile-name">{userName}</span>
            <span className="profile-role">{userRole}</span>
          </div>
        </div>
      </div>

      <div className="blood-grid">
        {bloodData.map((blood) => {
          const percentage = Math.min((blood.quantity / 50) * 100, 100); // max visual

          return (
            <div
              key={blood.id}
              className={`blood-card ${blood.animate ? "pulse" : ""}`}
            >

              <div className="blood-type">
                {blood.bloodType}
              </div>

              <p className="blood-label">{t("admin.quantity_units", "Quantity (units)")}</p>

              {/* 🔥 control */}
              <div className="quantity-control">

                <button
                  className="btn-decrease"
                  disabled={blood.quantity === 0 || loadingIds.includes(blood.id)}
                  onClick={() => handleDecrease(blood.id)}
                >
                  -
                </button>

                <span className="quantity-number">
                  {blood.quantity}
                </span>

                <button
                  className="btn-increase"
                  disabled={loadingIds.includes(blood.id)}
                  onClick={() => handleIncrease(blood.id)}
                >
                  +
                </button>

              </div>

              {/* 🔥 progress */}
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p className={`blood-status ${blood.quantity < 10 ? "low" : ""}`}>
                {blood.quantity < 10 ? t("admin.low_stock", "Low Stock") : t("admin.in_stock", "In Stock")}
              </p>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BloodBank;