import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json" with { type: "json" };

export default {
  input: "src/index.ts",
  external: [...Object.keys(pkg.peerDependencies || {})],
  output: [
    {
      file: `./${pkg.module}`,
      format: "es",
      sourcemap: true,
    },
    {
      file: `./${pkg.main}`,
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      tsconfigDefaults: { exclude: ["**/*.spec.*", "dist", "node_modules"] },
    }),
  ],
};
