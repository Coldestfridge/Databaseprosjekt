import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate saving user data
    localStorage.setItem("user", JSON.stringify(form));
    alert("Account created!");
    navigate("/login");
  };

  return (
    <main>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
        <input name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input name="address" placeholder="Address" required onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
