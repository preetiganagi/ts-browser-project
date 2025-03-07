import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Update if necessary

// Save token to localStorage
const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

// Register user
export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

// Login user
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    removeToken();
    window.location.href = "/"
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

// Fetch current user details
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

