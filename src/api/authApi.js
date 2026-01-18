// src/api/authApi.js
import axiosInstance from "./axiosInstance";

/**
 * Register a new user
 * userData = { name, email, password }
 */
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

/**
 * Login user
 * loginData = { email, password }
 */
export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
