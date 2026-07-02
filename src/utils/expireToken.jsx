const SENSITIVE_AUTH_STORAGE_KEYS = ["token", "refreshToken"];
const AUTH_STORAGE_KEYS = [...SENSITIVE_AUTH_STORAGE_KEYS, "id"];

let hasAuthenticatedSession = false;

const getStorageByRemember = (remember) => (remember === true ? localStorage : sessionStorage);

const getOtherStorageByRemember = (remember) => (remember === true ? sessionStorage : localStorage);

const setJsonItem = (storage, key, value) => {
  if (value !== undefined && value !== null) {
    storage.setItem(key, JSON.stringify(value));
  }
};

const clearSensitiveAuthStorage = () => {
  SENSITIVE_AUTH_STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

clearSensitiveAuthStorage();

export function setItemWithExpiration(key, value, expirationHours, id, remember) {
  /* const now = new Date();
  const expirationTime = now.getTime() + expirationHours * 60 * 60 * 1000; */

  const storage = getStorageByRemember(remember);
  const otherStorage = getOtherStorageByRemember(remember);

  clearSensitiveAuthStorage();
  storage.removeItem("id");
  otherStorage.removeItem("id");

  if (key === "token") {
    hasAuthenticatedSession = Boolean(value);
  }
  setJsonItem(storage, "id", id);
  // localStorage.setItem(`${key}_expire`, expirationTime.toString());
}

export function getItemWithExpiration(key) {
  if (key === "token") {
    return hasAuthenticatedSession;
  }

  if (key === "refreshToken") {
    return null;
  }

  const item = localStorage.getItem(key) || sessionStorage.getItem(key);
  /* const itemExpire = localStorage.getItem(`${key}_expire`);

  if (!item || !itemExpire) {
    return null;
  }

    const expirationTime = parseInt(itemExpire, 10);
  const currentTime = new Date().getTime(); 

  if (currentTime > expirationTime) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
    localStorage.removeItem(`${key}_expire`);
    return null;
  }*/

  if (!item) {
    return null;
  }

  return JSON.parse(item);
}

export function setAuthTokens(id) {
  const storage = localStorage.getItem("id") ? localStorage : sessionStorage;

  clearSensitiveAuthStorage();
  hasAuthenticatedSession = true;
  setJsonItem(storage, "id", id);
}

export function clearAuthStorage() {
  hasAuthenticatedSession = false;
  AUTH_STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}
