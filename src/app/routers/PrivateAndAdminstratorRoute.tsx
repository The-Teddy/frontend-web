import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../modules/auth/AuthContext";
import SideBar from "../modules/layouts/sidebar/SideBar";
import Topbar from "../modules/layouts/topbar/Topbar";
import { Load } from "../modules/partials/Spinner";

interface Props {
  children: React.ReactNode;
}

const PrivateAndAdminstratorRoute = ({ children }: Props): React.ReactNode => {
  const { token, user } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token && user) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [token, user]);

  if (loading) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Load />
      </div>
    );
  }

  return (token?.length > 200 &&
    user !== null &&
    user !== undefined &&
    user.role.includes("super-admin")) ||
    user?.role.includes("admin") ? (
    <>
      <Topbar />
      <SideBar />
      <div id="app-content">{children}</div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default PrivateAndAdminstratorRoute;
