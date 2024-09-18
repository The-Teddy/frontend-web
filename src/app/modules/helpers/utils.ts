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
function handleValidateEmail(email: string) {
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

function handleMask(v: any) {
  v = v.replace(/\D/g, "");

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return v;
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
  const dataConvertida = moment(date).format("DD/MM/YYYY, h:mm a");
  return dataConvertida;
}
function handleConvertDate(date: string) {
  const dataConvertida = moment(date).format("DD/MM/YYYY");
  return dataConvertida;
}
function handleReconvertDate(date: string) {
  const dataConvertida = `${date.slice(-4)}-${date.slice(3, 5)}-${date.slice(
    0,
    2
  )}`;
  return dataConvertida;
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
};
