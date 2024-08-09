import React, { ReactNode, useState } from "react";
import { Navigate, redirect, Route, Routes } from "react-router-dom";
import Menu from "../modules/pages/menu/Menu";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props): React.ReactNode => {
  const [auth, setAuth] = useState<boolean>(false);
  return auth ? <>{children}</> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
