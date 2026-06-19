import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../styles/PatientRecord.css";
import { getPatientRecord } from "../services/patientRecordApi";
import { getPatientNotes, addPatientNote, updatePatientNote } from "../services/patientNotesApi";
import Loader from "../../components/Loader";
import ThemeToggle from "../../components/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle";

const initialRecord = {
  name: "", id: "", age: "", gender: "", phone: "", email: "", bloodGroup: "O+",
  chronicDiseases: [], surgeries: [], medications: [], allergies: [],
};

const normalizeDisease = (item) => {
  if (!item) return { name: "Unknown", date: "N/A" };
  if (typeof item === "string") return { name: item, date: "N/A" };
  return { name: item.name || "Unknown", date: item.date || item.dateOfDiagnosis || item.diagnosedDate || "N/A" };
};

const normalizeSurgery = (item) => {
  if (!item) return { name: "Unknown", date: "N/A", notes: "" };
  if (typeof item === "string") return { name: item, date: "N/A", notes: "" };
  return { name: item.name || "Unknown", date: item.date || item.surgeryDate || item.dateOfSurgery || "N/A", notes: item.notes || item.description || "" };
};

const normalizeMedication = (item) => {
  if (!item) return { name: "Unknown", frequency: "N/A", started: "N/A" };
  if (typeof item === "string") return { name: item, frequency: "N/A", started: "N/A" };
  return { name: item.name || "Unknown", frequency: item.frequency || item.dosage || "N/A", started: item.started || item.startDate || "N/A" };
};

const normalizeAllergy = (item) => {
  if (!item) return { name: "Unknown", reaction: "N/A" };
  if (typeof item === "string") return { name: item, reaction: "N/A" };
  return { name: item.name || "Unknown", reaction: item.reaction || item.notes || "N/A" };
};

/* ── Reusable Sidebar ── */
const Sidebar = ({ navigate }) => {
  const { t } = useTranslation();
  return (
    <aside className="pt-sidebar">
      <div className="pt-sidebar-top">
        <div className="da-logo">
          <div className="da-logo-icon">+</div>
        </div>
        <nav className="pt-nav">
          <div className="pt-nav-item" onClick={() => navigate("/doctor/appointments")}><span>{t("doctor.appointments")}</span></div>
          <div className="pt-nav-item" onClick={() => navigate("/doctor/patients")}><span>{t("doctor.patients")}</span></div>
          <div className="pt-nav-item pt-nav-active"><span>{t("doctor.patientRecord")}</span></div>
          <div className="pt-nav-item" onClick={() => navigate("/doctor/working-hours")}><span>{t("doctor.workingHours")}</span></div>
        </nav>
      </div>
      <div className="pt-logout" onClick={() => navigate("/login")}><span>{t("doctor.logout")}</span></div>
    </aside>
  );
};

const PatientRecord = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const patientIdFromState = location.state?.patientId || location.state?.patient?.patientId;
  const [patientId, setPatientId] = useState(patientIdFromState || localStorage.getItem("lastPatientId"));

  useEffect(() => {
    if (patientIdFromState) {
      setPatientId(patientIdFromState);
      localStorage.setItem("lastPatientId", patientIdFromState);
    }
  }, [patientIdFromState]);



  const [activeTab, setActiveTab] = useState("medical");
  const [record, setRecord] = useState(initialRecord);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [noteForm, setNoteForm] = useState({ date: "", diagnosis: "", treatmentPlan: "", followUp: "" });
  useEffect(() => {
    if (!patientId) { setLoading(false); return; }
    const fetchPatientRecord = async () => {
      try {
        setLoading(true);
        const data = await getPatientRecord(patientId);
        setRecord({
          name: data.fullName || "",
          id: data.patientId || "",
          age: data.age || "",
          gender: data.gender || "",
          phone: data.phoneNumber || "",
          email: data.email || "",
          bloodGroup: data.bloodGroup || data.bloodType || "O+",
          chronicDiseases: data.chronicDiseases || [],
          surgeries: data.surgeries || [],
          medications: data.medications || [],
          allergies: data.allergies || [],
        });
        localStorage.setItem("lastPatientId", patientId);
      } catch (error) {
        console.error("Error fetching patient record:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientRecord();
  }, [patientId]);

  useEffect(() => {
    if (!patientId) return;
    const fetchNotes = async () => {
      try {
        const data = await getPatientNotes(patientId);
        setNotes(data || []);
      } catch (error) { console.error(error); }
    };
    fetchNotes();
  }, [patientId]);

  const resetForm = () => {
    setNoteForm({ date: "", diagnosis: "", treatmentPlan: "", followUp: "" });
    setEditingNote(null);
    setShowAddNote(false);
  };

  const handleSaveNote = async () => {
    if (!noteForm.diagnosis || !noteForm.treatmentPlan) return;
    try {
      const payload = {
        date: noteForm.date || new Date().toISOString().split("T")[0],
        diagnosis: noteForm.diagnosis,
        treatmentPlan: noteForm.treatmentPlan,
        followUp: noteForm.followUp,
      };
      if (editingNote) {
        await updatePatientNote(editingNote, payload);
      } else {
        await addPatientNote(patientId, payload);
      }
      const updatedNotes = await getPatientNotes(patientId);
      setNotes(updatedNotes);
      resetForm();
    } catch (error) { console.error(error); }
  };

  const handleEditNote = (note) => {
    setEditingNote(note.id);
    setShowAddNote(true);
    setNoteForm({ date: note.date || "", diagnosis: note.diagnosis || "", treatmentPlan: note.treatmentPlan || "", followUp: note.followUp || "" });
  };

  if (loading) return <Loader message={t("doctor.loadingPatientRecord")} />;

  return (
    <div className="pt-page">
      <Sidebar navigate={navigate} />

      <div className="pt-main">
        <div className="pr-page">
          {/* Topbar */}
          <div className="pr-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div className="pr-topbar-left" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="pr-stethoscope-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M4.8 2.4A2.4 2.4 0 1 0 9.6 2.4a2.4 2.4 0 1 0-4.8 0Z" />
                  <path d="M14.4 2.4a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 1 0-4.8 0Z" />
                  <path d="M7.2 4.8v4.8a4.8 4.8 0 0 0 9.6 0V4.8" />
                  <path d="M12 9.6v6" />
                  <path d="M12 15.6a3.6 3.6 0 1 0 7.2 0V12" />
                </svg>
              </div>
              <div>
                <div className="pr-topbar-title">{t("doctor.patientRecord")}</div>
                <div className="pr-topbar-sub">Dr. Sarah Mitchell</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Subheader */}
          <div className="pr-subheader-bar">
            <button className="pr-sub-details-btn" onClick={() => navigate("/doctor/patients")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
                <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
              </svg>
              {t("doctor.patientDetails")}
            </button>
          </div>

          <div className="pr-body">
            {/* Patient Info Card */}
            <div className="pr-info-card">
              <div className="pr-info-top">
                <div>
                  <h2 className="pr-patient-name">{record.name}</h2>
                  <div className="pr-patient-id">{t("doctor.patientId")}: {record.id}</div>
                </div>
                <div className="pr-blood-badge">{record.bloodGroup}</div>
              </div>
              <div className="pr-info-row">
                <div className="pr-info-field">
                  <div className="pr-field-label">{t("doctor.age")}</div>
                  <div className="pr-field-value">{record.age}</div>
                </div>
                <div className="pr-info-field">
                  <div className="pr-field-label">{t("doctor.gender")}</div>
                  <div className="pr-field-value">{record.gender === "Male" || record.gender === "ذكر" ? t("doctor.male") : record.gender === "Female" || record.gender === "أنثى" ? t("doctor.female") : record.gender}</div>
                </div>
                <div className="pr-info-field">
                  <div className="pr-field-label">{t("doctor.phone")}</div>
                  <div className="pr-field-value">{record.phone}</div>
                </div>
                <div className="pr-info-field">
                  <div className="pr-field-label">{t("doctor.email")}</div>
                  <div className="pr-field-value">{record.email}</div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="pr-stats-row">
              <div className="pr-stat-card">
                <div className="pr-stat-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" width="15" height="15" className="pr-stat-svg-red"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                  <span className="pr-stat-title">{t("doctor.chronicDiseases")}</span>
                </div>
                <div className="pr-stat-num">{record.chronicDiseases.length}</div>
              </div>
              <div className="pr-stat-card">
                <div className="pr-stat-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" width="15" height="15" className="pr-stat-svg-blue"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <span className="pr-stat-title">{t("doctor.surgeries")}</span>
                </div>
                <div className="pr-stat-num">{record.surgeries.length}</div>
              </div>
              <div className="pr-stat-card">
                <div className="pr-stat-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" width="15" height="15" className="pr-stat-svg-green">
                    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
                    <line x1="10" y1="3" x2="10" y2="21" /><line x1="14" y1="3" x2="14" y2="21" />
                  </svg>
                  <span className="pr-stat-title">{t("doctor.medications")}</span>
                </div>
                <div className="pr-stat-num">{record.medications.length}</div>
              </div>
              <div className="pr-stat-card">
                <div className="pr-stat-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" width="15" height="15" className="pr-stat-svg-orange">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="pr-stat-title">{t("doctor.allergies")}</span>
                </div>
                <div className="pr-stat-num">{record.allergies.length}</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="pr-tabs-row">
              <button className={`pr-tab-btn ${activeTab === "medical" ? "pr-tab-active" : ""}`} onClick={() => setActiveTab("medical")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                {t("doctor.medicalHistory")}
              </button>
              <button className={`pr-tab-btn ${activeTab === "notes" ? "pr-tab-active" : ""}`} onClick={() => setActiveTab("notes")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                {t("doctor.notes")} ({notes.length})
              </button>
            </div>

            {/* Medical Tab */}
            {activeTab === "medical" && (
              <div className="pr-section-list">
                <div className="pr-section-card">
                  <div className="pr-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" className="pr-title-icon pr-stat-svg-red"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                    {t("doctor.chronicDiseases")}
                  </div>
                  {record.chronicDiseases.map((item, i) => {
                    const d = normalizeDisease(item);
                    return (
                      <div key={i} className="pr-entry">
                        <div className="pr-entry-name">{d.name}</div>
                        <div className="pr-entry-sub">{t("doctor.diagnosed")}: {d.date}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="pr-section-card">
                  <div className="pr-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" className="pr-title-icon pr-stat-svg-blue"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    {t("doctor.surgeries")}
                  </div>
                  {record.surgeries.map((item, i) => {
                    const s = normalizeSurgery(item);
                    return (
                      <div key={i} className="pr-entry">
                        <div className="pr-entry-name">{s.name}</div>
                        <div className="pr-entry-sub">{t("doctor.date")}: {s.date}</div>
                        {s.notes && <div className="pr-entry-notes">{t("doctor.notes")}: {s.notes}</div>}
                      </div>
                    );
                  })}
                </div>

                <div className="pr-section-card">
                  <div className="pr-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" className="pr-title-icon pr-stat-svg-green">
                      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
                      <line x1="10" y1="3" x2="10" y2="21" /><line x1="14" y1="3" x2="14" y2="21" />
                    </svg>
                    {t("doctor.medications")}
                  </div>
                  {record.medications.map((item, i) => {
                    const m = normalizeMedication(item);
                    return (
                      <div key={i} className="pr-entry">
                        <div className="pr-entry-name">{m.name}</div>
                        <div className="pr-entry-sub">{t("doctor.frequency")}: {m.frequency}</div>
                        <div className="pr-entry-sub">{t("doctor.started")}: {m.started}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="pr-section-card">
                  <div className="pr-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" className="pr-title-icon pr-stat-svg-orange">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {t("doctor.allergies")}
                  </div>
                  {record.allergies.map((item, i) => {
                    const a = normalizeAllergy(item);
                    return (
                      <div key={i} className="pr-entry">
                        <div className="pr-entry-name">{a.name}</div>
                        <div className="pr-entry-sub">{t("doctor.reaction")}: {a.reaction}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === "notes" && (
              <div className="pr-notes-section">
                {!showAddNote && (
                  <button className="pr-add-note-btn" onClick={() => setShowAddNote(true)}>{t("doctor.addNewNote")}</button>
                )}
                {showAddNote && (
                  <div className="pr-add-note-form">
                    <input type="date" className="pr-form-input" value={noteForm.date}
                      onChange={(e) => setNoteForm(prev => ({ ...prev, date: e.target.value }))} />
                    <textarea className="pr-form-textarea" placeholder={t("doctor.diagnosis")} value={noteForm.diagnosis}
                      onChange={(e) => setNoteForm(prev => ({ ...prev, diagnosis: e.target.value }))} />
                    <textarea className="pr-form-textarea" placeholder={t("doctor.treatmentPlan")} value={noteForm.treatmentPlan}
                      onChange={(e) => setNoteForm(prev => ({ ...prev, treatmentPlan: e.target.value }))} />
                    <input type="text" className="pr-form-input" placeholder={t("doctor.followUp")} value={noteForm.followUp}
                      onChange={(e) => setNoteForm(prev => ({ ...prev, followUp: e.target.value }))} />
                    <div className="pr-note-form-actions">
                      <button className="pr-save-note-btn" onClick={handleSaveNote}>{t("doctor.saveNote")}</button>
                      <button className="pr-clear-btn" onClick={resetForm}>{t("doctor.cancel")}</button>
                    </div>
                  </div>
                )}
                {notes.map((note) => (
                  <div key={note.id} className="pr-note-card">
                    <div className="pr-note-card-header">
                      <div className="pr-note-date">{note.date}</div>
                      <button className="pr-note-edit-btn" onClick={() => handleEditNote(note)}>{t("doctor.edit")}</button>
                    </div>
                    <div className="pr-note-field-label">{t("doctor.diagnosis")}</div>
                    <div className="pr-note-field-value">{note.diagnosis}</div>
                    <div className="pr-note-field-label">{t("doctor.treatmentPlan")}</div>
                    <div className="pr-note-field-value">{note.treatmentPlan}</div>
                    <div className="pr-note-field-label">{t("doctor.followUp")}</div>
                    <div className="pr-note-field-value">{note.followUp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;