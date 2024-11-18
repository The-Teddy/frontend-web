import { useContext, useEffect, useState } from "react";
import "./ContentProfile.scss";
import { toast } from "react-toastify";
import DefaultSaveButton from "../../buttons/DefaultSaveButton";
import ConfirmModal from "../../modals/confirm-modal/ConfirmModal";
import {
  updateProviderData,
  uploadCoverProvider,
  uploadLogoProvider,
} from "../../../helpers/api";
import {
  handleError,
  handleGetDataByPostalCode,
  handlePhoneMask,
  handlePostalCodeMask,
} from "../../../helpers/utils";
import { Context } from "../../../auth/AuthContext";
import { ContentProfileInterface } from "../../../interfaces/ProviderInterfaces";
import {
  handleValidateLogo,
  handleValidateCity,
  handleValidateComplement,
  handleValidateHouseNumber,
  handleValidateNeighborhood,
  handleValidatePhoneNumber,
  handleValidatePostalCode,
  handleValidateStreet,
  handleValidateUF,
  handleValidateCover,
} from "../../../helpers/validators";
import DefaultCancelButton from "../../buttons/default-cancel-button/DefaultCancelButton";

const ContentProfile = () => {
  const { token, user } = useContext(Context);
  const [imageLogo, setImageLogo] = useState<any>(null);
  const [imageCover, setImageCover] = useState<any>(null);
  const [imageLogoUrl, setImageLogoUrl] = useState<any>(null);
  const [imageCoverUrl, setImageCoverUrl] = useState<any>(null);
  const [about, setAbout] = useState<string>("");
  const [viewConfirmModal, setViewConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [complement, setComplement] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [noNumber, setNoNumber] = useState<boolean>(false);
  const [loadingLogo, setLoadingLogo] = useState<boolean>(false);
  const [ĺoadingCover, setLoadingCover] = useState<boolean>(false);

  const api = process.env.REACT_APP_API_URL;

  function handleUpdateProviderLogo() {
    handleValidateLogo(imageLogo);
    const formData = new FormData();
    formData.append("file", imageLogo);
    if (user?.business.logo) {
      formData.append("old_path_logo", user?.business.logo);
    }
    setLoadingLogo(true);
    uploadLogoProvider(formData, token)
      .then((res) => {
        if (user) {
          user.business.logo = res.data.logo;
        }
        toast.success(res.data.message);
        setImageLogo(null);
        setImageLogoUrl(null);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoadingLogo(false);
      });
  }
  function handleUpdateProviderCover() {
    handleValidateCover(imageCover);
    const formData = new FormData();
    formData.append("file", imageCover);
    if (user?.business.cover) {
      formData.append("old_path_cover", user?.business.cover);
    }

    setLoadingCover(true);

    uploadCoverProvider(formData, token)
      .then((res) => {
        if (user) {
          user.business.cover = res.data.cover;
        }
        toast.success(res.data.message);
        setImageCover(null);
        setImageCoverUrl(null);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoadingCover(false);
      });
  }
  function handleUpdateProviderData() {
    const data: ContentProfileInterface = {
      about: about,
      phoneNumber: phoneNumber,
      postalCode: postalCode,
      street: street,
      number: houseNumber ? houseNumber : "S/N",
      complement: complement,
      neighborhood: neighborhood,
      city: city,
      state: state,
      reference: reference,
    };
    setLoading(true);
    updateProviderData(data, token)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setViewConfirmModal(false);
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleImages(files: any, isLogo: boolean) {
    if (isLogo) {
      setImageLogo(files[0]);
      const logoFile = files[0];

      if (logoFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageLogoUrl(reader.result);
        };
        reader.readAsDataURL(logoFile);
      }
    } else {
      setImageCover(files[0]);
      const coverFile = files[0];

      if (coverFile) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImageCoverUrl(reader.result);
        };
        reader.readAsDataURL(coverFile);
      }
    }
  }
  function handleOpenChooseFiles(id: string) {
    const inputFile = document.getElementById(id);

    if (inputFile) {
      inputFile.click();
    }
  }

  async function handleDataPostalCode(postalCode: string) {
    setPostalCode(postalCode);
    if (postalCode.length === 9) {
      const addressData = await handleGetDataByPostalCode(
        postalCode.replace("-", "")
      );

      if (addressData) {
        setStreet(addressData.logradouro);
        setComplement(addressData.complement);
        setNeighborhood(addressData.bairro);
        setCity(addressData.localidade);
        setState(addressData.uf);
      }
    }
  }

  function handleValidateData() {
    if (about.length < 100 || about.length > 500) {
      return toast.warning(
        "O campo 'sobre' deve ter entre 100 e 500 caracteres e pode conter apenas letras, números e caracteres especiais comuns."
      );
    }

    if (!handleValidatePhoneNumber(phoneNumber)) {
      return toast.warning("Insira um número de telefone válido");
    }
    if (!handleValidatePostalCode(postalCode)) {
      return toast.warning("Insira um CEP válido");
    }
    if (!handleValidateStreet(street)) {
      return toast.warning(
        "O nome da rua deve conter pelo menos 3 caracteres e pode incluir letras, números, espaços, hífens e pontos."
      );
    }

    if (!noNumber) {
      if (!houseNumber) {
        return toast.warning(
          "Insira um número válido. O número do endereço pode conter apenas números ou números seguidos de uma letra (ex: 10A)."
        );
      } else {
        if (!handleValidateHouseNumber(houseNumber)) {
          return toast.warning(
            "Insira um número válido. O número do endereço pode conter apenas números ou números seguidos de uma letra (ex: 10A)."
          );
        }
      }
    }
    if (complement && !handleValidateComplement(complement)) {
      return toast.warning(
        "O complemento do endereço pode conter números, letras e espaços, mas não pode ter caracteres especiais."
      );
    }
    if (!handleValidateNeighborhood(neighborhood)) {
      return toast.warning(
        "O bairro deve ter pelo menos 3 caracteres e deve conter apenas letras, espaços, apóstrofos ou hífens."
      );
    }
    if (!handleValidateCity(city)) {
      return toast.warning(
        "A cidade deve ter pelo menos 3 caracteres e deve conter apenas letras, espaços, apóstrofos ou hífens."
      );
    }
    if (!handleValidateUF(state)) {
      return toast.warning("Selecione seu Estado");
    }
    if (reference) {
      if (reference.length < 10 || reference.length > 500) {
        return toast.warning(
          "A referência deve ter pelos menos 10 e até 255 caracteres e deve conter apenas letras, números, espaços, vírgulas, pontos, apóstrofos e hifens."
        );
      }
    }
    setViewConfirmModal(true);
  }

  useEffect(() => {
    if (user?.business.about) {
      setAbout(user?.business?.about);
    }
    if (user?.business.phoneNumberCommercial) {
      setPhoneNumber(user?.business.phoneNumberCommercial);
    }
    if (user?.business.postalCode) {
      setPostalCode(user?.business.postalCode);
    }
    if (user?.business.street) {
      setStreet(user?.business.street);
    }
    if (user?.business.number) {
      if (user?.business.number === "S/N") {
        setNoNumber(true);
      } else {
        setNoNumber(false);
        setHouseNumber(user?.business.number);
      }
    }
    if (user?.business.complement) {
      setComplement(user?.business.complement);
    }
    if (user?.business.neighborhood) {
      setNeighborhood(user?.business.neighborhood);
    }
    if (user?.business.city) {
      setCity(user?.business.city);
    }

    if (user?.business.state) {
      setState(user?.business.state);
    }
    if (user?.business.reference) {
      setReference(user?.business.reference);
    }
  }, [user?.business]);

  useEffect(() => {
    setHouseNumber("");
  }, [noNumber]);

  return (
    <div id="content-profile" className="content-box max-width-default">
      <div className="data-box form-control">
        <p className="sub-title mt-3">Informações do Perfil</p>
        <label htmlFor="" className="w-100 text-start mt-3">
          <span className="required">Sobre:</span>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-100 mt-2"
            rows={5}
            placeholder="Exemplo: A Barbearia XYZ é um espaço dedicado ao cuidado e estilo masculino, oferecendo cortes clássicos e modernos, barba feita com perfeição e uma experiência relaxante para nossos clientes. Nosso compromisso é garantir um atendimento de qualidade e um ambiente acolhedor."
          ></textarea>
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          <span className="required">Número de Telefone:</span>
          <input
            type="text"
            className="form-control"
            placeholder="Exemplo: (99) 99999-9999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(handlePhoneMask(e.target.value))}
          />
        </label>

        <label htmlFor="" className="w-100 text-start mt-3">
          <span className="required">CEP:</span>
          <input
            type="text"
            className="form-control"
            placeholder="Exemplo: 25243059"
            value={postalCode}
            onChange={(e) =>
              handleDataPostalCode(handlePostalCodeMask(e.target.value))
            }
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          <span className="required">Rua:</span>
          <input
            type="text"
            className="form-control"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Exemplo: Rua Projeteda B"
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          <span className="required">Número:</span>
          <input
            type="text"
            className="form-control"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="Exemplo: 10 ou  200c"
            disabled={noNumber}
            readOnly={noNumber}
          />
        </label>
        <label htmlFor="" className="text-start w-100 mt-2 mb-3">
          <span>Sem número: </span>
          <input
            type="checkbox"
            checked={noNumber}
            onChange={(e) => setNoNumber(!noNumber)}
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          <span>Complemento:</span>
          <input
            type="text"
            className="form-control"
            value={complement ? complement : ""}
            onChange={(e) => setComplement(e.target.value)}
            placeholder="Exemplo: LT 12 ou QD 5"
          />
        </label>

        <label htmlFor="" className="w-100 text-start mt-3">
          <span className="required">Bairro:</span>
          <input
            type="text"
            className="form-control"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="Exemplo: Parque Santa Lúcia"
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          <span className="required">Cidade:</span>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Exemplo: Duque de Caxias"
          />
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          <span className="required">UF:</span>
          <select
            name="state"
            id="state"
            className="form-select"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Selecione o estado</option>
            <option value="AC">Acre (AC)</option>
            <option value="AL">Alagoas (AL)</option>
            <option value="AP">Amapá (AP)</option>
            <option value="AM">Amazonas (AM)</option>
            <option value="BA">Bahia (BA)</option>
            <option value="CE">Ceará (CE)</option>
            <option value="DF">Distrito Federal (DF)</option>
            <option value="ES">Espírito Santo (ES)</option>
            <option value="GO">Goiás (GO)</option>
            <option value="MA">Maranhão (MA)</option>
            <option value="MT">Mato Grosso (MT)</option>
            <option value="MS">Mato Grosso do Sul (MS)</option>
            <option value="MG">Minas Gerais (MG)</option>
            <option value="PA">Pará (PA)</option>
            <option value="PB">Paraíba (PB)</option>
            <option value="PR">Paraná (PR)</option>
            <option value="PE">Pernambuco (PE)</option>
            <option value="PI">Piauí (PI)</option>
            <option value="RJ">Rio de Janeiro (RJ)</option>
            <option value="RN">Rio Grande do Norte (RN)</option>
            <option value="RS">Rio Grande do Sul (RS)</option>
            <option value="RO">Rondônia (RO)</option>
            <option value="RR">Roraima (RR)</option>
            <option value="SC">Santa Catarina (SC)</option>
            <option value="SP">São Paulo (SP)</option>
            <option value="SE">Sergipe (SE)</option>
            <option value="TO">Tocantins (TO)</option>
          </select>
        </label>
        <label htmlFor="" className="w-100 text-start mt-3">
          <span>Referência:</span>
          <textarea
            value={reference ? reference : ""}
            onChange={(e) => setReference(e.target.value)}
            className="w-100 mt-2"
            rows={5}
            placeholder="Ex: Próximo à escola, ao lado da farmácia"
          ></textarea>
        </label>
        <DefaultSaveButton
          title="Salvar"
          handleSubmit={() => handleValidateData()}
        />
      </div>
      <p className="sub-title mt-5">Identidade Visual</p>
      <div className="mt-5 form-control">
        <label htmlFor="" className="w-100 text-start">
          <span className="required">Logo:</span>
          <div className="logo-box">
            <img
              crossOrigin="anonymous"
              className="preview-logo"
              src={
                imageLogoUrl
                  ? imageLogoUrl
                  : user?.business?.logo
                  ? `${api}/${user.business.logo}`
                  : "/images/blank-image.jpg"
              }
              alt="Logo da marca"
              onClick={() => handleOpenChooseFiles("logo-file")}
            />
          </div>
          <input
            style={{ display: "none" }}
            id="logo-file"
            type="file"
            onChange={(e) => handleImages(e.target.files, true)}
            className="form-control"
            accept="image/*"
          />
        </label>
        <p className="info-text text-center">
          Máximo de 2 MB | Formatos aceitos: PNG, JPEG, JPG, WEBP
        </p>
        {imageLogoUrl ? (
          <div className="buttons-box">
            <DefaultCancelButton
              title="Cancelar"
              handleSubmit={() => {
                setImageLogo(null);
                setImageLogoUrl(null);
              }}
            />
            <DefaultSaveButton
              title="Salvar"
              loading={loadingLogo}
              handleSubmit={handleUpdateProviderLogo}
            />
          </div>
        ) : null}
      </div>
      <div className="form-control  mt-3">
        <label htmlFor="" className="w-100 text-start">
          <span className="required">Capa:</span>
          <div className="cover-box">
            <img
              crossOrigin="anonymous"
              className="preview-cover"
              src={
                imageCoverUrl
                  ? imageCoverUrl
                  : user?.business?.cover
                  ? `${api}/${user.business.cover}`
                  : "/images/image.png"
              }
              alt="Capa da marca"
              onClick={() => handleOpenChooseFiles("cover-file")}
            />
          </div>

          <input
            style={{ display: "none" }}
            id="cover-file"
            type="file"
            onChange={(e) => handleImages(e.target.files, false)}
            className="form-control"
            accept="image/*"
          />
        </label>
        <p className="info-text text-center">
          Máximo de 5 MB | Formatos aceitos: PNG, JPEG, JPG, WEBP
        </p>
        {imageCoverUrl ? (
          <div className="buttons-box">
            <DefaultCancelButton
              title="Cancelar"
              handleSubmit={() => {
                setImageCover(null);
                setImageCoverUrl(null);
              }}
            />
            <DefaultSaveButton
              title="Salvar"
              loading={ĺoadingCover}
              handleSubmit={handleUpdateProviderCover}
            />
          </div>
        ) : null}
      </div>
      <ConfirmModal
        view={viewConfirmModal}
        title="Confirmar alteração dos dados?"
        handleSubmit={handleUpdateProviderData}
        loading={loading}
        setView={() => setViewConfirmModal(false)}
      />
    </div>
  );
};

export default ContentProfile;
