import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is logged in or the role doesn't match, redirect to login
  if (!user || user.role !== role) {
    return <Navigate to="/login" />;
  }

  // Render the child component if the role matches
  return children;
};

export default ProtectedRoute;
