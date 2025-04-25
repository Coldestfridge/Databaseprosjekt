import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/");
      return;
    }

    setUser(loggedInUser);

    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
      });
  }, [navigate]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`${product.name} added to cart.`);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  if (!user)
    return (
      <main style={{ padding: "1rem" }}>
        <h2>Welcome back, please login to place an order!</h2>
      </main>
    );

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Welcome back, {user.firstName}!</h2>

      {toast && (
        <div
          style={{
            background: "#10b981",
            color: "white",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "6px",
          }}
        >
          {toast}
        </div>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                background: "#2563eb",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
