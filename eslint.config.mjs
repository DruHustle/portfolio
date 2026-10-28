import js from "@eslint/js";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "frontend/public/**",
      "**/artifacts/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", caughtErrors: "none" },
      ],
    },
  },
  {
    files: ["frontend/src/**/*.{ts,tsx}"],
    plugins: { "react-hooks": hooks, "jsx-a11y": jsxA11y },
    settings: { "jsx-a11y": { components: { Link: "a" } } },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      ...jsxA11y.flatConfigs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@portfolio/backend/router",
              allowTypeImports: true,
              message: "The frontend may only import backend router types.",
            },
          ],
          patterns: [
            {
              group: [
                "**/backend/**",
                "**/server/**",
                "!@portfolio/backend/router",
              ],
              message: "Use the type-only @portfolio/backend/router contract.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["backend/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "**/frontend/**",
                "@portfolio/frontend",
                "@portfolio/frontend/*",
              ],
              message: "Backend code must not depend on the frontend.",
            },
          ],
        },
      ],
    },
  }
);
