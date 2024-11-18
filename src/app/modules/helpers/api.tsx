import axios from "axios";
import { handleGetHeaders, handleGetStaticsHeaders } from "./utils";
import {
  LoginInterface,
  RecoveryPasswordInterface,
  updateDataUserInterface,
  UpdateEmaiUserInterface,
  UpdatePasswordUserInterface,
} from "../auth/user.interface";
import {
  CreateCategoryInterface,
  UpdateCategoryInterface,
} from "../pages/category/CategoryInterface";
import {
  ContentIdentityInterface,
  ContentProfileInterface,
} from "../interfaces/ProviderInterfaces";

const api = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

// export function createUser(data: any) {
//   return axios.post(`${api}/user/create`, data, { headers });
// }
//Rotas "públicas"
export function createUser(data: any) {
  return axios.post(`${api}/user`, data, {
    headers: handleGetHeaders("application/json"),
  });
}
export function login(data: LoginInterface) {
  return axios.post(`${api}/auth/login`, data, {
    headers: handleGetHeaders("application/json"),
  });
}

export function recoveryPassword(data: RecoveryPasswordInterface) {
  return axios.post(`${api}/auth/change-password`, data, {
    headers: handleGetHeaders("application/json"),
  });
}
export function sendCodeEmail(email: string) {
  return axios.post(
    `${api}/email/send-code`,
    { email },
    { headers: handleGetHeaders("application/json") }
  );
}

//Rotas "privadas"

//uploads
export function uploadLogoProvider(data: FormData, token: string) {
  return axios.put(`${api}/upload/logo`, data, {
    headers: handleGetStaticsHeaders(token),
  });
}
export function uploadCoverProvider(data: FormData, token: string) {
  return axios.put(`${api}/upload/cover`, data, {
    headers: handleGetStaticsHeaders(token),
  });
}

//users
export function getUser(token: string | null) {
  return axios.get(`${api}/user`, {
    headers: handleGetHeaders("application/json", token),
  });
}
export function updateDataUser(data: updateDataUserInterface, token: string) {
  return axios.put(`${api}/user`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}
export function updateEmailUser(data: UpdateEmaiUserInterface, token: string) {
  return axios.put(`${api}/user/email`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}
export function updatePasswordUser(
  data: UpdatePasswordUserInterface,
  token: string
) {
  return axios.put(`${api}/user/password`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}

//categories
export function createCategory(data: CreateCategoryInterface, token: string) {
  return axios.post(`${api}/category`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}
export function getAllCategories(token: string) {
  return axios.get(`${api}/category`, {
    headers: handleGetHeaders("application/json", token),
  });
}
export function updateCategory(data: UpdateCategoryInterface, token: string) {
  return axios.put(`${api}/category`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}

//generic functions

export function getAllDataWithPagination(
  page: number,
  limit: number = 10,
  searchTerm: string,
  token: string,
  url: string
) {
  return axios.get(
    `${api}/${url}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    {
      headers: handleGetHeaders("application/json", token),
    }
  );
}
export function getOneById(id: number, token: string, url: string) {
  return axios.get(`${api}/${url}?id=${id}`, {
    headers: handleGetHeaders("application/json", token),
  });
}

//Providers

export function createCriticalDataProvider(
  data: ContentIdentityInterface,
  token: string
) {
  return axios.post(`${api}/provider`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}

export function updateCriticalDataProvider(
  data: ContentIdentityInterface,
  token: string
) {
  return axios.put(`${api}/provider/critical`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}

export function updateProviderData(
  data: ContentProfileInterface,
  token: string
) {
  return axios.put(`${api}/provider/data`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}

//E-mail

export function sendCodeToChangeEmail(email: string, token: string) {
  return axios.post(
    `${api}/email/send-code-change-email`,
    { email },
    { headers: handleGetHeaders("application/json", token) }
  );
}
