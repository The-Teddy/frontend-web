import React, { useContext } from "react";
import "./SideBar.scss"; // Para a estilização do menu
import { NavLink } from "react-router-dom";
import { Context } from "../../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faChevronRight,
  faExchangeAlt,
  faHouse,
  faBuilding,
  faConciergeBell,
} from "@fortawesome/free-solid-svg-icons";

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
          <>
            <NavLink
              to={"/categorias"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FontAwesomeIcon icon={faList} /> <span>Categorias</span>{" "}
              <FontAwesomeIcon icon={faChevronRight} />{" "}
            </NavLink>
            <NavLink
              to={"/requisicoes"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FontAwesomeIcon icon={faExchangeAlt} /> <span>Requisições</span>{" "}
              <FontAwesomeIcon icon={faChevronRight} />{" "}
            </NavLink>
          </>
        ) : null}
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <FontAwesomeIcon icon={faHouse} /> <span>Home</span>{" "}
          <FontAwesomeIcon icon={faChevronRight} />
        </NavLink>
        {user?.role !== "super-admin" &&
        user?.role !== "admin" &&
        user?.role !== "support" ? (
          <NavLink
            to={"/empresa"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FontAwesomeIcon icon={faBuilding} /> <span>Empresa</span>{" "}
            <FontAwesomeIcon icon={faChevronRight} />{" "}
          </NavLink>
        ) : null}
        <NavLink
          to={"/servicos"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <FontAwesomeIcon icon={faConciergeBell} /> <span>Serviços</span>{" "}
          <FontAwesomeIcon icon={faChevronRight} />{" "}
        </NavLink>
      </div>
    </aside>
  );
};

export default SideBar;
