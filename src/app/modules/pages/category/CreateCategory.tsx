import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultBackButton from "../../partials/buttons/DefaultBackButton";
import DefaultSaveButton from "../../partials/buttons/DefaultSaveButton";
import { createCategory } from "../../helpers/api";
import { Context } from "../../auth/AuthContext";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { token } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleCreateCategory() {
    if (category.length < 3) {
      return toast.warning("Categoria requerida");
    }
    setLoading(true);
    createCategory(
      {
        name: category,
        description,
      },
      token
    )
      .then((res) => {
        if (res.status === 200) {
          toast.warning(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/categoria");
        }
        console.log(res);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log("Erro no servidor:", error.response.data);

        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div id="company" className="background-default">
      <>
        <div className="box-control">
          <p className="title">Criar Categoria</p>

          <DefaultBackButton title="Voltar" path="/categoria" />
        </div>
        <div className="box-content">
          <label htmlFor="" className="w-100 text-start">
            <span className="required">Nome:</span>
            <input
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Exemplo: Barberia"
            />
          </label>
          <label htmlFor="" className="w-100 text-start">
            Descrição:
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              maxLength={300}
              rows={5}
              className="form-control"
              placeholder="Exemplo: Especializada no cuidado masculino, uma barbearia oferece serviços como corte de cabelo, barba, bigode e cuidados estéticos masculinos. Muitas vezes, elas também oferecem tratamentos de pele, relaxamento e atendimento personalizado."
            />
          </label>
          <DefaultSaveButton
            loading={loading}
            title="Salvar"
            handleSubmit={handleCreateCategory}
          />
        </div>
      </>
    </div>
  );
};

export default CreateCategory;
