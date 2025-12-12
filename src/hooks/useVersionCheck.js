import { useEffect, useState } from "react";

const VERSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const LOCAL_STORAGE_KEY = "app_version";

export const useVersionCheck = () => {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [serverVersion, setServerVersion] = useState(null);

  const checkVersion = async () => {
    try {
      const response = await fetch(`/version.json?t=${Date.now()}`, {
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const currentServerVersion = data.version;

      // Get stored version from localStorage
      const storedVersion = localStorage.getItem(LOCAL_STORAGE_KEY);

      // If no stored version, save current server version
      if (!storedVersion) {
        localStorage.setItem(LOCAL_STORAGE_KEY, currentServerVersion);
        setServerVersion(currentServerVersion);
        return;
      }

      // Check if server version is different from stored version
      if (currentServerVersion !== storedVersion) {
        setServerVersion(currentServerVersion);
        setHasUpdate(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Version check failed:", error);
    }
  };

  const handleUpdate = () => {
    if (serverVersion) {
      localStorage.setItem(LOCAL_STORAGE_KEY, serverVersion);
    }
    window.location.reload();
  };

  const dismissUpdate = () => {
    setHasUpdate(false);
  };

  useEffect(() => {
    // Initial check
    checkVersion();

    // Set up interval for periodic checks
    const intervalId = setInterval(checkVersion, VERSION_CHECK_INTERVAL);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return {
    hasUpdate,
    handleUpdate,
    dismissUpdate,
  };
};
