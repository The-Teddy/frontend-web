import React, { useState, useEffect } from "react";
import "./Pagination.scss";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps<T> {
  total: number;
  resetCurrentPage?: boolean;
  searchTerm?: string;
  itemsPerPage?: number;
  handleCurrentPage: (page: number) => void;
}

const Pagination = <T extends any>({
  resetCurrentPage,
  total,
  itemsPerPage = 10,
  searchTerm,
  handleCurrentPage,
}: PaginationProps<T>) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const handleUpdateQuery = (page: string) => {
    if (!resetCurrentPage) {
      setSearchParams({ page: page });
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handleCurrentPage(currentPage - 1);
      handleUpdateQuery(String(currentPage - 1));
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleCurrentPage(currentPage + 1);
      handleUpdateQuery(String(currentPage + 1));
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleFirst = () => {
    setCurrentPage(1);
    handleUpdateQuery("1");
    handleCurrentPage(1);
  };
  const handleLast = () => {
    setCurrentPage(totalPages);
    const page = totalPages;
    handleUpdateQuery(String(page));
    handleCurrentPage(page);
  };

  useEffect(() => {
    if (resetCurrentPage) {
      setCurrentPage(1);
    }
  }, [resetCurrentPage]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm && searchTerm?.length > 1) {
        setCurrentPage(1);
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  return (
    <div>
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
      <div className="pagination">
        <button onClick={handleFirst} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faAnglesLeft} />{" "}
        </button>
        <button
          className="previous-button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faAngleLeft} />{" "}
        </button>

        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => [
              setCurrentPage(page),
              handleCurrentPage(page),
              handleUpdateQuery(String(page)),
            ]}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}

        <button
          className="next-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button onClick={handleLast} disabled={currentPage === totalPages}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
