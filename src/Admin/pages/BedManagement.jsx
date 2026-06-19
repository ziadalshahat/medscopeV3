import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/BedManagement.css";
import { getBeds, increaseBed, decreaseBed, setTotalBeds } from "../services/bedManagement";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBed, faChevronUp, faChevronDown, faPen } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader";
import ThemeToggle from "../../components/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle";

const BedManagement = () => {
  const { t } = useTranslation();
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [editingTotalId, setEditingTotalId] = useState(null);
  const [tempTotal, setTempTotal] = useState("");

  // Retrieve user details from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.fullName || "Admin";
  const userRole = user.role || "Admin";

  const fetchBeds = async () => {
    try {
      setLoading(true);
      const data = await getBeds();
      
      // Trust the API math completely
      const safeData = data.map(bed => {
        return {
          ...bed
        };
      });

      setBeds(safeData);
    } catch (err) {
      toast.error("Failed to load beds: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeds();
  }, []);

  const handleIncrease = async (bed) => {
    if (bed.usedBeds >= bed.totalBeds) {
      toast.error("All beds are currently occupied");
      return;
    }

    try {
      setUpdatingId(bed.id);

      // Optimistic update
      setBeds((prev) =>
        prev.map((b) =>
          b.id === bed.id
            ? { ...b, usedBeds: b.usedBeds + 1, availableBeds: b.availableBeds - 1 }
            : b
        )
      );

      // We want to increase OCCUPIED beds, which means DECREASING available beds on the backend
      await decreaseBed(bed.id);
      toast.success(`${bed.ward} bed count increased`);
    } catch (err) {
      console.error("Error increasing bed:", err);
      toast.error("API Error: " + err.message);
      fetchBeds(); // Rollback
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDecrease = async (bed) => {
    if (bed.usedBeds <= 0) {
      toast.error("No occupied beds to release");
      return;
    }

    try {
      setUpdatingId(bed.id);

      // Optimistic update
      setBeds((prev) =>
        prev.map((b) =>
          b.id === bed.id
            ? { ...b, usedBeds: b.usedBeds - 1, availableBeds: b.availableBeds + 1 }
            : b
        )
      );

      // We want to decrease OCCUPIED beds, which means INCREASING available beds on the backend
      await increaseBed(bed.id);
      toast.success(`${bed.ward} bed count decreased`);
    } catch (err) {
      console.error("Error decreasing bed:", err);
      toast.error("API Error: " + err.message);
      fetchBeds(); // Rollback
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveTotal = async (bed) => {
    const total = parseInt(tempTotal, 10);
    if (isNaN(total) || total < 0) {
      toast.error("Please enter a valid number of beds");
      return;
    }
    if (total < bed.usedBeds) {
      toast.error(`Total beds cannot be less than occupied beds (${bed.usedBeds})`);
      return;
    }

    try {
      setUpdatingId(bed.id);
      
      // Optimistic update
      setBeds((prev) =>
        prev.map((b) =>
          b.id === bed.id
            ? { ...b, totalBeds: total, availableBeds: total - b.usedBeds }
            : b
        )
      );
      setEditingTotalId(null);

      await setTotalBeds(bed.id, total);
      toast.success(`${bed.ward} total beds updated to ${total}`);
    } catch (err) {
      console.error("Error setting total beds:", err);
      toast.error("Failed to update total beds: " + err.message);
      fetchBeds(); // Rollback
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-bed-page">
      {loading && <Loader message={t("admin.loading_beds", "Loading bed statistics...")} />}

      {/* Top Profile Header */}
      <div className="admin-bed-header-block">
        <h2 className="admin-bed-page-title">{t("admin.beds", "Bed Management")}</h2>
        <div className="admin-bed-profile-area">
          <LanguageToggle />
          <ThemeToggle />
          
          <div className="admin-bed-profile-details">
            <span className="profile-name">{userName}</span>
            <span className="profile-role">{userRole}</span>
          </div>
        </div>
      </div>

      {/* Card Wrapper */}
      <div className="admin-bed-card-wrapper">
        {/* Tabs */}
        <div className="admin-bed-card-header">
          <div className="admin-bed-tab-active">{t("admin.bed_info", "Bed info")}</div>
        </div>

        {/* Content/Grid */}
        <div className="admin-bed-grid">
          {beds.map((bed, index) => {
              const percentage =
                bed.totalBeds === 0 ? 0 : (bed.usedBeds / bed.totalBeds) * 100;

              const isMax = bed.usedBeds >= bed.totalBeds;
              const isMin = bed.usedBeds <= 0;
              const isUpdating = updatingId === bed.id;

              return (
                <div
                  key={`${bed.ward}-${index}`}
                  className={`admin-bed-card ${isUpdating ? "admin-bed-updating" : ""}`}
                >
                  <div className="admin-bed-card-top">
                    {/* Ward Info */}
                    <div className="admin-bed-ward-info">
                      <div className="admin-bed-icon-circle">
                        <FontAwesomeIcon icon={faBed} className="admin-bed-fa-icon" />
                      </div>
                      <h3 className="admin-bed-ward-name">{t("wards." + bed.ward.toLowerCase().replace(/ beds/g, '').replace(/\(or\)/g, '').replace(/\s+/g, '_').trim(), bed.ward)}</h3>
                    </div>

                    {/* Controls & Count */}
                    <div className="admin-bed-controls-section">
                      <span className="admin-bed-count-text">
                        {bed.usedBeds}/
                        {editingTotalId === bed.id ? (
                          <input
                            type="number"
                            className="admin-bed-total-input"
                            value={tempTotal}
                            onChange={(e) => setTempTotal(e.target.value)}
                            onBlur={() => handleSaveTotal(bed)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveTotal(bed);
                              if (e.key === "Escape") setEditingTotalId(null);
                            }}
                            autoFocus
                            min={bed.usedBeds}
                          />
                        ) : (
                          <span
                            className="admin-bed-total-clickable"
                            onClick={() => {
                              setEditingTotalId(bed.id);
                              setTempTotal(bed.totalBeds);
                            }}
                            title={t("admin.edit_total_beds", "Click to edit total beds")}
                          >
                            {bed.totalBeds}
                            <FontAwesomeIcon icon={faPen} className="admin-bed-edit-icon" />
                          </span>
                        )}
                      </span>
                      <div className="admin-bed-arrows-stack">
                        <button
                          type="button"
                          className={`admin-bed-arrow-btn ${isMax ? "disabled" : ""}`}
                          onClick={() => !isMax && !isUpdating && handleIncrease(bed)}
                          disabled={isMax || isUpdating}
                          title="Increase occupied beds"
                        >
                          <FontAwesomeIcon icon={faChevronUp} />
                        </button>
                        <button
                          type="button"
                          className={`admin-bed-arrow-btn ${isMin ? "disabled" : ""}`}
                          onClick={() => !isMin && !isUpdating && handleDecrease(bed)}
                          disabled={isMin || isUpdating}
                          title="Decrease occupied beds"
                        >
                          <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="admin-bed-progress-container">
                    <div
                      className="admin-bed-progress-fill"
                      style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
};

export default BedManagement;
