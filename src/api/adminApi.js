// src/api/adminApi.js
import axiosInstance from "./axiosInstance";

/**
 * Get admin dashboard stats
 */
export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/admin/dashboard");
  return response.data;
};

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

/**
 * Delete a user (Admin only)
 * userId = string
 */
export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/admin/users/${userId}`);
  return response.data;
};
