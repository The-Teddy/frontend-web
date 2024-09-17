import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Category.scss";
import { getOneById } from "../../helpers/api";
import { Context } from "../../auth/AuthContext";
import { Load } from "../../partials/Spinner";
import { CategoryInterface } from "./CategoryInterface";
import DefaultBackButton from "../../partials/buttons/DefaultBackButton";
import { handleConvertDateAndTime } from "../../helpers/utils";

const CategoryDetail = () => {
  const [params] = useSearchParams();
  const { token } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<CategoryInterface | null>(null);

  function handleGetCategoryDetail(id: string | null) {
    setLoading(true);
    getOneById(Number(id), token, "category/details")
      .then((res) => {
        setCategory(res.data.category);
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
  return (
    <div id="category-detail" className="background-default">
      {loading ? (
        <Load />
      ) : (
        <>
          {category ? (
            <>
              <div className="box-control">
                <p className="title">{category.name}</p>
                <DefaultBackButton title="Voltar" path="/categoria" />
              </div>
              <div className="box-content text-start">
                <p>
                  <strong>Descrição: </strong>
                  {category.description}
                </p>
                <p>
                  <strong>Observação: </strong> {category.observation}
                </p>
                <p>
                  <strong>Status: </strong>
                  <span
                    className={
                      category.approvalStatus === "aprovado"
                        ? "text-success"
                        : category.approvalStatus === "rejeitado"
                        ? "text-danger"
                        : "text-warning"
                    }
                  >
                    {category.approvalStatus}
                  </span>
                </p>
                <p>
                  <strong>Categoria Ativa: </strong>
                  <span
                    className={
                      category.isActive ? "text-success" : "text-danger"
                    }
                  >
                    {category.isActive ? "Sim" : "Não"}
                  </span>
                </p>
                <p>
                  <strong>Sugerida: </strong>
                  {category.isSuggested ? "Sim" : "Não"}
                </p>
                <p>
                  <strong>Criado por: </strong>
                  {category.createdByName}
                </p>
                <p>
                  <strong>Aprovado por: </strong>
                  {category.approvedByName}
                </p>
                <p>
                  <strong>Criado em:</strong>
                  {handleConvertDateAndTime(category.createdAt)}
                </p>
              </div>
            </>
          ) : (
            <p className="feedback">Categoria não encontrada</p>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryDetail;
