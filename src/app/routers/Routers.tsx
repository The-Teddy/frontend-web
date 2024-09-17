import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../modules/auth/Login";
import Menu from "../modules/pages/menu/Menu";
import PrivateRoute from "./PrivateRoute";
import Register from "../modules/auth/Register";
import ForgotPassword from "../modules/auth/ForgotPassword";
import ResetPassword from "../modules/auth/ResetPassword";
import ConfirmEmail from "../modules/auth/ConfirmEmail";
import RedirectAuthenticated from "./RedirectAuthenticated";
import Home from "../modules/pages/home/Home";
import Company from "../modules/pages/company/Company";
import Category from "../modules/pages/category/Category";
import CreateCategory from "../modules/pages/category/CreateCategory";
import CategoryDetail from "../modules/pages/category/CategoryDetail";

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
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/empresa"
          element={
            <PrivateRoute>
              <Company />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/categoria"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/categoria/criar"
          element={
            <PrivateRoute>
              <CreateCategory />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/categoria/detalhes"
          element={
            <PrivateRoute>
              <CategoryDetail />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default Routers;
