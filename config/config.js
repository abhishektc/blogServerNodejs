const { Pool } = require("pg");
require("dotenv").config();

// const localConfig = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.APP_DB,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
// });

const localConfig = new Pool({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.APP_DB}`
});


const proConfig = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = {
    database: process.env.NODE_ENV === "production" ? proConfig : localConfig,
    SECRET: 'abhishek'
}