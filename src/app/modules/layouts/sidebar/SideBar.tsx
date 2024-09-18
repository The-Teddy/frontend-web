import React, { useContext } from "react";
import "./SideBar.scss"; // Para a estilização do menu
import { NavLink } from "react-router-dom";
import { Context } from "../../auth/AuthContext";

const SideBar: React.FC = () => {
  const { user, token } = useContext(Context);
  return (
    <aside id="side-bar" className="dont-close">
      <div className="side-bar-top">Olá, {user?.name}</div>
      <div className="side-bar-content">
        {(token?.length > 200 &&
          user !== null &&
          user !== undefined &&
          user.role.includes("super-admin")) ||
        user?.role.includes("admin") ? (
          <NavLink
            to={"/categoria"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <i className="fa-solid fa-list"></i> <span>Categoria</span>{" "}
            <i className="fa-solid fa-chevron-right"></i>{" "}
          </NavLink>
        ) : null}
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="fa-solid fa-house"></i> <span>Home</span>{" "}
          <i className="fa-solid fa-chevron-right"></i>
        </NavLink>
        <NavLink
          to={"/empresa"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="fa-solid fa-building"></i> <span>Empresa</span>{" "}
          <i className="fa-solid fa-chevron-right"></i>{" "}
        </NavLink>
      </div>
    </aside>
  );
};

export default SideBar;
