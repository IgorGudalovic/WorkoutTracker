import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import '../App.css';

const RegisterForm = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (Password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setTimeout(() => {
          setErrorMessage('');
      }, 5000);
      return;
  }
    try {
       // Check if username already exists
       const checkResponse = await axios.get('https://localhost:7115/api/workoutrecords/check-username', {
        params: { Username }
    });

    if (checkResponse.status === 409) {
        setErrorMessage('Username already exists');
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
        return;
    }
      const response = await axios.post('https://localhost:7115/api/Users/register', { Username, Password });
      setUser(response.data);
      navigate('/calendar');
    } catch (error) {
      if (error.response && error.response.status === 409) {  // Assuming 409 Conflict for username exists
        setErrorMessage('Username already exists');
    } else {
        setErrorMessage('Registration failed');
    }
    setTimeout(() => {
        setErrorMessage('');
    }, 5000);
    }
  };

  return (
    <div className="register-container">
        <div className="register-header">
            <h1>Welcome to the GYM</h1>
            <div className="register-tabs">
                <Link to="/login">Log In</Link>
                <Link to="/register" className="active">Register</Link>
            </div>
        </div>
        <form onSubmit={handleRegister} className="register-form">
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="toggle-password">
                    <i className="fa fa-eye"></i>
                </span>
            </div>
            <button type="submit" className="register-btn">Register</button>
        </form>
        {errorMessage && (
                <div className="error-popup">
                    <p>{errorMessage}</p>
                </div>
            )}
    </div>
  );
};

export default RegisterForm;
