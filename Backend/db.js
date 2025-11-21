const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Shubham@07",     // if you have password, put it here
  database: "canteen_db"
});

module.exports = db;
