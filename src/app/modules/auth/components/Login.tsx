import React, { useState } from "react";
import "./auth.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>();
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
            className="form-control"
            type="email"
            placeholder="Ex: pedroalves923@gmail.com"
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          Password:
          <input
            className="form-control"
            type="password"
            placeholder="Digite sua senha"
          />
        </label>
        <button className="btn-dark btn w-100 mt-4">Entrar</button>
        <Link to="/register">
          <button className="btn-dark btn w-100 mt-3">Cadastrar</button>
        </Link>{" "}
      </div>
    </div>
  );
};

export default Login;
