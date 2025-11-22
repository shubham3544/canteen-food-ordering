// ===== CONFIG =====
const API_URL = "https://canteen-backend-umau.onrender.com";
   // backend URL

// ===== LOAD CART FROM LOCAL STORAGE =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== DISPLAY CART ITEMS =====
function loadCart() {
    const container = document.getElementById("cartContainer");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty</p>";
        document.getElementById("totalAmount").innerText = "Total: ₹0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("totalAmount").innerText = `Total: ₹${total}`;
}

// ===== REMOVE ITEM FROM CART =====
function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ===== PLACE ORDER — SEND TO BACKEND /order =====
document.getElementById("placeOrderBtn").addEventListener("click", async () => {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    // Convert cart → format backend expects
    const formattedItems = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
    }));

    try {
        const response = await fetch(`${API_URL}/order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: formattedItems })
        });

        const data = await response.json();

        if (data.success) {
            alert(`Order placed! Your Order ID: ${data.order_id}`);

            // clear cart after order
            cart = [];
            localStorage.removeItem("cart");

            loadCart(); // refresh page
        } else {
            alert("Order failed!");
        }

    } catch (error) {
        alert("Error connecting to backend");
        console.error(error);
    }
});

// ===== INITIAL LOAD =====
loadCart();
