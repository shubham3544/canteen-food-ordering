const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /orders → place order
router.post("/", (req, res) => {
  const { items } = req.body; // [{id, quantity}]
  const userId = 1;  // temporary (will change after login system)

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = 0;

  // Step 1: get prices from DB
  const ids = items.map(i => i.id).join(",");
  const sql = `SELECT id, price FROM menu_items WHERE id IN (${ids})`;

  db.query(sql, (err, dbItems) => {
    if (err) return res.status(500).json({ message: "Database error" });

    // Step 2: calculate total
    items.forEach(cartItem => {
      const dbItem = dbItems.find(i => i.id === cartItem.id);
      total += dbItem.price * cartItem.quantity;
    });

    // Step 3: insert order
    const insertOrder = "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";
    db.query(insertOrder, [userId, total], (err, orderResult) => {
      if (err) return res.status(500).json({ message: "Order save failed" });

      const orderId = orderResult.insertId;

      // Step 4: insert order items
      const insertItem = "INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_order) VALUES ?";
      const orderItems = items.map(i => {
        const dbItem = dbItems.find(d => d.id === i.id);
        return [orderId, i.id, i.quantity, dbItem.price];
      });

      db.query(insertItem, [orderItems], err => {
        if (err) return res.status(500).json({ message: "Order items failed" });

        res.json({
          success: true,
          order_id: orderId,
          total_amount: total
        });
      });

    });
  });
});

module.exports = router;
