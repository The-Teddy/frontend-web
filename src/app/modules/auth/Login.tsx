import React, { useState, useContext } from "react";
import "./auth.scss";
import { Link } from "react-router-dom";
import { Context } from "./AuthContext";
import DefaultSaveButton from "../partials/buttons/DefaultSaveButton";
import { handleIsNumber } from "../helpers/utils";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string | null>(null);
  const [viewErrorCode, setViewErrorCode] = useState<boolean>(false);
  const { handleLogin, loading, emailNotVerified } = useContext(Context);

  return (
    <div id="login" className="auth">
      <div className="mt-3">
        <img width={250} src="/images/logo.png" alt="logo" />
        <p className="title">Entre na plataforma</p>
      </div>
      <div className="mt-4 mx-auto" style={{ width: "85%" }}>
        <label htmlFor="" className="w-100 text-start ">
          E-mail:
          <input
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control"
            type="email"
            placeholder="Ex: pedroalves923@gmail.com"
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          Password:
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
            placeholder="Digite sua senha"
          />
        </label>
        {emailNotVerified ? (
          <>
            <label className="w-100 text-start mt-3">
              Código de verificação:
              <input
                type="text"
                className="form-control"
                placeholder="exemplo: 528931"
                value={emailCode ? emailCode : ""}
                onChange={(event: any) => [
                  setEmailCode(handleIsNumber(event.target.value)),
                  setViewErrorCode(false),
                ]}
                autoCapitalize="none"
                maxLength={6}
              />
            </label>
          </>
        ) : null}
        {viewErrorCode ? (
          <p style={{ color: "red", marginTop: 5, textAlign: "center" }}>
            Erro: O email não foi verificado. {"\n"} Por favor, informe o código
            de verificação.
          </p>
        ) : null}
        <DefaultSaveButton
          title="Entrar"
          loading={loading}
          handleSubmit={() => handleLogin(email, password, emailCode)}
        />
        <Link to="/register">
          <button className="btn-dark btn w-100 mt-3">Cadastrar</button>
        </Link>{" "}
      </div>
    </div>
  );
};

export default Login;
