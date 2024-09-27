import React, { useState } from "react";
import DefaultQuestionIcon from "../default-question-icon/DefaultQuestionIcon";
import HelpDetailModal from "../modals/help-detail-modal/HelpDetailModal";
import CategorySelectModal from "../modals/category-select-modal/CategorySelectModal";

const ContentIdentity = () => {
  const [titleHelpDetailModal, setTitleHelpDetailModal] = useState<string>("");
  const [textHelpDetailModal, setTextHelpDetailModal] = useState<string>("");
  const [viewHelpDetailModal, setViewHelpDetailModal] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("Selecione...");
  const [viewModal, setViewModal] = useState<boolean>(false);

  return (
    <>
      <div className="box-content" id="business-identity">
        <label htmlFor="" className="w-100 text-start">
          <span className="required">Nome Comercial:</span>
          <DefaultQuestionIcon
            setView={() => {
              setTitleHelpDetailModal("Nome Comercial");
              setTextHelpDetailModal(
                "O nome comercial é a designação pela qual sua empresa será conhecida no mercado. Ele deve ser memorável e refletir a essência do seu negócio. É importante verificar a disponibilidade do nome para registro e como domínio de site, evitando problemas legais e garantindo que sua marca se destaque."
              );
              setViewHelpDetailModal(!viewHelpDetailModal);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Exemplo: Wl Barber"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="" className="w-100 text-start">
          <span className="required">URL: </span>
          <DefaultQuestionIcon
            setView={() => {
              setTitleHelpDetailModal("URL");
              setTextHelpDetailModal(
                "O campo 'URL' é fundamental no sistema de agendamento, pois permite que profissionais autônomos compartilhem um link direto para sua página de agendamento, facilitando o acesso dos clientes. É importante garantir que a URL esteja no formato correto, como 'http://www.agendamento/wl_barber' ou 'https://www.agendamento/wl_barber', e que seja validada pelo sistema. " +
                  "Para criar URLs eficazes, recomenda-se ser claro e direto, utilizando palavras-chave que reflitam o serviço, evitar caracteres especiais, optar por URLs curtas e simples, considerar práticas de SEO e sempre testar o link antes de compartilhá-lo. URLs bem estruturadas não apenas melhoram a experiência do usuário, mas também ajudam a rastrear a origem dos agendamentos, otimizando estratégias de marketing."
              );
              setViewHelpDetailModal(!viewHelpDetailModal);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Exemplo: wl_barber"
          />
        </label>
        <label htmlFor="" className="w-100 text-start">
          <span className="required">Segmento:</span>
          <DefaultQuestionIcon
            setView={() => {
              setTitleHelpDetailModal("Segmento");
              setTextHelpDetailModal(
                "O segmento refere-se à área específica de atuação ou mercado de um usuário ou empresa. Identificá-lo ajuda a entender as necessidades dos clientes e a direcionar estratégias de marketing e desenvolvimento de produtos. Os segmentos podem incluir categorias como tecnologia, saúde e educação, facilitando a personalização de ofertas e comunicação."
              );
              setViewHelpDetailModal(!viewHelpDetailModal);
            }}
          />
          <select
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
    </>
  );
};

export default ContentIdentity;
