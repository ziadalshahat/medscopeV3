import axiosInstance from "../../api/axiosInstance";

// ✅ GET new
export const getNewAppointments = () => {
  return axiosInstance.get("/admin/appointments/new");
};

// ✅ GET completed
export const getCompletedAppointments = () => {
  return axiosInstance.get("/admin/appointments/completed");
};

// ✅ POST create new appointment
export const createAppointment = (data) => {
  return axiosInstance.post("/admin/appointments", data);
};

// ✅ PUT cancel
export const cancelAppointment = (id) => {
  return axiosInstance.put(`/admin/appointments/${id}/cancel`);
};

// ✅ PUT reschedule
export const rescheduleAppointment = (id, data) => {
  return axiosInstance.put(`/admin/appointments/${id}/reschedule`, data);
};

// ✅ PUT complete
export const completeAppointment = (id) => {
  return axiosInstance.put(`/admin/appointments/${id}/complete`);
};

// ✅ GET by id
export const getAppointmentById = (id) => {
  return axiosInstance.get(`/admin/appointments/${id}`);
};