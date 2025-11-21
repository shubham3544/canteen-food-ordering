// const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Shubham@07",     // if you have password, put it here
//   database: "canteen_db"
// });

// module.exports = db;

const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "canteen.db");
const db = new Database(dbPath);

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price INTEGER,
    image_url TEXT
  )
`).run();

console.log("SQLite database ready ✅");

module.exports = db;

