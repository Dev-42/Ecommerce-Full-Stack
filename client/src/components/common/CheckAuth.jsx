// import React from 'react'
// this component will receive props that whether the user is authenticated or not
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuth, user, children }) => {
  const location = useLocation();

  //   if the user is not authenticated and if he tries to access other pages then he will be Navigated automatically to login and register page

  if (
    !isAuth &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  //   if the user is authenticated then depending upon his role we gonna display admin dashboard for admins and shopping page for normal customers
  if (
    isAuth &&
    location.pathname.includes("/login") &&
    location.pathname.includes("/register")
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="shop/home" />;
    }
  }

  //   If the user is authenticated and suppose the user is a customer and tries to access an admin page then he will be redirected to the un-auth page

  if (
    isAuth &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/Unauth-page" />;
  }

  //   If the user is authenticated and suppose he is an admin and tries to access a shop page we will navigate him to admin dashboard page
  if (isAuth && user?.role === "admin" && location.path.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <div>{children}</div>;
};

export default CheckAuth;
