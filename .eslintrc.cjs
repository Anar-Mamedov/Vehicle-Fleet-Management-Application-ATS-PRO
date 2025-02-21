module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect",
      pragma: "React",
      fragment: "Fragment",
    },
  },
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }], // Nihad qardaşın ayarı
    "react/prop-types": "warn", // Nihad qardaşın ayarı
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
