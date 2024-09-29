import React, { useContext } from "react";
import { Context } from "../../auth/AuthContext";
import BoxWarning from "../box-warning/BoxWarning";
import { useLocation } from "react-router-dom";

const ManageWarning = () => {
  const { user } = useContext(Context);
  const location = useLocation();

  function handleProviderData() {
    if (location.pathname === "/empresa") {
      return false;
    }
    if (user?.business) {
      if (
        !user?.business?.about ||
        !user?.business?.logo ||
        !user?.business?.cover
      ) {
        return true;
      }
    }
    return false;
  }
  return (
    <>
      <div className="manage-warning">
        {handleProviderData() ? (
          <BoxWarning
            text=" Para garantir o funcionamento completo do seu perfil, é necessário
    preencher os dados da sua empresa na aba 'Perfil'."
            path="/empresa?tab=profile"
          />
        ) : null}
      </div>
    </>
  );
};

export default ManageWarning;
