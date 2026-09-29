import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

import { demoCodePlugin } from "./src/demo-code-plugin";

export default defineConfig({
  base: "/meter.css/",
  plugins: [
    tailwindcss(),
    demoCodePlugin({
      usage: `// app.ts
import "meter.css/global.css";

/* index.html */
<meter min="0" max="100" value="65">65%</meter>`,
      "install-npm": "npm install meter.css",
      "install-pnpm": "pnpm add meter.css",
      "install-yarn": "yarn add meter.css",
    }),
  ],
});
