import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../modules/auth/components/Login";
import Menu from "../modules/pages/menu/Menu";
import PrivateRoute from "./PrivateRoute";
import Register from "../modules/auth/components/Register";
import ForgotPassword from "../modules/auth/components/ForgotPassword";
import ResetPassword from "../modules/auth/components/ResetPassword";
import ConfirmEmail from "../modules/auth/components/ConfirmEmail";
import RedirectAuthenticated from "./RedirectAuthenticated";

const Routers = () => {
  return (
    <>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/menu/:store" element={<Menu />} />

        {/* Rotas de autenticação */}

        <Route
          path="/login"
          element={
            <RedirectAuthenticated>
              <Login />
            </RedirectAuthenticated>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectAuthenticated>
              <Register />
            </RedirectAuthenticated>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticated>
              <ForgotPassword />
            </RedirectAuthenticated>
          }
        />
        <Route
          path="/reset-password"
          element={
            <RedirectAuthenticated>
              <ResetPassword />
            </RedirectAuthenticated>
          }
        />
        <Route
          path="/confirm-email"
          element={
            <RedirectAuthenticated>
              <ConfirmEmail />
            </RedirectAuthenticated>
          }
        />

        {/* Rotas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default Routers;
