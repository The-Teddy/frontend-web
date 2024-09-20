import React, { useContext, useEffect, useState } from "react";
import "./Category.scss";
import { Context } from "../../auth/AuthContext";
import { Load } from "../../partials/Spinner";
import { getAllDataWithPagination } from "../../helpers/api";
import { CategoryInterface } from "./CategoryInterface";
import { handleConvertDateAndTime } from "../../helpers/utils";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../partials/pagination/Pagination";

const Category = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { token, user } = useContext(Context);
  const [data, setData] = useState<CategoryInterface[] | null>([]);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  function handleGetCategories() {
    setLoading(true);
    getAllDataWithPagination(page, limit, categoryFilter, token, "category")
      .then((res) => {
        setTotalItems(res.data.data.totalItems);
        setData(res.data.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    handleGetCategories();
  }, [page]);
  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <div id="company" className="background-default">
      <p className="title">Listagem de Categorias</p>

      {loading ? (
        <div className="load-center">
          <Load />
        </div>
      ) : (
        <>
          <div className="box-control row">
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquise uma categoria"
              />
            </div>
            <div className="col-sm-4 box-button">
              <Link to="criar">
                <button className="default-button">Nova Categoria</button>
              </Link>
            </div>
          </div>
          <div className="box-content" style={{ overflowX: "auto" }}>
            {data && data?.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Status</th>
                    <th>Categoria Ativa</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td
                        className={`${
                          item.approvalStatus === "aprovado"
                            ? "text-success"
                            : item.approvalStatus === "rejeitado"
                            ? "text-danger"
                            : "text-warning"
                        }`}
                      >
                        {item.approvalStatus}
                      </td>
                      <td
                        className={`${
                          item.isActive ? "text-success" : "text-danger"
                        }`}
                      >
                        {item.isActive ? "Sim" : "Não"}
                      </td>
                      <td>{handleConvertDateAndTime(item.createdAt)}</td>
                      <td colSpan={2}>
                        {!user?.role.includes("super-admin") &&
                        item.approvalStatus !== "pendente" ? null : (
                          <>
                            <Link to={`/categoria/editar?id=${item.id}`}>
                              <i className="fa-solid fa-pen-to-square text-success icon-button"></i>
                            </Link>
                          </>
                        )}
                        <Link to={`/categoria/detalhes?id=${item.id}`}>
                          <i className="fa-solid fa-eye text-primary icon-button"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Não há categorias para exibir</p>
            )}
          </div>
        </>
      )}
      <Pagination
        total={totalItems}
        itemsPerPage={10}
        handleCurrentPage={(page) => setPage(page)}
      />
    </div>
  );
};

export default Category;
