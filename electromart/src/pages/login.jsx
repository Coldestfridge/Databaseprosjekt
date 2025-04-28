import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: email, password }) // Important!
    });
  
    const result = await response.json();

if (result.success) {
  const userWithUsername = {
    ...result.user,
    username: result.user.username  // Keep username/email visible
  };
  localStorage.setItem("loggedInUser", JSON.stringify(userWithUsername));
  navigate("/cart");
} else {
  alert("Login failed: " + result.error);
}

  };
  

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>
  Don't have an account? <a href="/register">Create one here</a>
</p>

      </form>
    </main>
  );
}
