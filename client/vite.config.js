import dotenv from "dotenv";

dotenv.config();

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "client",
  server: {
    port: process.env.CLIENT_PORT || 5173,
  },
});
