import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuth, user, children }) => {
  const location = useLocation();

  // If the user is not authenticated and tries to access other pages, navigate to login/register
  if (
    !isAuth &&
    !(
      location?.pathname?.includes("/login") ||
      location?.pathname?.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated, redirect based on their role
  if (
    isAuth &&
    (location?.pathname?.includes("/login") ||
      location?.pathname?.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // If the user is authenticated but not an admin, redirect from admin pages
  if (
    isAuth &&
    user?.role !== "admin" &&
    location?.pathname?.includes("/admin")
  ) {
    return <Navigate to="/unauth" />;
  }

  // If the user is an admin, redirect from shop pages
  if (
    isAuth &&
    user?.role === "admin" &&
    location?.pathname?.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <div>{children}</div>;
};

export default CheckAuth;
