import { toast } from "react-toastify";
import { ContentProfileInterface } from "../global/interfaces/ProviderInterfaces";

const supportedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

function handleValidateCover(imageCover: any) {
  if (!imageCover) {
    return toast.warning("Escolha uma imagem para sua capa");
  }
  if (!supportedFormats.includes(imageCover.type)) {
    return toast.warning("Tipo de arquivo não suportado!");
  }
  if (imageCover.size > 5000000) {
    return toast.warning("A imagem não pode exceder 5mb");
  }
}
function handleValidateLogo(imageLogo: any) {
  if (!imageLogo) {
    return toast.warning("Escolha uma imagem para sua logo");
  }

  if (!supportedFormats.includes(imageLogo.type)) {
    return toast.warning("Tipo de arquivo não suportado");
  }
  if (imageLogo.size > 2000000) {
    return toast.warning("A imagem não pode exceder 2mb");
  }
}

function handleValidatePhoneNumber(phoneNumber: string) {
  const phoneNumberRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

  return phoneNumberRegex.test(phoneNumber);
}
function handleValidatePostalCode(postalCode: string) {
  const postalCodeRegex = /^\d{5}-\d{3}$/;

  return postalCodeRegex.test(postalCode);
}
function handleValidateStreet(street: string) {
  const streetRegex = /^[a-zA-Z0-9\s\-\.]{3,}$/; // Permite letras, números, espaços, hífens e pontos
  return streetRegex.test(street?.trim());
}
function handleValidateHouseNumber(number: string) {
  const numberRegex = /^[0-9A-Za-z]{1,}$/; // Permite números e letras (mínimo 1 caractere)

  return numberRegex.test(number?.trim());
}
function handleValidateComplement(complement: string) {
  const complementRegex = /^[0-9A-Za-z\s]*$/; // Permite números, letras e espaços

  return complementRegex.test(complement?.trim());
}
function handleValidateNeighborhood(neighborhood: string) {
  const neighborhoobRegex = /^[a-zA-ZÀ-ÿ'´`-]{3,255}(?: [a-zA-ZÀ-ÿ'´`-]+)*$/;

  return neighborhoobRegex.test(neighborhood?.trim());
}
function handleValidateCity(city: string) {
  const cityRegex = /^[a-zA-ZÀ-ÿ'´`-]{3,255}(?: [a-zA-ZÀ-ÿ'´`-]+)*$/;

  return cityRegex.test(city?.trim());
}
function handleValidateUF(UF: string) {
  const UFRegex = /^[A-Z]{2}$/;

  return UFRegex.test(UF?.trim());
}

export {
  handleValidateCover,
  handleValidateLogo,
  handleValidatePhoneNumber,
  handleValidatePostalCode,
  handleValidateStreet,
  handleValidateHouseNumber,
  handleValidateComplement,
  handleValidateNeighborhood,
  handleValidateCity,
  handleValidateUF,
};
