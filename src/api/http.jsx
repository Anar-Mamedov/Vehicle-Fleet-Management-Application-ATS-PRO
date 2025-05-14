import axios from "axios";
import { getItemWithExpiration } from "../utils/expireToken";

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    // "User-Id": JSON.parse(localStorage.getItem("id")),
  },
});

http.interceptors.request.use(async (config) => {
  const token = await getItemWithExpiration("token");

  // Redirect to home if user has a valid token and tries to access login page
  if (token && window.location.pathname === "/login") {
    window.location.href = "/";
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("id");
      sessionStorage.removeItem("id");
      /*  localStorage.removeItem("token_expire"); */
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"; // `/auth` sayfasına yönlendir
      }
    }
    return Promise.reject(error);
  }
);

export default http;
