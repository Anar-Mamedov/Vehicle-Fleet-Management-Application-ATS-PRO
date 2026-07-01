const AUTH_STORAGE_KEYS = ["token", "refreshToken", "id"];

const getStorageByRemember = (remember) => (remember === true ? localStorage : sessionStorage);

const getOtherStorageByRemember = (remember) => (remember === true ? sessionStorage : localStorage);

const setJsonItem = (storage, key, value) => {
  if (value !== undefined && value !== null) {
    storage.setItem(key, JSON.stringify(value));
  }
};

export function setItemWithExpiration(key, value, expirationHours, id, remember, refreshToken) {
  /* const now = new Date();
  const expirationTime = now.getTime() + expirationHours * 60 * 60 * 1000; */

  const storage = getStorageByRemember(remember);
  const otherStorage = getOtherStorageByRemember(remember);

  AUTH_STORAGE_KEYS.forEach((storageKey) => {
    storage.removeItem(storageKey);
    otherStorage.removeItem(storageKey);
  });

  setJsonItem(storage, key, value);
  setJsonItem(storage, "id", id);
  setJsonItem(storage, "refreshToken", refreshToken);
  // localStorage.setItem(`${key}_expire`, expirationTime.toString());
}

export function getItemWithExpiration(key) {
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

export function setAuthTokens(accessToken, refreshToken, id) {
  const storage = localStorage.getItem("token") ? localStorage : sessionStorage;

  setJsonItem(storage, "token", accessToken);
  setJsonItem(storage, "refreshToken", refreshToken);
  setJsonItem(storage, "id", id);
}

export function clearAuthStorage() {
  AUTH_STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}
