import moment from "moment";
import { toast } from "react-toastify";

function handleConverterId(binaryId: Buffer | undefined): string {
  const hex = binaryId?.toString("hex");
  const uuid = `${hex?.slice(0, 8)}-${hex?.slice(8, 4)}-${hex?.slice(
    12,
    4
  )}-${hex?.slice(16, 4)}-${hex?.slice(20)}`;
  return uuid;
}
function handleValidateEmail(email: string): boolean {
  const emailRegex: RegExp =
    /^(?=[a-zA-Z0-9._%+-]{1,256}@)(?!@)(?!.*@.*@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}
function handleValidateEmailCode(code: string | null) {
  const codeRegex = /^[0-9]{6}$/;

  if (!code) {
    return { isValid: false, message: "O código não pode estar vazio." };
  }

  if (!codeRegex.test(code)) {
    return {
      isValid: false,
      message: "O código deve ter exatamente 6 dígitos numéricos.",
    };
  }

  return { isValid: true, message: "Código válido." };
}
function handleIsNumber(input: string): string {
  return input.replace(/\D/g, "");
}
function handleGetEnvVariable() {
  return process.env.REACT_APP_API_URL + "/";
}
function handleGetHeaders(contentType: string, token?: string | null) {
  const headers: any = {
    Accept: "application/json",
    "Content-Type": contentType,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

function handleMask(value: string): string {
  // Remove todos os caracteres não numéricos
  value = value.replace(/\D/g, "");

  // Limita o valor a 14 caracteres (tamanho máximo de um CNPJ)
  if (value.length > 14) {
    value = value.substring(0, 14);
  }

  // Aplica a máscara para CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (value.length <= 11) {
    // CPF: 000.000.000-00
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // CNPJ: 00.000.000/0000-00
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }

  return value;
}

function handleMaskCnpj(v: any) {
  v = v.replace(/\D/g, "");

  v = v.replace(/^(\d{2})(\d)/, "$1.$2");
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
  v = v.replace(/(\d{4})(\d)/, "$1-$2");

  return v;
}

function handleConvertDateAndTime(date: Date) {
  const convertedDate = moment(date).format("DD/MM/YYYY, h:mm a");
  return convertedDate;
}
function handleConvertDate(date: Date) {
  const convertedDate = moment(date).format("DD/MM/YYYY");
  return convertedDate;
}
function handleReconvertDate(date: string) {
  const convertedDate = `${date.slice(-4)}-${date.slice(3, 5)}-${date.slice(
    0,
    2
  )}`;
  return convertedDate;
}
function convertDateToISO(date: string): string | null {
  const dateParts = date.split("/");

  // Verifica se temos três partes (dia, mês, ano)
  if (dateParts.length !== 3) return null;

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  // Verifica se os valores de dia, mês e ano são válidos
  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year.toString().length !== 4
  ) {
    return null;
  }

  // Retorna no formato ISO 8601
  return `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

function handleValidateDate(date: any) {
  const dateFormatInput = moment(date).format("YYYY-MM-DD");
  const dateFormatToday = moment().format("YYYY-MM-DD");
  const dateInput = dateFormatInput.replace(/[^a-zA-Z0-9]/g, "");
  const dateToday = dateFormatToday.replace(/[^a-zA-Z0-9]/g, "");

  if (dateInput.length === 8) {
    if (dateInput.slice(4, 6) <= dateToday.slice(4, 6)) {
      if (
        dateInput.slice(6, 8) <= "00" ||
        dateInput.slice(6, 8) > "31" ||
        dateInput.slice(6, 8) < dateToday.slice(6, 8)
      ) {
        return "Invalid date";
      }
    }
    if (
      dateInput.slice(4, 6) <= "00" ||
      dateInput.slice(4, 6) > "12" ||
      dateInput.slice(4, 6) < dateToday.slice(4, 6)
    ) {
      return "Invalid date";
    }
    if (dateInput.slice(0, 4) < dateToday.slice(0, 4)) {
      return "Invalid date";
    }
  } else {
    return "Invalid date";
  }
  return false;
}

function handleDownload(data: any, name: any, extension: any) {
  let filename = `${name.replaceAll(" ", "_")}.${extension}`;
  filename = decodeURI(filename);
  const url = window.URL.createObjectURL(new Blob([data.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
}

function handleReponse(type: string, data: any) {
  if (type === "error") {
    if (data.response.status === 422) {
      if (data.response.data.errors) {
        let errorValue =
          data.response.data.errors[
            Object.keys(data.response.data.errors)[0]
          ][0];
        toast.error(errorValue);
      }
    } else {
      toast.error(data.response.data.message);
    }
  }
}
function handleValidateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cpf.substring(10, 11));
}

function handleValidateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let remainder = sum % 11;
  let checkDigit = remainder < 2 ? 0 : 11 - remainder;
  if (checkDigit !== parseInt(digits.charAt(0))) return false;

  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  remainder = sum % 11;
  checkDigit = remainder < 2 ? 0 : 11 - remainder;
  return checkDigit === parseInt(digits.charAt(1));
}

function handleValidateDocument(document: string): boolean {
  document = document.replace(/\D/g, "");

  if (document.length === 11) {
    return handleValidateCPF(document);
  } else if (document.length === 14) {
    return handleValidateCNPJ(document);
  }

  return false;
}
function handleIsValidDate(dateString: string): boolean {
  // Verifica o formato da data DD/MM/YYYY
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(regex);

  if (!match) return false;

  const day = parseInt(match[1]);
  const month = parseInt(match[2]);
  const year = parseInt(match[3]);

  // Verifica se o mês está entre 1 e 12
  if (month < 1 || month > 12) return false;

  // Dias máximos por mês (considerando fevereiro com 28 dias)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Verifica se é um ano bissexto e ajusta o mês de fevereiro
  if (month === 2 && handleIsLeapYear(year)) {
    daysInMonth[1] = 29;
  }

  // Verifica se o dia está dentro do limite do mês
  return day > 0 && day <= daysInMonth[month - 1];
}

// Função para verificar se é um ano bissexto
function handleIsLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function handleError(error: any) {
  if (error.response && error.response.data) {
    if (Array.isArray(error.response.data.message)) {
      toast.error(error.response.data.message.join(" "));
    } else if (typeof error.response.data.message === "string") {
      toast.error(error.response.data.message);
    } else {
      toast.error("Ocorreu um erro inesperado.");
    }
  }
}
function handleValidatePassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

  return regex.test(password);
}

export {
  handleConverterId,
  handleValidateEmail,
  handleValidateEmailCode,
  handleIsNumber,
  handleGetEnvVariable,
  handleGetHeaders,
  handleMask,
  handleMaskCnpj,
  handleReponse,
  handleDownload,
  handleConvertDate,
  handleConvertDateAndTime,
  handleValidateDate,
  handleReconvertDate,
  handleValidateDocument,
  handleIsValidDate,
  convertDateToISO,
  handleError,
  handleValidatePassword,
};
