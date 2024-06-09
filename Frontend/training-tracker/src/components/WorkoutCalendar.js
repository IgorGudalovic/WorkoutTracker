import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import '../App.css';

const WorkoutCalendar = () => {
    const [weeklyData, setWeeklyData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
    const { user } = useContext(UserContext); // Get user from context

    const fetchWeeklyData = useCallback(async (month, year) => {
      try {
          const response = await axios.get(`https://localhost:7115/api/WorkoutRecords/weekly-data?username=${user.username}&month=${month}&year=${year}`);
          setWeeklyData(response.data);
      } catch (error) {
          console.error('Error fetching weekly data:', error);
      }
    }, [user]);

    useEffect(() => {
      if (user) {
          fetchWeeklyData(selectedMonth, selectedYear);
      }
  }, [selectedMonth, selectedYear, user, fetchWeeklyData]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
      <div className="workout-container">
          <div className="workout-header">
              <h1>Workout Calendar</h1>
          </div>
          <p className="message">Hello, {user && user.username}</p>  {/* Display username */}
          <p className="message">Track your workouts and progress.</p>
          <button className="add-workout-btn">
              <Link to="/add-training" style={{ textDecoration: 'none', color: 'black' }}>Add Workout</Link>
          </button>
          <div className="select-container">
              <label htmlFor="month">Select Month: </label>
              <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                  {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                          {new Date(0, i).toLocaleString('default', { month: 'long' })}
                      </option>
                  ))}
              </select>

              <label htmlFor="year">Select Year: </label>
              <select id="year" value={selectedYear} onChange={handleYearChange}>
                  {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={new Date().getFullYear() - i}>
                          {new Date().getFullYear() - i}
                      </option>
                  ))}
              </select>
          </div>

          <div>
                {weeklyData.map((week, index) => (
                    <div key={index} className="week-info-container">
                        <p>Week {week.weekNumber}</p>
                        <p>Total Duration: {week.totalDuration} minutes</p>
                        <p>Workout Count: {week.workoutCount}</p>
                        <p>Average Intensity: {week.averageIntensity}</p>
                        <p>Average Fatigue: {week.averageFatigue}</p>
                    </div>
                ))}
            </div>
            <button >
                <Link to={`/details`} >
                    More Info
                </Link>
            </button>
      </div>
  );
};

export default WorkoutCalendar;
