const db = require("./db");

const items = [
  ["Veg Sandwich", "Tasty grilled sandwich", 40, "images/veg_sandwich.jpg"],
  ["Cold Coffee", "Chilled creamy coffee", 50, "images/cold_coffee.jpg"],
  ["Pasta", "White sauce pasta", 80, "images/pasta.jpg"],
  ["Aloo Patties", "Crispy aloo patties", 16, "images/aloo_patties.jpg"],
  ["Paneer Patties", "Paneer filled patties", 25, "images/paneer_patties.jpg"],
  ["Pizza", "Cheesy pizza slice", 80, "images/pizza.jpg"],
  ["Chowmein", "Vegetable chowmein", 30, "images/chowmein.jpg"],
  ["Bread Omelette", "Fresh omelette sandwich", 25, "images/bread_omelette.jpg"],
  ["Scrambled Eggs", "Fluffy scrambled eggs", 25, "images/scrambled_eggs.jpg"],
  ["Boiled Egg", "Single boiled egg", 10, "images/boiled_eggs.jpg"],
  ["Chips", "Crispy chips", 19, "images/chips.jpg"],
  ["Cold Drink", "Soft drink", 21, "images/cold_drink.jpg"],
  ["Yogurt", "Fresh yogurt", 30, "images/yogurt.jpg"]
];

const stmt = db.prepare(
  "INSERT INTO menu_items (name, description, price, image_url) VALUES (?, ?, ?, ?)"
);

items.forEach(item => {
  stmt.run(item);
});

console.log("✅ Menu items inserted into database");
