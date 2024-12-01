// Import dependencies and components
"use client";
import React, { useState } from "react";
import exercisesData from "./all_exercises.json";
import styles from "./WorkoutOptions.module.css";
import Nav from "../components/Nav";

// Interface for individual exercise sets
interface Set {
  reps: number;    // Number of repetitions in the set
  weight: number;  // Weight used in the set (in lbs)
}

// Interface for exercise properties stored in the database
interface Exercise {
  _id?: string;          // MongoDB unique identifier
  muscleGroup: string;   // Target muscle group (e.g., "Chest", "Arms")
  sets: Set[];           // Array of sets performed
  date: string;          // Date exercise was performed
  dayOfWeek: string;     // Day of the week (e.g., "Monday")
  exerciseName: string;  // Name of the exercise
}

// Interface for the exercise structure from exercisesData
interface Exercises {
  id: number;
  name: string;
  force: string | null;
  level: string;
  mechanic: string | null;
  equipment: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
}

const WorkoutOptions: React.FC = () => {
  // State variables for managing filters, visibility, exercises, and messages
  const [selectedMuscle, setSelectedMuscle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [visibleInstructions, setVisibleInstructions] = useState<number | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Get unique primary muscles for the dropdown options
  const uniquePrimaryMuscles = Array.from(
    new Set(exercisesData.flatMap((exercise) => exercise.primaryMuscles))
  );

  // Get unique categories for the dropdown options
  const uniqueCategories = Array.from(
    new Set(exercisesData.map((exercise) => exercise.category))
  );

  // Function to toggle visibility of exercise instructions
  const toggleInstructions = (id: number) => {
    setVisibleInstructions(visibleInstructions === id ? null : id);
  }

  // Add exercise to the Exercises page and database
  const addExerciseToDatabase = async (exercise: Exercises) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleDateString(undefined, { weekday: 'long' });
    const formattedDate = currentDate.toISOString().split('T')[0]; // Extract the date part
  
    const newExercise = {
      ...exercise,
      date: formattedDate, // Use the formatted date
      muscleGroup: exercise.primaryMuscles[0],
      dayOfWeek: dayOfWeek,
      sets: [],
      exerciseName: exercise.name,
    };
  
    try {
      // Send POST request to add exercise to the database
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExercise),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add exercise');
      }
  
      // Update state after adding exercise successfully
      const addedExercise = await response.json();
      setExercises([...exercises, addedExercise]);
      setSuccessMessage("Added to exercises successfully");
      setTimeout(() => setSuccessMessage(""), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  // Filter exercises based on the selected muscle group and category
  const filteredExercises = exercisesData.filter((exercise) => {
    const matchesMuscle = selectedMuscle
      ? exercise.primaryMuscles.includes(selectedMuscle)
      : true;
    const matchesCategory = selectedCategory
      ? exercise.category === selectedCategory
      : true;

    return matchesMuscle && matchesCategory;
  });

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <Nav></Nav>

      {/* Title Section */}
      <div id={styles.titleContainer}>
        <h1 id={styles.title}>Example Workouts</h1>
      </div>

      {/* Filter Section */}
      <div id={styles.filterContainer}>
        <label htmlFor="muscleFilter">Filter by Muscle Group:</label>
        <select
          id={styles.muscleFilter}
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
        >
          <option value="">All</option>
          {uniquePrimaryMuscles.map((muscle) => (
            <option key={muscle} value={muscle}>
              {muscle}
            </option>
          ))}
        </select>

        <label id={styles.categoryFilterLabel} htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id={styles.categoryFilter}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Success Message */}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      {/* Exercises Section */}
      <div id={styles.section}>
        {filteredExercises.map((exercise: Exercises) => (
          <div key={exercise.id} id={styles.workoutCard}>
            <h2 id={styles.cardTitle}>{exercise.name}</h2>
            <p id={styles.cardDetails}>
              <strong>Category:</strong> {exercise.category}
            </p>
            <p id={styles.cardDetails}>
              <strong>Primary Muscles:</strong> {exercise.primaryMuscles.join(", ")}
            </p>
            <p id={styles.cardDetails}>
              <strong>Equipment:</strong> {exercise.equipment || "None"}
            </p>

            {/* Instructions Section */}
            {visibleInstructions === exercise.id && (
              <div className={styles.cardBack}>
                <h3 id={styles.instructions}>Instructions</h3>
                <ul>
                  {exercise.instructions.map((instruction, index) => (
                    <li id={styles.instructionContent} key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.buttonContainer}> 
              <button
                id={styles.showInstructionsButton}
                onClick={() => toggleInstructions(exercise.id)}
              >
                {visibleInstructions === exercise.id ? "Hide Instructions" : "Show Instructions"}
              </button>
              <button
                id={styles.addExerciseButton}
                onClick={() => addExerciseToDatabase(exercise)}
              >
                Add to Exercises
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutOptions;
