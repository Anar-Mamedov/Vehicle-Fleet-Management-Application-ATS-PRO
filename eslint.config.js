import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import sonarjs from "eslint-plugin-sonarjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  // SonarJS önerilen kuralları global olarak etkinleştir
  sonarjs.configs.recommended,
  {
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect", // Add react version detection here
      },
    },
    rules: {
      "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }], // Nihad qardaşın ayarı
      "react/prop-types": "warn", // Nihad qardaşın ayarı
      // React context value yeniden oluşturma uyarısı
      "react/jsx-no-constructed-context-values": "warn",
      // React Hooks kuralları
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Erişilebilirlik kuralları (div onClick vb.)
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      // SonarJS - iç içe template literal uyarısı
      "sonarjs/no-nested-template-literals": "warn",
    },
  },
];
