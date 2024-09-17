import axios from "axios";
import { handleGetHeaders } from "./utils";
import {
  LoginInterface,
  RecoveryPasswordInterface,
} from "../auth/user.interface";
import { CreateCategoryInterface } from "../pages/category/CategoryInterface";

const api = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  authorization: token,
};

// export function createUser(data: any) {
//   return axios.post(`${api}/user/create`, data, { headers });
// }
//Rotas "públicas"
export function createUser(data: any) {
  return axios.post(`${api}/user/create`, data, {
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
export function uploadLogoUser(data: FormData, token: string) {
  return axios.put(`${api}/upload/logo`, data, {
    headers: handleGetHeaders("multipart/form-data", token),
  });
}
export function uploadCoverUser(data: FormData, token: string) {
  return axios.put(`${api}/upload/cover`, data, {
    headers: handleGetHeaders("multipart/form-data", token),
  });
}

//users
export function getUser(token: string) {
  return axios.get(`${api}/user`, {
    headers: handleGetHeaders("application/json", token),
  });
}

//categories
export function getAllCategories(token: string) {
  return axios.get(`${api}/category`, {
    headers: handleGetHeaders("application/json", token),
  });
}

export function createCategory(data: CreateCategoryInterface, token: string) {
  return axios.post(`${api}/category/create`, data, {
    headers: handleGetHeaders("application/json", token),
  });
}

//generic functions

export function getAllDataWithPagination(
  page: number,
  limit: number = 10,
  token: string,
  url: string
) {
  return axios.get(`${api}/${url}?page=${page}&limit=${limit}`, {
    headers: handleGetHeaders("application/json", token),
  });
}
export function getOneById(id: number, token: string, url: string) {
  return axios.get(`${api}/${url}?id=${id}`, {
    headers: handleGetHeaders("application/json", token),
  });
}
