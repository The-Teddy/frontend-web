import React from "react";
import "./ConfirmModal.scss";
import { Box, Modal } from "@mui/material";

interface ConfirmModalInterface {
  view: boolean;
  message?: string;
  title: string;
  setView: () => void;
  handleSubmit: () => void;
}

const ConfirmModal: React.FC<ConfirmModalInterface> = ({ ...props }) => {
  return (
    <Modal open={props.view} id="confirm-modal">
      <Box className="modal-content">
        <p className="title">{props.title}</p>
        <p className="message">{props.message}</p>
        <div className="box-button">
          <button className="back" onClick={props.setView}>
            Cancelar
          </button>
          <button className="save" onClick={props.handleSubmit}>
            Confirmar
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
