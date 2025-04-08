// Mock cart products (you'd usually get this from localStorage or backend)
// Simulate cart - empty or with items
// 🧪 TEMP: Inject test products into cart
/*
localStorage.setItem("cart", JSON.stringify([
    { name: "Smartphone", price: 699.99 },
    { name: "Bluetooth Speaker", price: 149.49 }
  ]));
  */

let cart = [];

try {
  const storedCart = JSON.parse(localStorage.getItem('cart'));
  cart = Array.isArray(storedCart) ? storedCart : [];
} catch (e) {
  cart = [];
}

const user = null;

const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const orderId = document.getElementById('orderId');
const userInfoSection = document.getElementById('userInfoSection');
const guestCheckout = document.getElementById('guestCheckout');
const cartSummary = document.querySelector('.cart-summary');

// ✅ Handle empty cart
if (cart.length === 0) {
    window.location.href = "empty-cart.html";
  }

// ✅ Populate items
let total = 0;
cart.forEach(item => {
  total += item.price;
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');
  itemDiv.innerHTML = `<strong>${item.name}</strong>: $${item.price.toFixed(2)}`;
  cartItemsContainer.appendChild(itemDiv);
});

cartTotal.textContent = total.toFixed(2);
orderId.textContent = 'EM' + Math.floor(Math.random() * 100000);

if (user) {
  userInfoSection.innerHTML = `
    <h3>Shipping Info</h3>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Address:</strong> ${user.address}</p>
    <button>Place Order</button>
  `;
} else {
  guestCheckout.style.display = 'block';
}

const submitGuestOrderBtn = document.getElementById('submitGuestOrder');
if (submitGuestOrderBtn) {
  submitGuestOrderBtn.addEventListener('click', () => {
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const address = document.getElementById('guestAddress').value;

    if (!name || !email || !address) {
      alert("Please fill out all fields.");
      return;
    }

    alert(`Thank you, ${name}! Your order has been placed.`);
    window.location.href = "frontend.html";
  });
}
