const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

  const db = mysql.createPool({
  host: localhost,
  user: u111959092_ephoracare,
  password: Ephora2026,
  database: u111959092_ephorapath,
  port: 5300,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


module.exports = db;