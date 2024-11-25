"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import style from './sets.module.css';
import Nav from '../components/Nav';

// Interfaces for type safety
interface Set {
  reps: number;    // Number of repetitions per set
  weight: number;  // Weight used in pounds
}

interface Exercise {
  _id?: string;           // MongoDB document ID
  exerciseName: string;   // Name of the exercise
  muscleGroup: string;    // Target muscle group
  sets: Set[];           // Array of sets for this exercise
  date: string;          // Date the exercise was performed
  dayOfWeek: string;     // Day of the week
}

export default function SetsPage() {
  // Get exercise data from URL parameters
  const searchParams = useSearchParams();
  const exerciseParam = searchParams.get('exercise');
  
  // State management
  const [exercise, setExercise] = useState<Exercise | null>(null);  // Current exercise data
  const [newSet, setNewSet] = useState({ reps: 0, weight: 0 });    // Form state for new sets
  const [isFormVisible, setIsFormVisible] = useState(false);        // Toggle form visibility

  // Parse exercise data from URL on component mount
  useEffect(() => {
    if (exerciseParam) {
      setExercise(JSON.parse(exerciseParam)); // Set exercise state from URL
    }
  }, [exerciseParam]);

  // Function to add a new set to the exercise
  const addSet = async () => {
    // Validation check
    if (!exercise?._id || newSet.reps <= 0 || newSet.weight <= 0) return;

    // Create updated exercise object with new set
    const updatedExercise = {
      ...exercise,
      sets: [...exercise.sets, newSet]
    };

    // API call to update exercise in database
    try {
      const response = await fetch(`/api/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newExercise: updatedExercise }),
      });

      if (!response.ok) throw new Error('Failed to add set');

      // Update local state and reset form
      setExercise(updatedExercise);
      setNewSet({ reps: 0, weight: 0 });
    } catch (error) {
      console.error('Error adding set:', error);
    }
  };

  // Function to remove a set from the exercise
  const removeSet = async (index: number) => {
    if (!exercise?._id) return;

    const updatedExercise = {
      ...exercise,
      sets: exercise.sets.filter((_, i) => i !== index) // Remove set by index
    };

    try {
      const response = await fetch(`/api/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newExercise: updatedExercise }),
      });

      if (!response.ok) throw new Error('Failed to remove set');

      setExercise(updatedExercise); // Update exercise state
    } catch (error) {
      console.error('Error removing set:', error);
    }
  };

  if (!exercise) return <div>Loading...</div>; // Loading state

  return (
    <div className={style.container}>
      <div id={style.navContainer}>
        <Nav changeView='./login' />
      </div>
      <div id={style.section}>
        <div id={style.exerciseHeader}>
          <h1 id={style.title}>{exercise.exerciseName}</h1>
          <p id={style.subtitle}>{exercise.muscleGroup}</p>
          <button
            id={style.toggleFormButton}
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? 'Close Form' : 'Add New Set'}
          </button>
        </div>

        <div className={`${style.addSetForm} ${isFormVisible ? style.visible : ''}`}>
          <div className={style.inputContainer}>
            <div>
              <label htmlFor="reps">Reps</label>
              <input
                id="reps"
                type="number"
                value={newSet.reps}
                onChange={(e) => setNewSet({ ...newSet, reps: parseInt(e.target.value) })}
                placeholder="Enter reps"
              />
            </div>
            <div>
              <label htmlFor="weight">Weight (lbs)</label>
              <input
                id="weight"
                type="number"
                value={newSet.weight}
                onChange={(e) => setNewSet({ ...newSet, weight: parseInt(e.target.value) })}
                placeholder="Enter weight"
              />
            </div>
            <button onClick={addSet}>Add Set</button>
          </div>
        </div>

        <div id={style.setsContainer}>
          {exercise.sets.map((set, index) => (
            <div key={index} id={style.setCard}>
              <p id={style.sets}>Set {index + 1}</p>
              <p id={style.reps}>{set.reps} reps × {set.weight} lbs</p>
              <p id={style.volume}>Volume: {set.reps * set.weight} lbs</p>
              <button onClick={() => removeSet(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}