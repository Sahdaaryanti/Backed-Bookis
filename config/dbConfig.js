const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'bookish',
  password: 'postgres',
  port: 5432,
});

require("dotenv").config();
const midtransConfig = {
    clientKey: "SB-Mid-client-1CHFlkgibw5_iOsq",
    serverKey: "SB-Mid-server-VFMYXvWVa2vxkW9M7RUhgmrh",
  };
  
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
    } else {
      console.log('Successfully connected to the database');
      client.release();
    }
  });

module.exports = {pool, midtransConfig};