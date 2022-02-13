import {resolve} from "path";

export default {
  root: resolve("example", "todo"),
  server: {
    port: 8000,
    host: "0.0.0.0"
  }
};
