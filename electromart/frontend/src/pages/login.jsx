import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../services/auth';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(form);
            localStorage.setItem('token', data.token);
            localStorage.setItem(
                'user',
                JSON.stringify({
                    userID: data.userID,
                    firstname: data.firstname,
                    username: data.username,
                    isPrivileged: data.isPrivileged,
                })
            );
            alert('Welcome back!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <main>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input name="username" placeholder="Username" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </form>
        </main>
    );
}
