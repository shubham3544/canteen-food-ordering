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

// Database file path
const dbPath = path.join(__dirname, "canteen.db");

// Create / Open database
const db = new Database(dbPath);

// ✅ MENU ITEMS TABLE (NO DUPLICATES ALLOWED)
db.prepare(`
CREATE TABLE IF NOT EXISTS menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  description TEXT,
  price REAL NOT NULL,
  image_url TEXT
);
`).run();

// ✅ ORDERS TABLE
db.prepare(`
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  total_amount REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`).run();

// ✅ ORDER ITEMS TABLE
db.prepare(`
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  menu_item_id INTEGER,
  quantity INTEGER,
  price_at_order REAL,
  FOREIGN KEY(order_id) REFERENCES orders(id),
  FOREIGN KEY(menu_item_id) REFERENCES menu_items(id)
);
`).run();

module.exports = db;
