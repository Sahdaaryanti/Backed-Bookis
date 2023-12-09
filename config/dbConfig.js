const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
});

require("dotenv").config();
const midtransConfig = {
  isProduction: false,
  serverKey: process.env.MIDTRANS_serverKey,
  clientKey: process.env.MIDTRANS_clientKey,
};

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Successfully connected to the database");
    client.release();
  }
});

module.exports = { pool, midtransConfig };
