import React, { useContext, useEffect, useState } from "react";
import "./ChangeEmailModal.scss";
import { Modal, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import DefaultSaveButton from "../../buttons/DefaultSaveButton";
import {
  sendCodeEmail,
  sendCodeToChangeEmail,
  updateEmailUser,
} from "../../../helpers/api";
import {
  handleError,
  handleIsNumber,
  handleValidateEmail,
  handleValidateEmailCode,
} from "../../../helpers/utils";
import { toast } from "react-toastify";
import { Context } from "../../../auth/AuthContext";
import { UpdateEmaiUserInterface } from "../../../auth/user.interface";

interface ChangeEmailModalInterface {
  view: boolean;
  setView: () => void;
  oldEmail: string;
}

const ChangeEmailModal: React.FC<ChangeEmailModalInterface> = ({
  ...props
}) => {
  const [newEmail, setNewEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { token, handleLogout, user } = useContext(Context);
  const [hasCode, setHasCode] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  function handleSendEmailCode() {
    setLoading(true);

    sendCodeToChangeEmail(newEmail, token)
      .then((res) => {
        if (res.status === 202) {
          toast.warning(res.data.message);
          props.setView();
        } else {
          setHasCode(true);
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleChangeEmail() {
    const data: UpdateEmaiUserInterface = {
      email: newEmail,
      codeEmail: emailCode,
      password,
    };
    setLoading(true);
    updateEmailUser(data, token)
      .then((res) => {
        console.log("retorno: ", res);
        if (res.status === 202) {
          toast.warning(res.data.message);
          setNewEmail("");
          setPassword("");
          setEmailCode("");
          props.setView();
        } else {
          toast.success(res.data.message);
        }

        if (res.status === 201) {
          setNewEmail("");
          setPassword("");
          setEmailCode("");
          props.setView();
          handleLogout(true);
        }
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleValidateData() {
    if (newEmail.toLowerCase() === user?.email) {
      return toast.warning("O email fornecido deve ser diferente do atual");
    }
    if (!handleValidateEmail(newEmail)) {
      return toast.warning("O e-mail fornecido não é válido.");
    }

    if (hasCode) {
      const validateEmail = handleValidateEmailCode(emailCode);
      if (!validateEmail.isValid) {
        return toast.warning(validateEmail.message);
      }

      handleChangeEmail();
    } else {
      handleSendEmailCode();
    }
  }
  useEffect(() => {
    setHasCode(false);
    setNewEmail("");
  }, [props.view]);

  return (
    <Modal open={props.view} id="change-email-modal">
      <Box className="modal-content">
        <p className="title">
          <span>Alteração de E-mail</span>{" "}
          <FontAwesomeIcon onClick={props.setView} icon={faXmark} />
        </p>
        <div className="box-content">
          <label htmlFor="" className="w-100 text-start">
            E-mail antigo:
            <input
              type="text"
              className="form-control"
              value={props.oldEmail}
              disabled
              readOnly
            />
          </label>
          <label htmlFor="" className="w-100 text-start">
            <span className="required">E-mail novo:</span>
            <input
              type="text"
              className="form-control"
              placeholder="exemplo: marciosantos@gmail.com"
              value={newEmail}
              id={`email-${Math.random().toString(36).substring(7)}`}
              name={`email-${Math.random().toString(36).substring(7)}`}
              autoComplete="new-email"
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleValidateData() : "")}
            />
          </label>
          {hasCode ? (
            <>
              <label htmlFor="" className="w-100 text-start">
                <span className="required">Senha:</span>
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
              <label htmlFor="" className="w-100 text-start">
                <span className="required">Código de verificação:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="exemplo: 528931"
                  value={emailCode ? emailCode : ""}
                  onChange={(event: any) => [
                    setEmailCode(handleIsNumber(event.target.value)),
                  ]}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? handleValidateData() : ""
                  }
                  autoCapitalize="none"
                  maxLength={6}
                />
              </label>
            </>
          ) : null}
          <DefaultSaveButton
            loading={loading}
            title={hasCode ? "Salvar" : "Enviar Código"}
            handleSubmit={handleValidateData}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default ChangeEmailModal;
