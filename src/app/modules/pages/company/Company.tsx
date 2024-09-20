import { Context } from "../../auth/AuthContext";
import CategorySelectModal from "../../partials/modals/category-select-modal/CategorySelectModal";
import { Load } from "../../partials/Spinner";
import "./Company.scss";

import React, { useContext, useEffect, useState } from "react";

const Company = () => {
  const { token } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("Selecione...");
  const [imageLogo, setImageLogo] = useState<File | null>(null);
  const [imageCover, setImageCover] = useState<File | null>(null);
  const [viewModal, setViewModal] = useState<boolean>(false);

  return (
    <div id="company" className="background-default">
      <p className="title">Gerenciar Empresa</p>

      {loading ? (
        <div className="load-center">
          <Load />
        </div>
      ) : (
        <>
          <div className="box-control row">
            {/* <div className="box-control">
              <p className="title">Gerenciar Empresa</p>
              <DefaultBackButton title="Voltar" path="/categoria" />
            </div> */}
          </div>
          <div className="box-content">
            <label htmlFor="" className="w-100 text-start">
              Nome Comercial:
              <input
                className="form-control"
                type="text"
                placeholder="Exemplo: Wl Barber"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="" className="w-100 text-start">
              Segmento:
              <select
                name=""
                id="category-select"
                className="form-select"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setViewModal(true);
                }}
              >
                <option value="">{category}</option>
              </select>
            </label>
          </div>
        </>
      )}
      <CategorySelectModal
        viewModal={viewModal}
        setViewModal={() => setViewModal(false)}
        setSelectedCategory={(category) => setCategory(category)}
      />
    </div>
  );
};

export default Company;
