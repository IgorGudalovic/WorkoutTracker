import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import '../App.css';

const LoginForm = () => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('https://localhost:7115/api/auth/login', { Username, Password });
          setUser(response.data); // Assuming the response contains user data
          navigate('/calendar');
      } catch (error) {
        setErrorMessage('User with that username and password does not exist');
        }
    };

    return (
      <div className="login-container">
          <div className="login-header">
              <h1>Welcome to the GYM</h1>
              <div className="login-tabs">
                  <Link to="/login" className="active">Log In</Link>
                  <Link to="/register">Register</Link>
              </div>
          </div>
          <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                  <input
                      type="text"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      required
                  />
              </div>
              <div className="form-group">
                  <input
                      type="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                  />
                  <span className="toggle-password">
                      <i className="fa fa-eye"></i>
                  </span>
              </div>
              <button type="submit" className="login-btn">Log In</button>
          </form>
          {errorMessage && (
                <div className="error-popup">
                    <p>{errorMessage}</p>
                </div>
            )}
      </div>
  );
};

export default LoginForm;
