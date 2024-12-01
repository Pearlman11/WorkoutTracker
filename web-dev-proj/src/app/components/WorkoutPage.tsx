"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './WorkoutPage.module.css';
import Nav from './Nav';

// Interface: Exercise
// Represents the data structure for an individual exercise
interface Exercise {
  _id?: string;                // MongoDB document ID
  exerciseName: string;        // Name of the exercise performed
  muscleGroup: string;         // Target muscle group
  date: string;               // Date of the workout
  dayOfWeek: string;          // Day of the week (e.g., "Monday")
  imageUrl: string;           // URL for exercise demonstration image
  sets: Array<{ weight: number; reps: number }>;  // Array of sets performed
}

// Interface: WorkoutCard
// Represents grouped workout data by date
interface WorkoutCard {
  date: string;              // Date of the workout
  dayOfWeek: string;         // Day of the week
  exercises: Exercise[];     // All exercises performed on this date
  totalVolume: number;       // Total volume (weight × reps) for all exercises
}

// Component: WorkoutsPage
// Renders the main page that displays a summary of all workouts
const WorkoutsPage: React.FC = () => {
  // State management for workout data, loading status, and error handling
  const router = useRouter();
  const [workoutCards, setWorkoutCards] = useState<WorkoutCard[]>([]);  // Stores grouped workout data
  const [loading, setLoading] = useState(true);                         // Loading state indicator
  const [error, setError] = useState<string | null>(null);              // Error state management

  // useEffect: Fetch and process workout data when component mounts
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Fetch exercises from the API
        const response = await fetch('/api/exercises');
        if (!response.ok) throw new Error('Failed to fetch exercises');
        
        const exercises: Exercise[] = await response.json();
        
        // Group exercises by date for display
        const groupedExercises = exercises.reduce((acc: { [key: string]: Exercise[] }, exercise) => {
          if (!acc[exercise.date]) {
            acc[exercise.date] = [];
          }
          acc[exercise.date].push(exercise);
          return acc;
        }, {});

        // Calculate total volume and create workout cards
        const cards: WorkoutCard[] = Object.entries(groupedExercises).map(([date, exercises]) => ({
          date,
          dayOfWeek: exercises[0].dayOfWeek,
          exercises,
          // Calculate total volume for all exercises on this date
          totalVolume: exercises.reduce((total, exercise) => 
            total + exercise.sets.reduce((setTotal, set) => 
              setTotal + (set.weight * set.reps), 0), 0)
        }));

        // Sort cards by date (newest first) and update state
        setWorkoutCards(cards.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setLoading(false);
      } catch (err) {
        console.log(error);
        setError(err instanceof Error ? err.message : 'Failed to fetch exercises');
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Function: Navigate to Exercises page with selected date
  const navigateToExercises = (date: string) => {
    router.push(`/Exercise?date=${encodeURIComponent(date)}`);
  };

  return (
    // Section: Main Container for Workouts Page
    <div className={style.container}>
      <div id={style.navContainer}>
        <Nav />
      </div>
      {loading ? (
        // Display loading message while fetching data
        <p>Loading...</p>
      ) : (
        <div id={style.section}>
          <div id={style.titleContainer}>
            <h1 id={style.title}>Workout Summary</h1>
          </div>
          {workoutCards.length === 0 ? (
            // Display message if no workouts are found
            <p>No workouts found.</p>
          ) : (
            // Render each workout card with details
            workoutCards.map((card, index) => (
              <div id={style.workout} key={index}>
                <div id={style.workoutHeader}>
                  <h2 id={style.date}>
                    {card.dayOfWeek} - {card.date}
                  </h2>
                  <p id={style.totalVolume}>Total Volume: {card.totalVolume} lbs</p>
                </div>
                <div id={style.exerciseSummary}>
                  <p>Exercises: {card.exercises.length}</p>
                  <p>Muscle Groups: {
                    [...new Set(card.exercises.map(ex => ex.muscleGroup))].join(', ')
                  }</p>
                </div>
                <div id={style.buttonContainer}>
                  <button
                    id={style.viewExercisesButton}
                    onClick={() => navigateToExercises(card.date)}
                  >
                    View Exercises
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
