import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
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
          />
        </label>
        <label htmlFor="" className="w-100 text-start ">
          E-mail:
          <input
            autoFocus
            className="form-control"
            type="email"
            placeholder="Ex: marciomito1999@gmail.com"
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          Senha:
          <input
            className="form-control"
            type="password"
            placeholder="Digite sua senha"
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          Confirmar Senha:
          <input
            className="form-control"
            type="password"
            placeholder="Confirme a senha"
          />
        </label>
        <div>
          <button className="btn-dark btn w-100 mt-3">Cadastrar</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
