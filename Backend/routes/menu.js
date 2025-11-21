// const express = require("express");
// const router = express.Router();
// const db = require("../db");

// // GET /menu → fetch from MySQL
// router.get("/", (req, res) => {
//   const sql = "SELECT * FROM menu_items WHERE available = 1";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Database error" });
//     }
//     res.json(results);
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM menu_items").all();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
