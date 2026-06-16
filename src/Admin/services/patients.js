import axiosInstance from "../../api/axiosInstance";

// 🔥 get all patients (with filters)
export const getPatients = (params) => {
  return axiosInstance.get("/admin/patients", { params });
};

// get by id (لو احتجته بعدين)
export const getPatientById = (id) => {
  return axiosInstance.get(`/admin/patients/${id}`);
};

// delete
export const deletePatient = (id) => {
  return axiosInstance.delete(`/admin/patients/${id}`);
};
// 📊 patients chart
export const getPatientsChart = (params) => {
  return axiosInstance.get("/admin/patients-chart", { params });
};