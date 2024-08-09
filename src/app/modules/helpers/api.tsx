import axios from "axios";

const api = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  authorization: token,
};

export function createUser(data: any) {
  return axios.post(`${api}/auth/register`, data, { headers });
}
