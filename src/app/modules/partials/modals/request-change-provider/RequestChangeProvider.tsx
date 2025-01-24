import React, { useContext, useEffect, useState } from "react";
import "./RequestChangeProvider.scss";
import { Box, Modal } from "@mui/material";
import DefaultSaveButton from "../../buttons/DefaultSaveButton";
import DefaultCancelButton from "../../buttons/default-cancel-button/DefaultCancelButton";
import CategorySelectModal from "../category-select-modal/CategorySelectModal";
import {
  handleError,
  handleMask,
  handleValidateDocument,
} from "../../../helpers/utils";
import { createRequest } from "../../../helpers/api";
import { CreateRequestInterface } from "../../../global/interfaces/CreateRequestInterface";
import { Context } from "../../../auth/AuthContext";
import { toast } from "react-toastify";
import { urlRegex } from "../../../global/variables/Variables";
import ConfirmModal from "../confirm-modal/ConfirmModal";

interface RequestChangeProviderInterface {
  view: boolean;
  setView: () => void;
  providerData: {
    businessName: string | null;
    document: string | null;
    url: string | null;
    category: string | null;
  };
}
const RequestChangeProvider: React.FC<RequestChangeProviderInterface> = ({
  ...props
}) => {
  const { token, user } = useContext(Context);
  const [selectedFields, setSelectedFields] = useState<any>([]);
  const [hasIndexies, setHasIndexies] = useState<number[]>([]);
  const [viewInputs, setViewInputs] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [documentBusiness, setDocumentBusiness] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewConfirmModal, setViewConfirmModal] = useState<boolean>(false);

  const fields = [
    {
      index: 0,
      name: "businessName",
      oldValue: props.providerData.businessName,
      title: "Nome Comercial",
      placeholder: "Exemplo: WL Barber",
    },
    {
      index: 1,
      name: "document",
      oldValue: props.providerData.document,
      title: "CPF/CNPJ",
      placeholder: "CPF: 000.000.000-00 ou CNPJ: 00.000.000/0000-00 ",
    },
    {
      index: 2,
      name: "url",
      oldValue: props.providerData.url,
      title: "URL",
      placeholder: "Exemplo: wl_barber",
    },
    {
      index: 3,
      name: "category",
      oldValue: props.providerData.category,
      title: "Segmento",
    },
  ];

  function handleFieldsToChanges(field: any) {
    if (selectedFields.length === 0) {
      setSelectedFields([...selectedFields, field]);
      setHasIndexies([...hasIndexies, field.index]);
    } else {
      selectedFields.forEach((item: any) => {
        if (item.name === field.name) {
          const filteredArray = selectedFields.filter((item: any) => {
            return item.name !== field.name;
          });
          setSelectedFields(filteredArray);

          const filteredIndexiesArray = hasIndexies.filter((item) => {
            return item !== field.index;
          });
          setHasIndexies(filteredIndexiesArray);
        } else {
          setSelectedFields([...selectedFields, field]);
          setHasIndexies([...hasIndexies, field.index]);
        }
      });
    }
  }

  function handleValueInput(value: string, index: number) {
    if (index === 0) {
      setBusinessName(value);
    }
    if (index === 1) {
      setDocumentBusiness(handleMask(value));
      const documentInput: any = document.querySelector("#document");
      if (documentInput) {
        documentInput.value = handleMask(value);
      }
    }
    if (index === 2) {
      setUrl(value);
    }
  }
  function handleCreateData() {
    const data: CreateRequestInterface = {
      businessName:
        props.providerData.businessName === businessName
          ? null
          : businessName
          ? businessName
          : null,
      document:
        props.providerData.document === documentBusiness
          ? null
          : documentBusiness
          ? documentBusiness
          : null,
      url: props.providerData.url === url ? null : url ? url : null,
      category:
        props.providerData.category === category
          ? null
          : category
          ? category
          : null,
      oldBusinessName:
        props.providerData.businessName === businessName
          ? null
          : hasIndexies.includes(0)
          ? props.providerData.businessName
          : null,
      oldDocument:
        props.providerData.document === documentBusiness
          ? null
          : hasIndexies.includes(1)
          ? props.providerData.document
          : null,
      oldUrl:
        props.providerData.url === url
          ? null
          : hasIndexies.includes(2)
          ? props.providerData.url
          : null,
      oldCategory:
        props.providerData.category === category
          ? null
          : hasIndexies.includes(3)
          ? props.providerData.category
          : null,
    };
    setLoading(true);
    createRequest(data, token)
      .then((res) => {
        props.setView();
        setViewConfirmModal(false);
        setViewInputs(false);
        setHasIndexies([]);
        setSelectedFields([]);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleValidateData() {
    if (hasIndexies.includes(0)) {
      if (businessName.length < 3) {
        return toast.warning(
          "O nome comercial é obrigatório e deve ter pelo menos 3 caracteres. Exemplo: 'WL Barber'."
        );
      }
    }
    if (hasIndexies.includes(1)) {
      if (!handleValidateDocument(documentBusiness)) {
        return toast.warning("Insira um CPF/CNPJ válido");
      }
    }
    if (hasIndexies.includes(2)) {
      if (!urlRegex.test(url)) {
        return toast.warning(
          "Insira uma URL válida. Evite caracteres especiais e utilize apenas letras, números, sublinhados e hífens."
        );
      }
    }
    if (hasIndexies.includes(3)) {
      if (category === "Selecione...") {
        return toast.warning(
          "Por favor, escolha o segmento adequado para a sua empresa."
        );
      }
    }
    if (user?.business) {
      if (
        user?.business.name === businessName?.trim() &&
        user?.business.document === documentBusiness?.trim() &&
        user?.business.url === url?.trim() &&
        user?.business.category === category?.trim()
      ) {
        return toast.warning("Não houve alterações nos dados");
      }
    }
    setViewConfirmModal(true);
  }
  useEffect(() => {
    if (props.providerData.category) {
      setCategory(props.providerData.category);
    }
  }, [props.providerData.category]);

  useEffect(() => {
    if (!viewInputs) {
      setBusinessName("");
      setCategory("");
      setDocumentBusiness("");
      setUrl("");
      if (props.providerData.category) {
        setCategory(props.providerData.category);
      }
    }
  }, [viewInputs]);

  function handleCleanModal() {
    setSelectedFields([]);
    setHasIndexies([]);
    setViewInputs(false);
    setBusinessName("");
    setCategory("");
    setDocumentBusiness("");
    setUrl("");
  }

  return (
    <>
      <Modal
        open={props.view}
        id="request-change-provider"
        onKeyDown={(e) => (e.key === "Escape" ? props.setView() : "")}
      >
        <Box className="modal-box">
          <div className="box-control">
            <p className="title">
              {viewInputs ? "Preencha os campos" : "Selecione os campos"}{" "}
            </p>
            <button
              className="modal-close"
              onClick={() => {
                props.setView();
                handleCleanModal();
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="modal-content">
            {viewInputs ? (
              <>
                <div className="box-inputs">
                  {selectedFields.map((item: any, index: number) => (
                    <div key={index}>
                      {item.name === "category" ? (
                        <div className="p-2 mt-2">
                          <label htmlFor="" className="w-100">
                            {item.title}
                            <select
                              name=""
                              id="category-select"
                              className="form-select mt-2"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setViewModal(true);
                              }}
                            >
                              <option value="">{category}</option>
                            </select>
                          </label>
                          <span className="old-value">
                            {item.title} atual: {item.oldValue}
                          </span>
                        </div>
                      ) : (
                        <div className="p-2 mt-2">
                          <label htmlFor="" key={index} className="w-100">
                            <span className="required">{item.title}</span>
                            <input
                              id={item.name}
                              type="text"
                              className="form-control"
                              placeholder={item.placeholder}
                              onChange={(e) => {
                                handleValueInput(e.target.value, item.index);
                              }}
                            />
                          </label>
                          <span className="old-value">
                            {item.title} atual: {item.oldValue}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {selectedFields.length === 0 ? null : (
                  <div className="box-buttons">
                    <DefaultCancelButton
                      title="Voltar"
                      handleSubmit={() => setViewInputs(false)}
                    />
                    <DefaultSaveButton
                      title="Salvar"
                      handleSubmit={handleValidateData}
                      loading={loading}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="box-fields-to-change">
                  {fields.map((item, index) => (
                    <div key={index} className="field-to-change">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={() => handleFieldsToChanges(item)}
                        checked={hasIndexies.includes(item.index)}
                      />
                      <p className="sub-title">{item.title}</p>
                    </div>
                  ))}
                </div>
                {selectedFields.length === 0 ? null : (
                  <DefaultSaveButton
                    title="Selecionar"
                    handleSubmit={() => setViewInputs(true)}
                  />
                )}
              </>
            )}
          </div>
          <CategorySelectModal
            viewModal={viewModal}
            setViewModal={() => setViewModal(false)}
            setSelectedCategory={(category) => setCategory(category)}
          />
          <ConfirmModal
            loading={loading}
            title="Confirmar requisição da atualização dos dados?"
            view={viewConfirmModal}
            setView={() => setViewConfirmModal(false)}
            handleSubmit={handleCreateData}
          />
        </Box>
      </Modal>
    </>
  );
};

export default RequestChangeProvider;
