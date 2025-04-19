import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importing useSelector to get state from Redux

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Use the Redux store to get the user's authentication state
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not allowed, redirect to login (or another page)
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated and has the correct role, render the children
  return children;
};

export default ProtectedRoute;
