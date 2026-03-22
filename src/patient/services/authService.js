import axiosInstance from '../../api/axiosInstance';

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/Auth/Login', { email, password });
  return response.data;
};

export const signupUser = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  phone,
  gender,
  dob
) => {
  const response = await axiosInstance.post('/Auth/Register', {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phoneNumber: phone,
    gender,
    dateOfBirth: dob
  });
  return response.data;
};