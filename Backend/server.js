// server.js
const express = require("express");
const cors = require("cors");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));


// Routes
const menuRoute = require("./routes/menu");
const orderRoutes = require("./routes/order");
app.use("/order", orderRoutes);


// Use routes
app.use("/menu", menuRoute);
app.use("/order", orderRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Canteen backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
