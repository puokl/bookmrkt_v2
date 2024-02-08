import axios from "axios";
import { LoginType, RegisterType } from "../../types/authServiceType";
import * as tokenService from "../../utils/tokenService";

const headers = tokenService.setAuthHeaders();

// Register
const registerUser = async (userData: RegisterType) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/api/users`,
    userData,
    { headers }
  );

  if (response.data) {
    sessionStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

// Login
const login = async (userData: LoginType) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/api/sessions`,
    userData,
    { headers }
  );
  if (response.data) {
    sessionStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

// Fetch User Data
const fetchUserData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/api/me`,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.log("Error fetching user data", error);
    throw error;
  }
};

// Logout
const logout = async () => {
  try {
    await axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/sessions`, {
      headers,
    });
    localStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
  } catch (error) {
    console.log(error);
  }
};

// Update Profile
const updateProfile = async (avatar: { image: string }, userId: string) => {
  const data = { image: avatar.image };
  const response = await axios.put(
    `${process.env.REACT_APP_ENDPOINT}/api/users/${userId}`,
    data,
    { headers }
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const authService = {
  registerUser,
  logout,
  login,
  updateProfile,
  fetchUserData,
};

export default authService;
