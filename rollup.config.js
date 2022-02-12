import {resolve} from "path";
import {terser} from "rollup-plugin-terser";

export default {
  input: resolve("sources", "index.js"),
  plugins: [
    terser()
  ],
  output: {
    file: resolve("build", "index.js"),
    format: "umd",
    name: "@aminnairi/virtual"
  }
};
