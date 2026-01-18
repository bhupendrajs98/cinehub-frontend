import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (user.email !== import.meta.env.VITE_ADMIN_EMAIL) return <Navigate to="/" />;

  return children;
};

export default PrivateAdminRoute;
