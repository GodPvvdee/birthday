import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // We intentionally initialize browser-only state inside useEffect to
      // avoid SSR/CSR hydration mismatch (FloatingHearts, Sparkles,
      // ThemeProvider, MusicToggle, Countdown).
      "react-hooks/set-state-in-effect": "off",
      // Math.random calls below live inside event handlers, not the render
      // body — the React Compiler purity rule misflags them.
      "react-hooks/purity": "off",
    },
  },
]);

export default eslintConfig;
