import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-debugger": "warn",
      "max-len": ["error", { code: 80, ignoreComments: true, ignoreUrls: true }],
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-var": "error",
      "prefer-const": "error"
    },
  },
];
