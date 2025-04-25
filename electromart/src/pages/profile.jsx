import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setForm(storedUser);
    }

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = storedOrders.filter(order => order.user.email === storedUser?.email);
    setOrders(userOrders);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(form));
    setUser(form);
    setEditing(false);
  };

  if (!user) return null;

  return (
    <main>
      <h2>👤 Profile</h2>

      {editing ? (
  <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSave();
  }}
>
  <label>
    First Name:
    <input
      name="firstName"
      placeholder={user.firstName}
      onChange={handleChange}
    />
  </label>

  <label>
    Last Name:
    <input
      name="lastName"
      placeholder={user.lastName}
      onChange={handleChange}
    />
  </label>

  <label>
    Email:
    <input
      type="email"
      name="email"
      placeholder={user.email}
      onChange={handleChange}
    />
  </label>

  <label>
    Address:
    <input
      name="address"
      placeholder={user.address}
      onChange={handleChange}
    />
  </label>

  <button type="submit">Save Changes</button>
</form>

) : (
  <>
    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Address:</strong> {user.address}</p>
    <button onClick={handleEdit} style={{ marginTop: "1rem" }}>Edit Info</button>
  </>
)}


      <h3 style={{ marginTop: "2rem" }}>📦 Your Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "1rem", margin: "1rem 0", borderRadius: "6px" }}>
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <ul>
              {order.items.map((item, j) => (
                <li key={j}>{item.name} - ${item.price.toFixed(2)}</li>
              ))}
            </ul>
          </div>
        ))
      )}

      <button onClick={handleLogout} style={{ marginTop: "2rem", background: "red", color: "white", padding: "0.75rem 1.5rem", border: "none", borderRadius: "8px" }}>
        Logout
      </button>
    </main>
  );
}
