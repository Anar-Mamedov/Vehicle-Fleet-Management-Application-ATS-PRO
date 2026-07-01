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

const redirectToLogin = () => {
  clearAuthStorage();
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const requestNewToken = async () => {
  const response = await AxiosInstance.post(AUTH_REFRESH_URL, undefined, { skipAuthRefresh: true, withCredentials: true });
  const accessToken = getAuthValue(response?.data, ["accessToken", "token"]);
  const newRefreshToken = getAuthValue(response?.data, ["refreshToken"]);
  const id = getAuthValue(response?.data, ["siraNo", "id", "userId"]);

  if (!accessToken) {
    throw new Error("Refresh token response did not include access token.");
  }

  setAuthTokens(accessToken, newRefreshToken, id);
  return accessToken;
};

const refreshAccessToken = () => {
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

  const token = getItemWithExpiration("token");
  if (!token) {
    redirectToLogin();
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  try {
    const accessToken = await refreshAccessToken();
    originalRequest.headers = originalRequest.headers || {};
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return axiosInstance(originalRequest);
  } catch (refreshError) {
    redirectToLogin();
    return Promise.reject(refreshError);
  }
};

AxiosInstance.interceptors.request.use(async (config) => {
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

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => handleUnauthorizedResponse(error, AxiosInstance)
);

export default AxiosInstance;
