import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', firstname: '', lastname: '', address: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match!');
    }
    try {
      const { username, password, firstname, lastname, address } = form;
      await register({ username, password, firstname, lastname, address });
      alert('Account created!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        {['username','password','confirmPassword','firstname','lastname','address'].map((f) => (
          <input
            key={f}
            name={f}
            type={f.toLowerCase().includes('password') ? 'password' : 'text'}
            placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
            required
            onChange={handleChange}
          />
        ))}
        <button type="submit">Register</button>
      </form>
    </main>
  );
}