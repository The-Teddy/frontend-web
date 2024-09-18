import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DefaultBackButton from "../../partials/buttons/DefaultBackButton";
import DefaultSaveButton from "../../partials/buttons/DefaultSaveButton";
import { createCategory, getOneById, updateCategory } from "../../helpers/api";
import { Context } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import {
  CategoryInterface,
  UpdateCategoryInterface,
} from "./CategoryInterface";
import { Load } from "../../partials/Spinner";
import { FormControlLabel, Switch } from "@mui/material";

const UpdateCategory = () => {
  const [id, setId] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [approvalStatus, setApprovalStatus] = useState<
    "pendente" | "aprovado" | "rejeitado"
  >("pendente");
  const [observation, setObservation] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const { token, user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [initialCategory, setInitialCategory] =
    useState<CategoryInterface | null>(null);

  function handleUpdateCategory() {
    const isNameUnchanged = name === initialCategory?.name;
    const isDescriptionUnchanged =
      (description === "" ? null : description) ===
      initialCategory?.description;
    const isObservationUnchanged =
      (observation === "" ? null : observation) ===
      initialCategory?.observation;
    const isActiveUnchanged = isActive === initialCategory?.isActive;
    const isApprovalStatusUnchanged =
      approvalStatus === initialCategory?.approvalStatus;

    const isInitialCategory =
      isNameUnchanged &&
      isDescriptionUnchanged &&
      isObservationUnchanged &&
      isActiveUnchanged &&
      isApprovalStatusUnchanged;

    if (isInitialCategory) {
      toast.warning("Nenhuma alteração foi feita");
      return navigate("/categoria");
    }

    if (name.length < 3) {
      return toast.warning("O nome da categoria é requerido");
    }
    const data: UpdateCategoryInterface = {
      id,
      name,
      description:
        description === "" && initialCategory?.description === null
          ? null
          : description,
      observation:
        observation === "" && initialCategory?.observation === null
          ? null
          : observation,
      isActive,
      approvalStatus,
    };
    setLoadingButton(true);
    updateCategory(data, token)
      .then((res) => {
        navigate("/categoria");
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
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
  function handleGetCategoryDetail(id: string | null) {
    setLoading(true);
    getOneById(Number(id), token, "category/details")
      .then((res) => {
        setInitialCategory(res.data.category);
        setId(res.data.category.id);
        setName(res.data.category.name);
        setDescription(
          res.data.category.description ? res.data.category.description : ""
        );
        setObservation(
          res.data.category.observation ? res.data.category.observation : ""
        );
        setIsActive(res.data.category.isActive);
        setApprovalStatus(res.data.category.approvalStatus);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    handleGetCategoryDetail(params.get("id"));
  }, [params.get("id")]);

  useEffect(() => {
    if (!user || !initialCategory) {
      return;
    }
    if (
      user?.role !== "super-admin" &&
      initialCategory?.approvalStatus !== "pendente"
    ) {
      toast.warning("você não tem permissão para editar essa categoria");
      navigate("/categoria");
    }
  }, [initialCategory, user]);

  return (
    <div id="company" className="background-default">
      <>
        {loading ? (
          <Load />
        ) : (
          <>
            <div className="box-control">
              <p className="title">Editar Categoria</p>

              <DefaultBackButton title="Voltar" path="/categoria" />
            </div>
            <div className="box-content">
              <label htmlFor="" className="w-100 text-start">
                <span className="required">Nome:</span>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
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
              <label htmlFor="" className="w-100 text-start">
                Observação:
                <textarea
                  value={observation}
                  onChange={(e) => {
                    setObservation(e.target.value);
                  }}
                  maxLength={300}
                  rows={5}
                  className="form-control"
                  placeholder="Exemplo: reprovado por conta do nome impróprio."
                />
              </label>
              <label className="w-100 text-start">
                Categoria Ativa:
                <Switch
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
              </label>
              <label htmlFor="" className="w-100 text-start">
                Status:
                <label htmlFor="" className="mx-5">
                  aprovado: &nbsp;
                  <input
                    type="radio"
                    name="status"
                    checked={approvalStatus === "aprovado"}
                    onChange={() => setApprovalStatus("aprovado")}
                  />
                </label>
                <label htmlFor="">
                  rejeitado: &nbsp;
                  <input
                    type="radio"
                    name="status"
                    checked={approvalStatus === "rejeitado"}
                    onChange={() => setApprovalStatus("rejeitado")}
                  />
                </label>
              </label>
              <DefaultSaveButton
                loading={loadingButton}
                title="Salvar"
                handleSubmit={handleUpdateCategory}
              />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default UpdateCategory;
