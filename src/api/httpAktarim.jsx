import axios from "axios";
import { handleUnauthorizedResponse } from "./http";

const httpAktarim = axios.create({
  baseURL: import.meta.env.VITE_AKTARIM_BASE_URL,
  withCredentials: true,
  headers: { "Content-type": "application/json" },
});

httpAktarim.interceptors.request.use((config) => {
  const clientIdentifier = localStorage.getItem("companyKey");

  config.headers = config.headers || {};

  if (clientIdentifier) {
    config.headers.clientIdentifier = clientIdentifier;
  }

  return config;
});

httpAktarim.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => handleUnauthorizedResponse(error, httpAktarim)
);

export default httpAktarim;
