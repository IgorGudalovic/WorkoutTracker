import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AddWorkoutForm = () => {
    const [workoutType, setWorkoutType] = useState('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [intensity, setIntensity] = useState('');
    const [fatigue, setFatigue] = useState('');
    const [workoutDate, setWorkoutDate] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const workoutData = {
                workoutType,
                duration: parseInt(duration),
                caloriesBurned: parseInt(caloriesBurned),
                intensity: parseInt(intensity),
                fatigue: parseInt(fatigue),
                workoutDate,
                username: user.username // Include userId from context
            }; 
      await axios.post('https://localhost:7115/api/WorkoutRecords', workoutData); 
      // Reset form fields after successful submission
      setWorkoutType('');
      setDuration('');
      setCaloriesBurned('');
      setIntensity('');
      setFatigue('');
      setWorkoutDate('');
      navigate('/calendar');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-workout-container">
        <div className="add-workout-header">
            <h1>Add Workout</h1>
        </div>
        <form onSubmit={handleSubmit} className="add-workout-form">
            <div className="form-group-dropdown">
            <label>Workout Type:</label>
                    <select 
                        value={workoutType}
                        onChange={(e) => setWorkoutType(e.target.value)}
                        required
                    >
                        <option value="">Select Workout Type</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Stretching">Stretching</option>
                    </select>
            </div>
            <div className="form-group">
                <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration (minutes)"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    min="0"
                    value={caloriesBurned}
                    onChange={(e) => setCaloriesBurned(e.target.value)}
                    placeholder="Calories Burned"
                    required
                />
            </div>
            <div className="form-group-dropdown">
                <label>Intensity (1-10):</label>
                <select
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    required
                >
                    <option value="">Select Intensity</option>
                    {[...Array(10).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
            </div>
            <div className="form-group-dropdown">
                <label>Fatigue (1-10):</label>
                <select
                    value={fatigue}
                    onChange={(e) => setFatigue(e.target.value)}
                    required
                >
                    <option value="">Select Fatigue</option>
                    {[...Array(10).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    type="date"
                    value={workoutDate}
                    onChange={(e) => setWorkoutDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="add-workout-btn">Add Workout</button>
        </form>
    </div>
);
};

export default AddWorkoutForm;
