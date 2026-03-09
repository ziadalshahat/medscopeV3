const BASE_URL = "https://med-scope1.runasp.net/api/Auth";

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
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

  const response = await fetch(`${BASE_URL}/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber: phone,
      gender,
      dateOfBirth: dob
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};