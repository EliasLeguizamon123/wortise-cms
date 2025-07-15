import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
          "unused-imports": (await import("eslint-plugin-unused-imports")).default
        },
        rules: {
            indent: ["error", 4],
            "no-unused-vars": "warn",
            "unused-imports/no-unused-imports": "warn",
            "unused-imports/no-unused-vars": [
              "warn",
              { vars: "all", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
            ],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "padding-line-between-statements": [
              "error",
              { blankLine: "always", prev: "*", next: "return" },
              { blankLine: "always", prev: "*", next: "case" },
              { blankLine: "always", prev: "*", next: "block-like" },
            ],
            "comma-spacing": ["error", { "before": false, "after": true }],
            "array-bracket-spacing": ["error", "always"],
            "object-curly-spacing": ["error", "always"],
        }
    }
];

export default eslintConfig;
