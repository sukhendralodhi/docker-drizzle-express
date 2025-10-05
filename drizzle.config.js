const dotenv = require("dotenv");
dotenv.config();
const { defineConfig } = require("drizzle-kit");

const config = defineConfig({
    dialect: "postgresql",
    output: "./drizzle",
    schema: "./models/index.js",
    dbCredentials: {
        url: process.env.DATABASE_URL
    }
});

module.exports = config;