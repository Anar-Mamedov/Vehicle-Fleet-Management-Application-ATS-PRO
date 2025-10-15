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
  {
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      sonarjs: sonarjs,
    },
    settings: {
      react: {
        version: "detect", // Add react version detection here
      },
    },
    rules: {
      // Kullanılmayan değişkenler için uyarı
      "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }],
      // PropTypes kullanımı için uyarı
      "react/prop-types": "warn",
      // React context value yeniden oluşturma uyarısı
      "react/jsx-no-constructed-context-values": "warn",
      // React Hooks kuralları
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      // Erişilebilirlik kuralları (div onClick vb.)
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      // SonarJS kurallarını warning olarak ayarla
      "sonarjs/no-nested-template-literals": "warn",
      "sonarjs/unused-import": "warn",
      "sonarjs/no-unused-vars": "warn",
      "sonarjs/no-dead-store": "warn",
      "sonarjs/no-ignored-exceptions": "warn",
      "sonarjs/no-all-duplicated-branches": "warn",
      "sonarjs/cognitive-complexity": "warn",
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-redundant-jump": "warn",
      "sonarjs/prefer-immediate-return": "warn",
      // Diğer yaygın kurallar için uyarılar
      "no-console": "warn",
      "no-debugger": "warn",
      "no-undef": "warn",
      "react/jsx-key": "warn",
      "react/display-name": "warn",
      "react/jsx-no-target-blank": "warn",
    },
  },
];
