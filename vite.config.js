import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to generate version.json during build
function generateVersionFile() {
  return {
    name: "generate-version-file",
    closeBundle() {
      // Generate version based on build timestamp
      const now = new Date();
      const version = now.toISOString();
      const versionData = {
        version,
        buildTime: now.getTime()
      };

      const distPath = path.resolve(__dirname, "dist");

      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
      }

      fs.writeFileSync(
        path.join(distPath, "version.json"),
        JSON.stringify(versionData, null, 2)
      );

      // eslint-disable-next-line no-console
      console.log(`✅ version.json created with version ${version}`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generateVersionFile()],
  server: {
    host: true,
    port: 5174,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    globals: true,
    clearMocks: true,
    // Node 25+ dosyası verilmeyen kendi localStorage'ını (undefined) global'de tanımlar; vitest 4.0 bu adı dolu sayıp
    // jsdom'un localStorage'ını koymaz. Node'un web storage'ı kapatılınca testler jsdom'unkini kullanır.
    execArgv: process.allowedNodeEnvironmentFlags.has("--no-experimental-webstorage") ? ["--no-experimental-webstorage"] : [],
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     historyApiFallback: true,
//   },
// });
