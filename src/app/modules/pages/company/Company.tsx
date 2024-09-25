import { useContext, useState } from "react";
import { Context } from "../../auth/AuthContext";
import CategorySelectModal from "../../partials/modals/category-select-modal/CategorySelectModal";
import { Load } from "../../partials/Spinner";
import "./Company.scss";
import DefaultQuestionIcon from "../../partials/modals/default-question-icon/DefaultQuestionIcon";
import HelpDetailModal from "../../partials/modals/help-detail-modal/HelpDetailModal";

const Company = () => {
  const { token } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("Selecione...");
  const [imageLogo, setImageLogo] = useState<File | null>(null);
  const [imageCover, setImageCover] = useState<File | null>(null);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [viewHelpDetailModal, setViewHelpDetailModal] =
    useState<boolean>(false);
  const [titleHelpDetailModal, setTitleHelpDetailModal] = useState<string>("");
  const [textHelpDetailModal, setTextHelpDetailModal] = useState<string>("");
  const [about, setAbout] = useState<string>("");

  return (
    <div id="company" className="background-default">
      <p className="title">Gerenciar Empresa</p>

      {loading ? (
        <div className="load-center">
          <Load />
        </div>
      ) : (
        <>
          <div className="box-control row">
            {/* <div className="box-control">
              <p className="title">Gerenciar Empresa</p>
              <DefaultBackButton title="Voltar" path="/categoria" />
            </div> */}
          </div>
          <div className="box-content">
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
            <label htmlFor="" className="w-100 text-start">
              <span className="required"> Apresentação:</span>{" "}
              <DefaultQuestionIcon
                setView={() => {
                  setTitleHelpDetailModal("Apresentação");
                  setTextHelpDetailModal(
                    "A apresentação é um espaço para você se apresentar aos seus clientes e compartilhar sua história. Utilize este campo para descrever sua experiência profissional, seu estilo de trabalho e os valores que orientam sua prática. Ao incluir informações sobre sua trajetória e paixão pela área, você ajuda os clientes a entenderem quem você é e o que pode oferecer, criando uma conexão mais autêntica e memorável."
                  );
                  setViewHelpDetailModal(!viewHelpDetailModal);
                }}
              />
              <textarea
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
                maxLength={300}
                rows={7}
                className="form-control"
                placeholder="Exemplo: Com uma paixão inabalável pela arte da barbearia, Wl_Barber transforma cada corte em uma experiência única. Com anos de experiência no setor, ele combina técnicas tradicionais com as últimas tendências para oferecer estilos personalizados que realçam a personalidade de cada cliente. Seu compromisso com a qualidade e a satisfação do cliente garante que cada visita seja mais do que um simples corte de cabelo—é um momento de cuidado e renovação. Venha experimentar um serviço excepcional e sair com um visual que você vai adorar!."
              />
            </label>
          </div>
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
    </div>
  );
};

export default Company;
