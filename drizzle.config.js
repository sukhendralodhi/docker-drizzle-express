const dotenv = require("dotenv");
const { defineConfig } = require("drizzle-kit");

dotenv.config();

module.exports = defineConfig({
  dialect: "postgresql",
  schema: "./models/index.js", // Path to your Drizzle schema definitions
  out: "./drizzle",             // Folder for generated SQL files
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
