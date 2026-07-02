import axios from "axios";
import { clearAuthStorage, getItemWithExpiration, setAuthTokens } from "../utils/expireToken";

const AUTH_REFRESH_URL = "/Auth/RefreshToken";

let refreshTokenRequest = null;

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    // "User-Id": JSON.parse(localStorage.getItem("id")),
  },
});

const getAuthValue = (data, keys) => {
  if (!data) {
    return null;
  }

  const key = keys.find((item) => data[item] !== undefined && data[item] !== null);
  return key ? data[key] : null;
};

const getClientIdentifier = () => localStorage.getItem("companyKey");

const redirectToLogin = () => {
  clearAuthStorage();
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const requestNewToken = async () => {
  const response = await AxiosInstance.post(AUTH_REFRESH_URL, undefined, { skipAuthRefresh: true, withCredentials: true });
  const id = getAuthValue(response?.data, ["siraNo", "id", "userId"]);

  setAuthTokens(id);
  return true;
};

export const refreshAccessToken = () => {
  if (!refreshTokenRequest) {
    refreshTokenRequest = requestNewToken().finally(() => {
      refreshTokenRequest = null;
    });
  }

  return refreshTokenRequest;
};

export const handleUnauthorizedResponse = async (error, axiosInstance) => {
  const originalRequest = error.config;

  if (!originalRequest || error.response?.status !== 401 || originalRequest.skipAuthRefresh || originalRequest._retry) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  try {
    await refreshAccessToken();
    return axiosInstance(originalRequest);
  } catch (refreshError) {
    redirectToLogin();
    return Promise.reject(refreshError);
  }
};

AxiosInstance.interceptors.request.use((config) => {
  const hasSession = getItemWithExpiration("token");
  const clientIdentifier = getClientIdentifier();

  config.headers = config.headers || {};

  if (clientIdentifier) {
    config.headers.clientIdentifier = clientIdentifier;
  }

  // Redirect to home if user has an authenticated session and tries to access login page
  if (hasSession && window.location.pathname === "/login") {
    window.location.href = "/";
    return config;
  }

  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => handleUnauthorizedResponse(error, AxiosInstance)
);

export default AxiosInstance;
