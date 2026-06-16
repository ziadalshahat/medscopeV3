import apiClient from "../../api/axiosInstance";
// GET ALL
export const getBeds = async () => {
  const res = await apiClient.get("/BedManagement");
  return res.data.map(item => ({
    id: item.id,
    ward: item.name,
    totalBeds: Number(item.totalBeds),
    availableBeds: Number(item.availableBeds),
    usedBeds:
      Number(item.totalBeds) - Number(item.availableBeds)
  }));
};
// increase
export const increaseBed = (id) => {
  return apiClient.put(`/BedManagement/${id}/increase`);
};
// decrease
export const decreaseBed = (id) => {
  return apiClient.put(`/BedManagement/${id}/decrease`);
};