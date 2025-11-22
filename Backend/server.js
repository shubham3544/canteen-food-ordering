const express = require("express");
const cors = require("cors");

// require("./seed"); // ✅ ADD THIS LINE

const app = express();


// ✅ Proper CORS for Netlify + Render
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Serve images
app.use("/images", express.static("public/images"));

// Routes
const menuRoute = require("./routes/menu");
const orderRoutes = require("./routes/order");

// ✅ Register routes ONCE only
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
