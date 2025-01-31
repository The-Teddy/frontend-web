import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../helpers/api";
import { toast } from "react-toastify";
import DefaultSaveButton from "../partials/buttons/DefaultSaveButton";
import {
  handleError,
  handleValidateEmail,
  handleValidatePassword,
} from "../helpers/utils";

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleCreateUser() {
    if (name.length < 3) {
      return toast.warning("Insira o seu nome!");
    }
    if (!handleValidateEmail(email)) {
      return toast.warning("Insira um email válido!");
    }
    if (!handleValidatePassword(password)) {
      return toast.warning(
        "A senha precisa ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula e 1 caractere especial!"
      );
    }
    if (password !== confirmPassword) {
      return toast.warning("Senha e confirmar senha não coincidem!");
    }
    const data = {
      name,
      email,
      password,
    };
    setLoading(true);
    createUser(data)
      .then((res) => {
        toast.success("Conta criada com sucesso");
        navigate("/login");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div id="register" className="auth">
      <p className="title">Criar Conta</p>
      <p>
        Já tem uma conta? <Link to="/login"> Faça login aqui</Link>
      </p>

      <div className="mt-4 mx-auto" style={{ width: "85%" }}>
        <label htmlFor="" className="w-100 text-start mb-3">
          Nome:
          <input
            autoFocus
            className="form-control"
            type="email"
            placeholder="Ex: Marcio Santos"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyDown={(e) => (e.key === "Enter" ? handleCreateUser() : "")}
          />
        </label>
        <label htmlFor="" className="w-100 text-start ">
          E-mail:
          <input
            name="email"
            className="form-control"
            type="email"
            placeholder="Ex: marciomito1999@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={(e) => (e.key === "Enter" ? handleCreateUser() : "")}
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          Senha:
          <div className="input-box">
            <input
              className="form-control"
              type={viewPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => (e.key === "Enter" ? handleCreateUser() : "")}
            />
            {viewPassword ? (
              <i
                className="fa-solid fa-eye-slash"
                onClick={() => setViewPassword(!viewPassword)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye"
                onClick={() => setViewPassword(!viewPassword)}
              ></i>
            )}
          </div>
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          Confirmar Senha:
          <input
            className="form-control"
            type={viewPassword ? "text" : "password"}
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onKeyDown={(e) => (e.key === "Enter" ? handleCreateUser() : "")}
          />
        </label>
        <div>
          <DefaultSaveButton
            title="Cadastrar"
            loading={loading}
            handleSubmit={handleCreateUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
