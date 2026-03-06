// services/authService.js

// استخدم رابط الـ backend الفعلي
const BASE_URL = "https://med-scope1.runasp.net";

const LOGIN_URL = `${BASE_URL}/api/Auth/Login`;
const SIGNUP_URL = `${BASE_URL}/api/Auth/Register`;

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};

// Signup function
export const signupUser = async (firstName, lastName, email, password, confirmPassword, phone, gender, dob) => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber: phone,
        gender,
        dateOfBirth: dob,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error("Error in signupUser:", error);
    throw error;
  }
};