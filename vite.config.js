import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];

  // Bundle analyzer sadece analyze modunda
  if (mode === "analyze") {
    plugins.push(
      visualizer({
        filename: "dist/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  return {
    plugins,
    server: {
      host: true,
      port: 5174,
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      // Build optimizasyonları
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk'ları ayır
            vendor: ["react", "react-dom", "react-router-dom"],
            antd: ["antd"],
            charts: ["recharts"],
            utils: ["lodash", "dayjs", "axios"],
          },
        },
      },
      // Chunk boyutu uyarısını artır
      chunkSizeWarningLimit: 1000,
      // Source map'i production'da kapat
      sourcemap: false,
    },
    // Pre-bundle optimizasyonu
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "antd", "lodash", "dayjs", "axios"],
    },
  };
});
