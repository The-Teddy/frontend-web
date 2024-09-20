import React, { useContext, useEffect, useState } from "react";
import "./CategorySelectModal.scss";
import { Box, Modal } from "@mui/material";
import {
  getAllCategories,
  getAllDataWithPagination,
} from "../../../helpers/api";
import { Context } from "../../../auth/AuthContext";
import Pagination from "../../pagination/Pagination";
import { Load } from "../../Spinner";
import DetailModalCategory from "../detail-modal-category/DetailModalCategory";

export interface CategorySelectModalInterface {
  viewModal: boolean;
  setViewModal: () => void;
  setSelectedCategory: (category: string) => void;
}
interface CategoryInterface {
  name: string;
  description: string;
}

const CategorySelectModal: React.FC<CategorySelectModalInterface> = ({
  ...props
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(Context);
  const [limit, setLimit] = useState<number>(20);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<CategoryInterface[]>([]);
  const [viewDetailModal, setViewDetailModal] = useState<boolean>(true);
  const [detailCategory, setDetailCategory] = useState<string>("");

  function handleGetCategories(resetPage: number | null = null) {
    setLoading(true);
    getAllDataWithPagination(
      resetPage ? 1 : page,
      limit,
      searchTerm,
      token,
      "category"
    )
      .then((res) => {
        setPage(Number(res.data.data.currentPage));
        setTotalItems(Number(res.data.data.totalItems));
        setData(res.data.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleCloseModal(event: any) {
    if (event.target.className.includes("MuiBackdrop-root")) {
      props.setViewModal();
      setSearchTerm("");
    }
  }
  useEffect(() => {
    if (props.viewModal) {
      handleGetCategories();
    }
    setPage(1);
    setViewDetailModal(false);
  }, [props.viewModal]);

  useEffect(() => {
    if (!loading) {
      if (props.viewModal) {
        handleGetCategories();
      }
    }
  }, [page]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleGetCategories(1);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);
  return (
    <>
      <Modal
        open={props.viewModal}
        id="category-select-modal"
        className="category-select-modal"
        onKeyDown={(e) =>
          e.key === "Escape" ? [props.setViewModal(), setSearchTerm("")] : ""
        }
        onClick={(e) => handleCloseModal(e)}
      >
        <Box className="modal-content">
          <div className="box-control">
            <p className="title">Selecione o Segmento</p>
            <button
              className="modal-close"
              onClick={() => {
                props.setViewModal();
                setSearchTerm("");
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          {!viewDetailModal ? (
            <label htmlFor="" className="w-100 text-start">
              Pesquisar Segmento:
              <input
                type="text"
                className="form-control"
                placeholder="Digite o segmento desejado"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          ) : null}
          {loading ? (
            <Load />
          ) : (
            <>
              {viewDetailModal ? (
                ""
              ) : (
                <>
                  <div className="box-content">
                    {data?.map((item, index) => (
                      <div
                        className="category"
                        key={index}
                        role="button"
                        onClick={() => {
                          setSelectedCategory(item.name);
                          setViewDetailModal(true);
                          setDetailCategory(item.description);
                        }}
                      >
                        <p className="category-name">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          <DetailModalCategory
            setCloseModal={() => setViewDetailModal(false)}
            setCloseModalAndCategory={() => {
              setViewDetailModal(false);
              props.setViewModal();
              props.setSelectedCategory(selectedCategory);
              setSearchTerm("");
            }}
            viewModal={viewDetailModal}
            title={selectedCategory}
            detail={detailCategory}
          />
          {!viewDetailModal ? (
            <Pagination
              searchTerm={searchTerm}
              resetCurrentPage={props.viewModal}
              total={totalItems}
              itemsPerPage={limit}
              handleCurrentPage={(page) => setPage(page)}
            />
          ) : null}
        </Box>
      </Modal>
    </>
  );
};

export default CategorySelectModal;
