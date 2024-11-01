import React, { useContext, useEffect, useState } from "react";
import DefaultQuestionIcon from "../default-question-icon/DefaultQuestionIcon";
import HelpDetailModal from "../modals/help-detail-modal/HelpDetailModal";
import CategorySelectModal from "../modals/category-select-modal/CategorySelectModal";
import DefaultSaveButton from "../buttons/DefaultSaveButton";
import {
  createCriticalDataProvider,
  updateCriticalDataProvider,
} from "../../helpers/api";
import { Context } from "../../auth/AuthContext";
import { ContentIdentityInterface } from "../../interfaces/ProviderInterfaces";
import { toast } from "react-toastify";
import {
  handleError,
  handleMask,
  handleValidateDocument,
} from "../../helpers/utils";
import ConfirmModal from "../modals/confirm-modal/ConfirmModal";
import AlertMessage from "../alert-message/AlertMessage";

interface ContentIInterface {
  setTabView: (value: string) => void;
}
const ContentIdentity: React.FC<ContentIInterface> = ({ ...props }) => {
  const { token, user, handleGetUser, handleLogout } = useContext(Context);
  const [businessName, setBusinessName] = useState<string>("");
  const [category, setCategory] = useState<string>("Selecione...");
  const [url, setUrl] = useState<string>("");
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [document, setDocument] = useState<string>("");
  const [titleHelpDetailModal, setTitleHelpDetailModal] = useState<string>("");
  const [textHelpDetailModal, setTextHelpDetailModal] = useState<string>("");
  const [viewHelpDetailModal, setViewHelpDetailModal] =
    useState<boolean>(false);
  const [viewConfirmModal, setViewConfirmModal] = useState<boolean>(false);
  const urlRegex: RegExp = /^(?=.{3,})[a-zA-Z0-9_-]+$/;
  const [viewMode, setViewMode] = useState(false);
  const [viewRequestModal, setViewRequestModal] = useState(false);

  function handleViewHelpDetailModal(title: string, text: string) {
    if (title === titleHelpDetailModal || titleHelpDetailModal.length === 0) {
      setViewHelpDetailModal(!viewHelpDetailModal);
    }
    setTitleHelpDetailModal(title);
    setTextHelpDetailModal(text);
  }
  function handleSaveData() {
    const data: ContentIdentityInterface = {
      businessName,
      document,
      category,
      url,
    };

    setLoadingButton(true);
    createCriticalDataProvider(data, token)
      .then((res) => {
        // props.setTabView("profile");
        toast.success(
          "Empresa Cadastrada com sucesso! \n  Por favor, refaça o login!"
        );
        handleLogout(true);
        setViewConfirmModal(false);
        handleGetUser();
      })
      .catch((error) => {
        console.error(error);
        handleError(error);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  }
  function handleUpdateData() {
    setLoadingButton(true);
    const data: ContentIdentityInterface = {
      businessName,
      document,
      category,
      url,
    };
    updateCriticalDataProvider(data, token)
      .then(() => {
        setViewConfirmModal(false);
        toast.success("Seus dados foram atualizados com sucesso");
        handleGetUser();
      })
      .catch((error) => {
        console.error(error);
        handleError(error);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  }
  function handleValidateData() {
    if (businessName.length < 3) {
      return toast.warning(
        "O nome comercial é obrigatório e deve ter pelo menos 3 caracteres. Exemplo: 'WL Barber'."
      );
    }
    if (!handleValidateDocument(document)) {
      return toast.warning("Insira um CPF/CNPJ válido, por favor");
    }
    if (!urlRegex.test(url)) {
      return toast.warning(
        "Insira uma URL válida. Evite caracteres especiais e utilize apenas letras, números, sublinhados e hífens."
      );
    }
    if (category === "Selecione...") {
      return toast.warning(
        "Por favor, escolha o segmento adequado para a sua empresa."
      );
    }
    if (user?.business) {
      if (
        user?.business.name === businessName.trim() &&
        user?.business.document === document.trim() &&
        user?.business.url === url.trim() &&
        user?.business.category === category.trim()
      ) {
        return toast.warning("Não houve alterações nos dados");
      }
    }
    setViewConfirmModal(true);
  }

  useEffect(() => {
    if (user?.business) {
      if (user?.business.hasAutomaticUpdate) {
        setViewMode(true);
      }
      setBusinessName(user?.business.name);
      setDocument(user?.business.document);
      setUrl(user?.business.url);
      if (user?.business.category) {
        setCategory(user?.business.category);
      }
    }
  }, [user]);

  return (
    <>
      <div className="box-content" id="business-identity">
        <label htmlFor="" className="w-100 text-start">
          <span className="required">Nome Comercial:</span>
          <DefaultQuestionIcon
            setView={() =>
              handleViewHelpDetailModal(
                "Nome Comercial",
                "O nome comercial é a designação pela qual sua empresa será conhecida no mercado. Ele deve ser memorável e refletir a essência do seu negócio. É importante verificar a disponibilidade do nome para registro e como domínio de site, evitando problemas legais e garantindo que sua marca se destaque."
              )
            }
          />
          <input
            readOnly={viewMode}
            disabled={viewMode}
            className="form-control"
            type="text"
            placeholder="Exemplo: Wl Barber"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </label>
        <label htmlFor="" className="w-100 text-start">
          <span className="required">CPF/CNPJ:</span>
          <DefaultQuestionIcon
            setView={() =>
              handleViewHelpDetailModal(
                "CPF/CNPJ",
                "Informe o CPF (para pessoas físicas) ou o CNPJ (para empresas). Use os formatos: '000.000.000-00' para CPF e '00.000.000/0000-00' para CNPJ. A validação será feita automaticamente."
              )
            }
          />
          <input
            readOnly={viewMode}
            disabled={viewMode}
            className="form-control"
            type="text"
            placeholder="CPF: 000.000.000-00 ou CNPJ: 00.000.000/0000-00 "
            value={document}
            // maxLength={14}
            onChange={(e) => setDocument(handleMask(e.target.value))}
          />
        </label>
        <label htmlFor="" className="w-100 text-start">
          <span className="required">URL: </span>
          <DefaultQuestionIcon
            setView={() =>
              handleViewHelpDetailModal(
                "URL",
                "O campo 'URL' é fundamental no sistema de agendamento, pois permite que profissionais autônomos compartilhem um link direto para sua página de agendamento, facilitando o acesso dos clientes. É importante garantir que a URL esteja no formato correto, como 'http://www.agendamento/wl_barber' ou 'https://www.agendamento/wl_barber', e que seja validada pelo sistema. " +
                  "Para criar URLs eficazes, recomenda-se ser claro e direto, utilizando palavras-chave que reflitam o serviço, evitar caracteres especiais, optar por URLs curtas e simples, considerar práticas de SEO e sempre testar o link antes de compartilhá-lo. URLs bem estruturadas não apenas melhoram a experiência do usuário, mas também ajudam a rastrear a origem dos agendamentos, otimizando estratégias de marketing."
              )
            }
          />
          <input
            readOnly={viewMode}
            disabled={viewMode}
            type="text"
            className="form-control"
            placeholder="Exemplo: wl_barber"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label htmlFor="" className="w-100 text-start">
          <span className="required">Segmento:</span>
          <DefaultQuestionIcon
            setView={() =>
              handleViewHelpDetailModal(
                "Segmento",
                "O segmento refere-se à área específica de atuação ou mercado de um usuário ou empresa. Identificá-lo ajuda a entender as necessidades dos clientes e a direcionar estratégias de marketing e desenvolvimento de produtos. Os segmentos podem incluir categorias como tecnologia, saúde e educação, facilitando a personalização de ofertas e comunicação."
              )
            }
          />
          <select
            disabled={viewMode}
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
      {!user?.business ? (
        <AlertMessage message="Atenção: Após a criação da sua empresa, você terá uma oportunidade, dentro de um período de 30 dias, para modificar os dados críticos. Após esse prazo, qualquer alteração nesses dados exigirá aprovação prévia da nossa equipe de administradores." />
      ) : (
        <>
          {!user?.business?.hasAutomaticUpdate ? (
            <AlertMessage message="Você está prestes a utilizar a sua única chance de atualização de dados críticos. Lembre-se de revisar cuidadosamente as informações antes de salvar, pois após essa alteração, novas modificações exigirão aprovação dos administradores." />
          ) : (
            <AlertMessage message="Para alterar seus dados críticos, é necessário enviar uma solicitação de atualização. Nossa equipe de administradores avaliará o pedido e você será notificado assim que a mudança for aprovada." />
          )}
        </>
      )}
      <HelpDetailModal
        title={titleHelpDetailModal}
        view={viewHelpDetailModal}
        text={textHelpDetailModal}
        setView={() => setViewHelpDetailModal(false)}
      />
      <CategorySelectModal
        viewModal={viewModal}
        setViewModal={() => setViewModal(false)}
        setSelectedCategory={(category) => setCategory(category)}
      />
      <DefaultSaveButton
        loading={loadingButton}
        title={
          user?.business?.hasAutomaticUpdate ? "Solicitar Alterações" : "Salvar"
        }
        handleSubmit={() =>
          user?.business?.hasAutomaticUpdate
            ? setViewRequestModal(true)
            : handleValidateData()
        }
      />
      <ConfirmModal
        loading={loadingButton}
        message="Após salvar informações críticas, como a identidade, você poderá realizar apenas uma correção no período de 30 dias. Após essa correção, qualquer correção adicional necessitará da aprovação dos administradores."
        title="Confirmar cadastro da empresa?"
        view={viewConfirmModal}
        setView={() => setViewConfirmModal(false)}
        handleSubmit={user?.business ? handleUpdateData : handleSaveData}
      />
    </>
  );
};

export default ContentIdentity;
