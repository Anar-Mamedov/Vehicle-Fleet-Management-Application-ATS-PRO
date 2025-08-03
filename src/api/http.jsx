import axios from "axios";
import { getItemWithExpiration } from "../utils/expireToken";

// Cache için basit bir in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 dakika

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  // Timeout ayarları
  timeout: 30000, // 30 saniye
  // Retry konfigürasyonu
  retry: 3,
  retryDelay: 1000,
});

// Cache kontrolü
const getCacheKey = (config) => {
  return `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`;
};

const isCacheValid = (cacheEntry) => {
  return cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

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

  // GET istekleri için cache kontrolü
  if (config.method === "get" && !config.noCache) {
    const cacheKey = getCacheKey(config);
    const cachedResponse = cache.get(cacheKey);

    if (isCacheValid(cachedResponse)) {
      return Promise.resolve(cachedResponse.data);
    }
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    // GET istekleri için cache'e kaydet
    if (response.config.method === "get" && !response.config.noCache) {
      const cacheKey = getCacheKey(response.config);
      cache.set(cacheKey, {
        data: response,
        timestamp: Date.now(),
      });
    }

    return response;
  },
  async (error) => {
    // Retry logic
    const { config } = error;
    if (config && config.retry && config.retryCount < config.retry) {
      config.retryCount = config.retryCount || 0;
      config.retryCount++;

      // Exponential backoff
      const delay = config.retryDelay * Math.pow(2, config.retryCount - 1);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(http(config));
        }, delay);
      });
    }

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("id");
      sessionStorage.removeItem("id");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Cache temizleme fonksiyonu
export const clearCache = () => {
  cache.clear();
};

// Cache durumu kontrolü
export const getCacheStats = () => {
  return {
    size: cache.size,
    entries: Array.from(cache.keys()),
  };
};

export default http;
