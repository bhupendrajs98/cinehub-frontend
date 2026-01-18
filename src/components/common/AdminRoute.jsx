// src/components/common/AdminRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");       // login check
  const role = localStorage.getItem("role");         // role check

  if (!token) {
    // Login nahi hai → login page
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    // Login hai par admin nahi → home page
    return <Navigate to="/" replace />;
  }

  // Admin hai → child routes render karo
  return <Outlet />;
};

export default AdminRoute;
