// server/vitest.config.ts
import { defineConfig } from "vitest/config";
import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ladda .env.test med absolut path
loadEnv({ path: resolve(__dirname, ".env.test") });

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    // Valfritt: logga mindre
    // reporters: "basic",
  },
});
