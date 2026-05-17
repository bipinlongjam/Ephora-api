// const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// module.exports = db;

const mysql = require("mysql2");

// Determine whether the app is running in production
const isProduction = process.env.NODE_ENV === "production";

// Create connection pool using local or production environment variables
const db = mysql.createPool({
  host: isProduction
    ? process.env.PROD_DB_HOST
    : process.env.DB_HOST,

  user: isProduction
    ? process.env.PROD_DB_USER
    : process.env.DB_USER,

  password: isProduction
    ? process.env.PROD_DB_PASS
    : process.env.DB_PASS,

  database: isProduction
    ? process.env.PROD_DB_NAME
    : process.env.DB_NAME,

  port: isProduction
    ? process.env.PROD_DB_PORT || 3306
    : process.env.DB_PORT || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;