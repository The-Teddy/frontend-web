import { Context } from "../../auth/AuthContext";
import { getAllCategories } from "../../helpers/api";
import { Load } from "../../partials/Spinner";
import "./Company.scss";

import React, { useContext, useEffect, useState } from "react";

const Company = () => {
  const { token } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false);

  // function handleGetCategories() {
  //   setLoading(true);
  //   getAllCategories(token)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }
  // useEffect(() => {
  //   handleGetCategories();
  // }, []);
  return (
    <div id="company" className="background-default">
      <p className="title">Gerenciar Empresa</p>

      {/* {loading ? (
        <div className="load-center">
          <Load />
        </div>
      ) : (
        <>
          <div className="box-controll row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquise uma categoria"
              />
            </div>
            <div className="col-md-4 box-button">
              <button className="default-button">Nova Categoria</button>
            </div>
          </div>
          <div className="box-content">
            <h2>Teste conteúdo</h2>
          </div>
        </>
      )} */}
    </div>
  );
};

export default Company;
