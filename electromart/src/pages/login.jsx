import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
    alert("Welcome back!");
    navigate("/cart");
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
