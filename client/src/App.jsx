// import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-veiw/AdminLayout";
import Dashboard from "./pages/admin-view/Dashboard";
import Products from "./pages/admin-view/Products";
import Orders from "./pages/admin-view/Orders";
import Features from "./pages/admin-view/Features";
import ShoppingLayout from "./components/shopping-veiw/ShoppingLayout";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/shopping-veiw/home";
import ProductsListing from "./pages/shopping-veiw/ProductsListing";
import Checkout from "./pages/shopping-veiw/checkout";
import Account from "./pages/shopping-veiw/Account";
import CheckAuth from "./components/common/CheckAuth";
import UnAuth from "./pages/UnAuth/UnAuth";
import { useSelector } from "react-redux";

const App = () => {
  // using redux to fetch our user and authentication details
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="features" element={<Features />}></Route>
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />}></Route>
          <Route path="products" element={<ProductsListing />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="account" element={<Account />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/unauth" element={<UnAuth />}></Route>
      </Routes>
    </div>
  );
};

export default App;
