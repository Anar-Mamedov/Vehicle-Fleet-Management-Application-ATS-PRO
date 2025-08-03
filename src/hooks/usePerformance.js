import { useEffect, useRef } from "react";

export const usePerformance = (componentName) => {
  const startTime = useRef(performance.now());
  const renderCount = useRef(0);

  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTime.current;
    renderCount.current++;

    // Performans metriklerini logla
    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${componentName}:`, {
        renderCount: renderCount.current,
        duration: `${duration.toFixed(2)}ms`,
        timestamp: new Date().toISOString(),
      });
    }

    // Yavaş render'ları uyar
    if (duration > 100) {
      console.warn(`[Performance Warning] ${componentName} took ${duration.toFixed(2)}ms to render`);
    }

    startTime.current = performance.now();
  });

  // Memory kullanımını izle
  useEffect(() => {
    if ("memory" in performance) {
      const memory = performance.memory;
      if (memory.usedJSHeapSize > 50 * 1024 * 1024) {
        // 50MB
        console.warn(`[Memory Warning] High memory usage: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
      }
    }
  }, []);

  return {
    renderCount: renderCount.current,
    getRenderTime: () => performance.now() - startTime.current,
  };
};

// Bundle analizi için
export const useBundleAnalyzer = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Webpack bundle analizi
      if (window.webpackChunkload) {
        console.log("[Bundle] Webpack chunks loaded");
      }
    }
  }, []);
};

// Network performansı izleme
export const useNetworkPerformance = () => {
  useEffect(() => {
    if ("connection" in navigator) {
      const connection = navigator.connection;
      console.log("[Network] Connection type:", connection.effectiveType);
      console.log("[Network] Downlink:", connection.downlink, "Mbps");
      console.log("[Network] RTT:", connection.rtt, "ms");
    }
  }, []);
};

// Cache performansı
export const useCachePerformance = () => {
  const checkCachePerformance = async () => {
    try {
      const cacheNames = await caches.keys();
      console.log("[Cache] Available caches:", cacheNames);

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        console.log(`[Cache] ${cacheName}: ${keys.length} items`);
      }
    } catch (error) {
      console.log("[Cache] Error checking cache performance:", error);
    }
  };

  useEffect(() => {
    checkCachePerformance();
  }, []);
};
