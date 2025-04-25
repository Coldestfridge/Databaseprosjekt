import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length === 0) {
      navigate("/empty-cart");
    } else {
      setCart(storedCart);
    }

    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedIn || null);
  }, [navigate]);

  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2);


  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    showToast("Item removed from cart.");

    if (newCart.length === 0) {
      navigate("/empty-cart");
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    showToast("Cart cleared.");
    navigate("/empty-cart");
  };

  const placeOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    const orderDetails = {
      items: cart,
      user,
      total,
      orderId: 'EM' + Math.floor(Math.random() * 100000),
      date: new Date().toLocaleString()
    };
  
    // Save to order history
    const prevOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...prevOrders, orderDetails]));
  
    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");
    navigate("/order-confirmation");
  };

  const updateQuantity = (index, qty) => {
    const newCart = [...cart];
    newCart[index].quantity = qty;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  
  

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <main>
      <h2>Your Cart</h2>

      {toast && <div style={{ background: "#2563eb", color: "white", padding: "0.5rem", marginBottom: "1rem", borderRadius: "6px" }}>{toast}</div>}

      {cart.map((item, i) => (
  <div key={i} style={{ marginBottom: "1rem" }}>
    <strong>{item.name}</strong>: ${item.price.toFixed(2)}<br/>
    Quantity:
    <input type="number" value={item.quantity || 1} min="1"
      onChange={(e) => updateQuantity(i, Number(e.target.value))}
      style={{ width: "60px", marginLeft: "1rem" }}
    />
    <button onClick={() => removeItem(i)} style={{ marginLeft: "1rem", background: "red", color: "white", border: "none", padding: "0.3rem 0.6rem", borderRadius: "4px" }}>
      Remove
    </button>
  </div>
))}

      <p><strong>Total:</strong> ${total}</p>
      <p><strong>Order ID:</strong> EM{Math.floor(Math.random() * 100000)}</p>

      {user ? (
        <div>
          <h3>Shipping Info</h3>
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
          <p>{user.address}</p>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      ) : (
        <p>Please <a href="/login">login</a> to complete your order</p>
      )}

      <button onClick={clearCart} style={{ marginTop: "1rem", background: "#555", color: "white", padding: "0.6rem", borderRadius: "6px", border: "none" }}>
        Clear Cart
      </button>
    </main>
  );
}

  