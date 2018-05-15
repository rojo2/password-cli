import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default {
  input: "src/password-cli.js",
  external: [
    "commander",
    "@rojo2/password"
  ],
  output: { 
    file: pkg.main,
    format: "cjs" 
  },
  plugins: [
    babel({
      exclude: ["node_modules/**"]
    })
  ]
};
