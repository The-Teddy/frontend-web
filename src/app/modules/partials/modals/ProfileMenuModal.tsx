import React, { useContext } from "react";
import { Box, Modal } from "@mui/material";
import "./Modals.scss";
import { Context } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

interface ProfimeMenuModalInterface {
  open: boolean;
  setViewModal: () => void;
}

const ProfileMenuModal: React.FC<ProfimeMenuModalInterface> = ({
  ...props
}) => {
  const { user, handleLogout } = useContext(Context);
  return (
    <>
      {props.open ? (
        <div id="profile-menu-modal">
          <div className="modal-content">
            <p className="fw-bolder fs-6 ">{user?.name}</p>
            <p
              className="fw-bold profile-email"
              style={{ fontSize: 11, marginTop: "-10px" }}
            >
              {user?.email}
            </p>
            <div className="box-role">
              <p>{user?.role}</p>
            </div>
            <Link to="/perfil" className="profile-button">
              Perfil
            </Link>
            <button
              onClick={() => handleLogout(false)}
              className="profile-button"
            >
              Sair
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProfileMenuModal;
