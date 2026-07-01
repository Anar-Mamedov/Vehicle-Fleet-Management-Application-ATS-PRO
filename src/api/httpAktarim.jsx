import axios from "axios";
import { handleUnauthorizedResponse } from "./http";
import { getItemWithExpiration } from "../utils/expireToken";

const httpAktarim = axios.create({
  baseURL: import.meta.env.VITE_AKTARIM_BASE_URL,
  headers: { "Content-type": "application/json" },
});

httpAktarim.interceptors.request.use(async (config) => {
  const token = await getItemWithExpiration("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
