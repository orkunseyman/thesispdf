const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    password:"orkun",
    port:5432,
    database:"thesispdf"
})

module.exports = pool;
