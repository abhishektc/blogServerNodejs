const { Pool } = require("pg");
require("dotenv").config();



// const localConfig = new Pool({
//     connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.APP_DB}`,

// });


const proConfig = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

proConfig.connect();

module.exports = {
    database: proConfig,
    SECRET: 'abhishek'
}