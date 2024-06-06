import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LogoutButton = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    user && <button onClick={handleLogout} style={{ position: 'absolute', top: 10, right: 10 }}>Logout</button>
  );
};

export default LogoutButton;
