import { useContext, useEffect, useState } from "react";
import { Context } from "../../auth/AuthContext";
import "./Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import InputMask from "react-input-mask";
import DefaultSaveButton from "../../partials/buttons/DefaultSaveButton";
import {
  convertDateToISO,
  handleConvertDate,
  handleIsValidDate,
} from "../../helpers/utils";
import { updateDataUser } from "../../helpers/api";
import { updateDataUserInterface } from "../../auth/user.interface";
import { toast } from "react-toastify";
import ConfirmModal from "../../partials/modals/confirm-modal/ConfirmModal";

const Profile = () => {
  const { user, token, handleGetUser } = useContext(Context);
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [openconfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  function handleSaveData() {
    const data: updateDataUserInterface = {
      name,
      birthDate: convertDateToISO(birthDate),
    };
    setLoadingButton(true);
    updateDataUser(data, token)
      .then((res) => {
        handleGetUser();
        toast.success("Dados atualizados com sucesso");
        setOpenConfirmModal(false);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (Array.isArray(error.response.data.message)) {
            toast.error(error.response.data.message.join(" "));
          } else if (typeof error.response.data.message === "string") {
            toast.error(error.response.data.message);
          } else {
            toast.error("Ocorreu um erro inesperado.");
          }
        }
      })
      .finally(() => {
        setLoadingButton(false);
      });
  }
  function handleValidateData() {
    if (name.length < 3) {
      return toast.warning("Insira o seu nome!");
    }
    if (!handleIsValidDate(birthDate)) {
      return toast.warning("Insira uma data válida");
    }
    if (convertDateToISO(birthDate)) {
      if (
        user?.birthDate.toString() === convertDateToISO(birthDate) &&
        user?.name.trim() === name.trim()
      ) {
        return toast.warning("Não houve alterações nos dados");
      }
    }

    setOpenConfirmModal(true);
  }
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBirthDate(handleConvertDate(user.birthDate));
    }
  }, [user]);

  return (
    <div id="profile">
      <div className="background-default first-section">
        <div>
          <img src="/images/blank.png" alt="" />
        </div>
        <div>
          <p className="name">{user?.name}</p>
          <p className="role-and-email">
            <span className="role">
              <FontAwesomeIcon icon={faUser} />
              {user?.role}
            </span>
            <span className="email">
              <FontAwesomeIcon icon={faEnvelope} />
              {user?.email}
            </span>
          </p>
        </div>
      </div>
      <div className="background-default" style={{ marginTop: 30 }}>
        <div className="info-user">
          <p className="sub-title">Detalhes do Usuário</p>
          <label htmlFor="" className="w-100 text-start">
            <span className="required">Nome:</span>{" "}
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="" className="w-100 text-start mt-3">
            <span className="required">Data de Nascimento:</span>{" "}
            <InputMask
              mask="99/99/9999"
              type="text"
              className="form-control form-control-solid fs-6"
              placeholder="DD/MM/YYYY"
              name="birthday"
              onChange={(e) => setBirthDate(e.target.value)}
              value={birthDate}
            />
          </label>
          <DefaultSaveButton
            title="Salvar"
            handleSubmit={() => handleValidateData()}
          />
        </div>

        <div className="info-user" style={{ marginTop: 30 }}>
          <label htmlFor="" className="w-100 text-start">
            <span className="required">E-mail:</span>{" "}
            <input
              type="text"
              className="form-control"
              placeholder="marciosantos@gmail.com"
              value={email}
              readOnly
              disabled
            />
          </label>
          <DefaultSaveButton title="Editar E-mail" handleSubmit={() => []} />
        </div>
        <div className="info-user" style={{ marginTop: 30 }}>
          <label className="w-100 text-start">
            <span>Senha:</span>
          </label>
          <DefaultSaveButton title="Editar Senha" handleSubmit={() => []} />
        </div>
        <div className="info-user" style={{ marginTop: 30 }}>
          <label className="w-100 text-start">
            <span>Conta:</span>
          </label>
          <button className="back w-100 mt-2" style={{ height: 40 }}>
            Deletar Conta
          </button>
        </div>
      </div>
      <ConfirmModal
        loading={loadingButton}
        title="Confirmar alteração do Nome e Data de Nascimento?"
        view={openconfirmModal}
        setView={() => setOpenConfirmModal(false)}
        handleSubmit={handleSaveData}
      />
    </div>
  );
};

export default Profile;