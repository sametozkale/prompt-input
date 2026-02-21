import { defineConfig } from "tsup";

export default defineConfig({
  tsconfig: "tsconfig.build.json",
  entry: { index: "src/index.ts" },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  external: [
    "react",
    "react-dom",
    "framer-motion",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-select",
    "lucide-react",
  ],
  banner: { js: '"use client";' },
});
