import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../modules/auth/AuthContext";

interface Props {
  children: React.ReactNode;
}
const RedirectAuthenticated = ({ children }: Props): React.ReactNode => {
  const { token, user } = useContext(Context);
  return token?.length > 200 && user !== null && user !== undefined ? (
    <Navigate to="/" />
  ) : (
    <>{children}</>
  );
};

export default RedirectAuthenticated;
