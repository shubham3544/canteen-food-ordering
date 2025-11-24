// const API_URL = "http://localhost:5000";

// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // LOAD MENU FROM BACKEND
// async function loadMenu() {
//     try {
//         const res = await fetch(`${API_URL}/menu`);
//         const data = await res.json();

//         const menuContainer = document.getElementById("menuContainer");
//         menuContainer.innerHTML = "";

//         data.forEach(item => {
//             menuContainer.innerHTML += `
//                 <div class="card">
//                     <img src="${item.image_url}" alt="${item.name}">
//                     <h4>${item.name}</h4>
//                     <p>${item.description}</p>
//                     <p class="price">₹${item.price}</p>
//                     <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
//                         Add to Cart
//                     </button>
//                 </div>
//             `;
//         });

//     } catch (error) {
//         console.log("Error loading menu:", error);
//     }
// }

// function addToCart(id, name, price) {
//     const existing = cart.find(item => item.id === id);

//     if (existing) {
//         existing.quantity++;
//     } else {
//         cart.push({ id, name, price, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     document.getElementById("cartCount").innerText = cart.length;
// }

// document.getElementById("cartCount").innerText = cart.length;

// loadMenu();


const API_URL = "https://canteen-backend-umau.onrender.com";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// LOAD MENU FROM BACKEND
async function loadMenu() {
    try {
        const res = await fetch(`${API_URL}/menu`);
        const data = await res.json();

        const menuContainer = document.getElementById("menuContainer");
        menuContainer.innerHTML = "";

        data.forEach(item => {
            menuContainer.innerHTML += `
                <div class="card">
                    <img src="${API_URL}/${item.image_url}" alt="${item.name}">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p class="price">₹${item.price}</p>
                    <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
                        Add to Cart
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.log("Error loading menu:", error);
    }
}

// ADD TO CART
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cartCount").innerText = cart.length;
}

// INITIAL LOAD
document.getElementById("cartCount").innerText = cart.length;
loadMenu();