import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      commonjsOptions: { transformMixedEsModules: true },
    },
    resolve: {
      alias: {
        "@pages": path.resolve(__dirname, "src/pages"),
        "@components": path.resolve(__dirname, "src/components"),
        "@routes": path.resolve(__dirname, "src/routes"),
        "@lib": path.resolve(__dirname, "src/lib"),
        "@store": path.resolve(__dirname, "src/store"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@providers": path.resolve(__dirname, "src/providers"),
        "@": path.resolve(__dirname, "src"),
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      proxy: {
        "/api": {
          target: "http://18.117.26.151", // backend server
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
    },
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },
  };
});
