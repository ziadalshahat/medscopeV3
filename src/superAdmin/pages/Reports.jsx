import React, { useState, useEffect } from "react";
import "../styles/Reports.css";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  getReports,
  exportAdminsExcel,
  exportAdminsPdf,
  exportDashboardExcel,
  exportDashboardPdf,
} from "../services/superAdminApi";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const COLORS = [
  "#1e4f73",
  "#9BB3C7",
  "#8FA9BE",
  "#c0392b",
  "#2ecc71",
  "#e67e22",
  "#9b59b6",
  "#1abc9c",
];
const DAYS_PER_PAGE = 10;

const Reports = () => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 1-indexed
  const [growthPage, setGrowthPage] = useState(1);

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========== Fetch Reports ==========
  const fetchReports = async (month) => {
    try {
      setLoading(true);
      setError("");
      const response = await getReports(month);
      setReportData(response.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(selectedMonth);
  }, [selectedMonth]);

  // ========== Derived Data ==========
  const userGrowthData = (reportData?.userGrowth || []).filter((item) => {
    if (!item.date) return false;
    const dateParts = item.date.split("-");
    if (dateParts.length < 2) return false;
    const itemMonth = parseInt(dateParts[1], 10);
    return itemMonth === selectedMonth;
  });
  const totalPages = Math.ceil(userGrowthData.length / DAYS_PER_PAGE) || 1;
  const paginatedData = userGrowthData.slice(
    (growthPage - 1) * DAYS_PER_PAGE,
    growthPage * DAYS_PER_PAGE,
  );

  const cityData = (reportData?.hospitalDistribution || []).map((item) => ({
    name: item.city || "Unknown",
    value: item.count || 0,
  }));

  const totalPatients = reportData?.totalPatients || 0;
  const totalDoctors = reportData?.totalDoctors || 0;

  // ========== Export Handlers ==========
  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportExcel = async (section) => {
    try {
      let response;
      if (section === "User Growth") {
        response = await exportDashboardExcel(selectedMonth);
        downloadBlob(response.data, "DashboardReport.xlsx");
      } else {
        response = await exportAdminsExcel();
        downloadBlob(response.data, "AdminsReport.xlsx");
      }
    } catch (err) {
      console.error("Export Excel error:", err);
      alert("Failed to export Excel");
    }
  };

  const handleExportPdf = async (section) => {
    try {
      let response;
      if (section === "User Growth") {
        response = await exportDashboardPdf(selectedMonth);
        downloadBlob(response.data, "DashboardReport.pdf");
      } else {
        response = await exportAdminsPdf();
        downloadBlob(response.data, "AdminsReport.pdf");
      }
    } catch (err) {
      console.error("Export PDF error:", err);
      alert("Failed to export PDF");
    }
  };

  const handleMonthChange = (monthName) => {
    const monthIndex = MONTHS.indexOf(monthName) + 1;
    setSelectedMonth(monthIndex);
    setGrowthPage(1);
  };

  if (loading && !reportData) {
    return (
      <div className="reports-page">
        <h2>{t("admin.saving") === "Saving..." ? "Loading..." : "جاري التحميل..."}</h2>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h2 className="reports-title">{t("superadmin.reports.title")}</h2>
          <p className="reports-subtitle">
            {t("superadmin.reports.subtitle")}
          </p>
        </div>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="reports-card">
        {/* User Growth */}
        <div className="chart-section">
          <div className="chart-top">
            <h3 className="chart-title">{t("reports.user_growth")}</h3>
            <select
              className="chart-filter"
              value={MONTHS[selectedMonth - 1]}
              onChange={(e) => handleMonthChange(e.target.value)}
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {t("admin.saving") === "Saving..." ? m : {
                    "January": "يناير",
                    "February": "فبراير",
                    "March": "مارس",
                    "April": "أبريل",
                    "May": "مايو",
                    "June": "يونيو",
                    "July": "يوليو",
                    "August": "أغسطس",
                    "September": "سبتمبر",
                    "October": "أكتوبر",
                    "November": "نوفمبر",
                    "December": "ديسمبر"
                  }[m] || m}
                </option>
              ))}
            </select>
          </div>

          <div className="chart-meta">
            <span className="total-label">
              {t("reports.total_patients")} : <strong>{totalPatients}</strong>
            </span>
            <div className="chart-legend-inline">
              <span>
                <span className="dot" style={{ background: "#1e4f73" }}></span>{" "}
                {t("reports.patients")}
              </span>
              <span>
                <span className="dot" style={{ background: "#9BB3C7" }}></span>{" "}
                {t("reports.doctors")}
              </span>
            </div>
          </div>

          {paginatedData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={paginatedData} barSize={18}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#d9e5ef"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#1e4f73" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#1e4f73" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey="patients"
                  fill="#1e4f73"
                  radius={[4, 4, 0, 0]}
                  name={t("reports.patients")}
                />
                <Bar
                  dataKey="doctors"
                  fill="#9BB3C7"
                  radius={[4, 4, 0, 0]}
                  name={t("reports.doctors")}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center", padding: "40px", color: "#999" }}>
              {t("reports.no_data")}
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn nav-btn"
                onClick={() => setGrowthPage((p) => Math.max(p - 1, 1))}
                disabled={growthPage === 1}
              >
                {t("reports.previous")}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`page-btn ${growthPage === page ? "active" : ""}`}
                    onClick={() => setGrowthPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                className="page-btn nav-btn"
                onClick={() =>
                  setGrowthPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={growthPage === totalPages}
              >
                {t("reports.next")}
              </button>
            </div>
          )}

          <div className="export-btns">
            <button
              className="export-btn excel"
              onClick={() => handleExportExcel("User Growth")}
            >
              {t("reports.export_excel")}
            </button>
            <button
              className="export-btn pdf"
              onClick={() => handleExportPdf("User Growth")}
            >
              {t("reports.export_pdf")}
            </button>
          </div>
        </div>

        <div className="divider" />

        {/* Hospital Distribution by City */}
        <div className="chart-section">
          <div className="chart-top">
            <h3 className="chart-title">{t("reports.distribution")}</h3>
          </div>

          <div className="pie-wrapper">
            <div className="pie-legend">
              {cityData.map((item, i) => (
                <div key={i} className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: COLORS[i % COLORS.length] }}
                  ></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            {cityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={cityData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ value }) => `${value}`}
                    labelLine={false}
                  >
                    {cityData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p
                style={{ textAlign: "center", padding: "40px", color: "#999" }}
              >
                {t("reports.no_dist_data")}
              </p>
            )}
          </div>

          <div className="export-btns">
            <button
              className="export-btn excel"
              onClick={() => handleExportExcel("City Distribution")}
            >
              {t("reports.export_excel")}
            </button>
            <button
              className="export-btn pdf"
              onClick={() => handleExportPdf("City Distribution")}
            >
              {t("reports.export_pdf")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
