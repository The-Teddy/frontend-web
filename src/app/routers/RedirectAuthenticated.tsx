import React, { useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
const RedirectAuthenticated = ({ children }: Props): React.ReactNode => {
  const [auth, setAuth] = useState<boolean>(false);
  return auth ? <Navigate to="/" /> : <>{children}</>;
};

export default RedirectAuthenticated;
