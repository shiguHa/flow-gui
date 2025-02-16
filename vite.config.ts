import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react({
      include: ["./src/webview/**/{*.ts,*.tsx}"],
    }),
  ],
  build: {
    outDir: "out/webview",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  server: {
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },
});