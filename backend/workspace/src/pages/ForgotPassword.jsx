import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending reset email
    console.log('Sending reset email to:', email);
    setAlert({ type: 'success', message: `Password reset link sent to ${email}!` });
    setEmail('');
  };

  return (
    <div className="auth-page">
      <div className="card p-4" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h1 className="text-center mb-4">Forgot Password</h1>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Button type="submit" variant="primary" className="w-full mt-3">
            Send Reset Link
          </Button>
        </form>
        <div className="text-center mt-3">
          Remember your password? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
