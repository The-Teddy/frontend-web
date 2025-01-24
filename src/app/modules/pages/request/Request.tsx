import { useState, useEffect, useContext } from "react";
import "./Request.scss";
import { getAllDataWithPagination } from "../../helpers/api";
import { Context } from "../../auth/AuthContext";

const Request = () => {
  const { token } = useContext(Context);
  const [data, setData] = useState();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleGetAllRequests() {
    getAllDataWithPagination(page, limit, searchTerm, token, "request")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }

  useEffect(() => {
    handleGetAllRequests();
  }, []);

  return <div id="request">Request</div>;
};

export default Request;
