import React, { useContext, useState } from "react";
import "./ChangePasswordModal.scss";
import { Box, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import DefaultSaveButton from "../../buttons/DefaultSaveButton";
import { handleError, handleValidatePassword } from "../../../helpers/utils";
import { toast } from "react-toastify";
import { updatePasswordUser } from "../../../helpers/api";
import { UpdatePasswordUserInterface } from "../../../auth/user.interface";
import { Context } from "../../../auth/AuthContext";
import ConfirmModal from "../confirm-modal/ConfirmModal";

interface ChangePasswordModalInterface {
  view: boolean;
  setView: () => void;
}
const ChangePasswordModal: React.FC<ChangePasswordModalInterface> = ({
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useContext(Context);
  const [viewConfirmModal, setViewConfirmModal] = useState<boolean>(false);

  function handleCloseModal(event: any) {
    const className = event.target.className;

    if (
      typeof className === "string" &&
      className.includes("MuiBackdrop-root")
    ) {
      props.setView();
    }
  }

  function handleValidateData() {
    if (!handleValidatePassword(password)) {
      return toast.warning("Insira uma senha válida");
    }
    if (!handleValidatePassword(newPassword)) {
      return toast.warning(
        "A Nova senha precisa ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula e 1 caractere especial!"
      );
    }

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      return toast.warning("Senha e confirmar senha não coincidem!");
    }
    if (newPassword.trim() === password.trim()) {
      return toast.warning("A nova senha deve ser diferente da senha atual");
    }
    setViewConfirmModal(true);
  }

  function handleChangePassword() {
    const data: UpdatePasswordUserInterface = {
      password,
      newPassword,
    };

    setLoading(true);
    updatePasswordUser(data, token)
      .then((res) => {
        console.log(res);
        toast.success("Senha atualizada com sucesso!");
        setViewConfirmModal(false);
        props.setView();

        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error) => {
        console.error(error);
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <Modal
        open={props.view}
        id="change-password-modal"
        onKeyDown={(e) => (e.key === "Escape" ? props.setView() : "")}
        onClick={(e) => handleCloseModal(e)}
      >
        <Box className="modal-content">
          <p className="title">
            <span>Alteração de Senha</span>{" "}
            <FontAwesomeIcon onClick={props.setView} icon={faXmark} />
          </p>
          <label htmlFor="" className="w-100 text-start">
            <span className="required">Senha atual:</span>
            <div className="input-box">
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                name="foo"
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleValidateData() : ""
                }
              />

              {showPassword ? (
                <FontAwesomeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  icon={faEye}
                />
              )}
            </div>
          </label>
          <label htmlFor="" className="w-100 text-start mt-3">
            <span className="required">Nova Senha:</span>
            <div className="input-box">
              <input
                className="form-control"
                type={showNewPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={newPassword}
                name="foo"
                autoComplete="new-password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleValidateData() : ""
                }
              />

              {showNewPassword ? (
                <FontAwesomeIcon
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  icon={faEye}
                />
              )}
            </div>
          </label>
          <label htmlFor="" className="w-100 text-start mt-3">
            <span className="required">Confirmar Nova Senha:</span>
            <div className="input-box">
              <input
                className="form-control"
                type={showNewPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={confirmNewPassword}
                name="foo"
                autoComplete="new-password"
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleValidateData() : ""
                }
              />

              {showNewPassword ? (
                <FontAwesomeIcon
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  icon={faEye}
                />
              )}
            </div>
          </label>

          <DefaultSaveButton title="Salvar" handleSubmit={handleValidateData} />
        </Box>
      </Modal>
      <ConfirmModal
        view={viewConfirmModal}
        title="Confirmar Alteração da senha?"
        loading={loading}
        handleSubmit={handleChangePassword}
        setView={() => setViewConfirmModal(false)}
      />
    </>
  );
};

export default ChangePasswordModal;
