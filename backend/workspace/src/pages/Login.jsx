import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation / mock login
    if (email === 'user@example.com' && password === 'password') {
      setAlert({ type: 'success', message: 'Login successful!' });
      setTimeout(onLogin, 1000); // Simulate login delay
    } else {
      setAlert({ type: 'error', message: 'Invalid email or password.' });
    }
  };

  return (
    <div className="auth-page">
      <div className="card p-4" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h1 className="text-center mb-4">Login to Pet Overs</h1>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <Button type="submit" variant="primary" className="w-full mt-3">
            Login
          </Button>
        </form>
        <div className="text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
