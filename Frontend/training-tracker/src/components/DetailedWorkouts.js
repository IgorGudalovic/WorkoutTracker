import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../App.css';

const DetailedWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);    
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const fetchWorkouts = useCallback(async () => {
        try {
            const response = await axios.get(`https://localhost:7115/api/WorkoutRecords/user-workouts?username=${user.username}`);
            setWorkouts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }, [user]);

      useEffect(() => {
        if (user) {
            fetchWorkouts();
        }
    }, [user, fetchWorkouts]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      };
    return (
        <div className="detailed-workouts">
          <h2>Workouts for {user.username}</h2>
          <button onClick={() => navigate("/calendar")} className="back-button">Back to Calendar</button>
          <div className="workouts-container">
            {workouts.length > 0 ? (
              workouts.map(workout => (
                <div key={workout.id} className="workout-card">
                    <p><strong>Date:</strong> {formatDate(workout.workoutDate)}</p>
                    <p><strong>Workout Type:</strong> {workout.workoutType}</p>
                    <p><strong>Duration:</strong> {workout.duration} minutes</p>
                    <p><strong>Calories Burned:</strong> {workout.caloriesBurned}</p>
                    <p><strong>Intensity:</strong> {workout.intensity}</p>
                    <p><strong>Fatigue:</strong> {workout.fatigue}</p>
                </div>
              ))
            ) : (
              <p>No workouts found for this user.</p>
            )}
          </div>
          <button onClick={() => navigate("/calendar")} className="back-button">Back to Calendar</button>
        </div>
      );
};
export default DetailedWorkouts;