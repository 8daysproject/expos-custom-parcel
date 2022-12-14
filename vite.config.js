import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],

  // define: {
  //   global: {}
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  base: "",
  build: {
    rollupOptions: {
      output: {
        intro: "var global = (global === undefined) ? window : global;"
      }
    }
  }
});
