const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "2004328",
    database: "sr_database",
    host: "localhost",
    port: 5432
})

module.exports = pool;