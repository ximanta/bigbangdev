import React,
       { useState,
         useContext
       } from 'react';
import { Link,
         useNavigate
       } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [username,
         setUsername
        ] = useState('');
  const [password,
         setPassword
        ] = useState('');
  const [confirmPassword,
         setConfirmPassword
        ] = useState('');
  const { register,
          showNotification
        } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    const success = register(username, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="username"
              className="form-label"
            >
              Username/Email
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="form-label"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="confirmPassword"
              className="form-label"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="form-button"
          >
            Register
          </button>
          <Link
            to="/login"
            className="form-link"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
