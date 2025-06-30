require('dotenv').config();
const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.EXPRESS_APP_DB_USER,
    host: process.env.EXPRESS_APP_HOST,
    database: process.env.EXPRESS_APP_DATABASE,
    password: process.env.EXPRESS_APP_PASSWORD,
    port: process.env.EXPRESS_APP_PORT,
});

module.exports = { pool }