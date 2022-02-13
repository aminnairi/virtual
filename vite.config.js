import {resolve} from "path";

export default {
  root: resolve("example", "router"),
  build: {
    outDir: resolve("build"),
    emptyOutDir: true
  },
  server: {
    port: 8000,
    host: "0.0.0.0"
  }
};
