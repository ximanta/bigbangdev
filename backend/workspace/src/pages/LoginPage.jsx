import React,
       { useState,
         useContext
       } from 'react';
import { Link,
         useNavigate
       } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [username,
         setUsername
        ] = useState('');
  const [password,
         setPassword
        ] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
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
          <button
            type="submit"
            className="form-button"
          >
            Login
          </button>
          <Link
            to="/register"
            className="form-link"
          >
            Don't have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
