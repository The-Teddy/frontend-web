import React, { useState, useContext, useEffect } from "react";
import "./auth.scss";
import { Link } from "react-router-dom";
import { Context } from "./AuthContext";
import DefaultSaveButton from "../partials/buttons/DefaultSaveButton";
import { handleIsNumber } from "../helpers/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string | null>(null);
  const [viewErrorCode, setViewErrorCode] = useState<boolean>(false);
  const { handleLogin, loading, emailNotVerified } = useContext(Context);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
            onKeyDown={(e) =>
              e.key === "Enter" ? handleLogin(email, password, emailCode) : ""
            }
            value={email}
            className="form-control"
            type="email"
            placeholder="Ex: pedroalves923@gmail.com"
          />
        </label>
        <div className="input-box">
          <label htmlFor="" className="w-100 text-start mt-3">
            Password:
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleLogin(email, password, emailCode) : ""
              }
              className="form-control"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
            />
          </label>
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
                onKeyDown={(e) =>
                  e.key === "Enter"
                    ? handleLogin(email, password, emailCode)
                    : ""
                }
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
