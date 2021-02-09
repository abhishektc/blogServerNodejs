const { Pool } = require("pg");
require("dotenv").config();

const localConfig = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.APP_DB,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

const proConfig = {
    connectionString: process.env.DATABASE_URL,
};

module.exports = {
    database: process.env.NODE_ENV === "production" ? proConfig : localConfig,
    SECRET: 'abhishek'
}