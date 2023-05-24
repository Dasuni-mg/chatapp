const { Pool } = require("pg");
// create a PostgreSQL pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "chatapp",
  password: "1234",
  port: 5432,
});

module.exports = pool;
