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
const ordersRoute = require("./routes/order");

// Use routes
app.use("/menu", menuRoute);
app.use("/order", ordersRoute);

// Default route
app.get("/", (req, res) => {
    res.send("Canteen backend is running...");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
