import axiosInstance from "../../api/axiosInstance";

// Get Upcoming Appointments
export const getUpcomingAppointments = async (
  date,
  view = "day",
  page = 1
) => {
  try {
    const response = await axiosInstance.get(
      "/doctor/appointments/upcoming",
      {
        params: {
          date,
          view: view.toLowerCase(),
          page,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "API ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};


