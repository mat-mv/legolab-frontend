import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Bestehender Code nutzt noch "any" (v. a. bei Strapi-Antworten).
      // Vorerst nur Warnung; neue Stellen bitte mit Interfaces typisieren.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // Standard-Ignores von eslint-config-next
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
