import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),

          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.error("proxy error", err);
            });
          },
        },
      },
    },
    plugins: [react()],
  };
});
