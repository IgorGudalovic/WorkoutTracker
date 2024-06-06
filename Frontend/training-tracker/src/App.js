import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import WorkoutCalendar from './components/WorkoutCalendar';
import AddWorkoutForm from './components/AddWorkoutForm';
import LogoutButton from './components/LogoutButton';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <LogoutButton />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/calendar" element={<WorkoutCalendar />} />
            <Route path="/add-training" element={<AddWorkoutForm />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
