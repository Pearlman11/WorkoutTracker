// ----------------------- Imports -----------------------
// Import necessary dependencies and components
"use client";
import React, {useState} from "react";
import exercisesData from "./all_exercises.json"; // Exercise data
import styles from "./WorkoutOptions.module.css"; // CSS for styling
import Nav from "../components/Nav"; // Navigation component
import {useSession} from "next-auth/react";

// ----------------------- Interfaces -----------------------
// Represents an individual set of an exercise
interface Set {
    reps: number;    // Number of repetitions
    weight: number;  // Weight used in lbs
}

// Represents an exercise stored in the database
interface Exercise {
    _id?: string;          // MongoDB unique identifier (optional)
    muscleGroup: string;   // Target muscle group (e.g., "Chest", "Arms")
    sets: Set[];           // Array of sets performed
    date: string;          // Date exercise was performed
    dayOfWeek: string;     // Day of the week (e.g., "Monday")
    exerciseName: string;  // Name of the exercise
    email: string;         // Email of the user who performed the exercise
}

// Represents the structure of an exercise from the JSON data
interface Exercises {
    id: number;              // Unique identifier for the exercise
    name: string;            // Name of the exercise
    force: string | null;    // Type of force (e.g., "pull", "push")
    level: string;           // Difficulty level (e.g., "beginner")
    mechanic: string | null; // Type of mechanic (e.g., "compound")
    equipment: string | null; // Required equipment
    primaryMuscles: string[]; // Primary muscles targeted
    secondaryMuscles: string[]; // Secondary muscles targeted
    instructions: string[];    // Step-by-step instructions
    category: string;          // Exercise category (e.g., "strength")
}

// ----------------------- Component -----------------------
const WorkoutOptions: React.FC = () => {
    // ----------------------- State Management -----------------------
    const [selectedMuscle, setSelectedMuscle] = useState<string>(""); // Selected muscle group
    const [selectedCategory, setSelectedCategory] = useState<string>(""); // Selected category
    const [visibleInstructions, setVisibleInstructions] = useState<number | null>(null); // ID of the exercise whose instructions are visible
    const [exercises, setExercises] = useState<Exercise[]>([]); // List of exercises added to the database
    const [successMessage, setSuccessMessage] = useState<string>(""); // Success message after adding an exercise
    const {data: session} = useSession(); // Get the current user session
    const currentUserEmail = session?.user?.email; // Get the current user's email

    // ----------------------- Unique Dropdown Options -----------------------
    // Extract unique primary muscles for the muscle group dropdown
    const uniquePrimaryMuscles = Array.from(
        new Set(exercisesData.flatMap((exercise) => exercise.primaryMuscles))
    );

    // Extract unique categories for the category dropdown
    const uniqueCategories = Array.from(
        new Set(exercisesData.map((exercise) => exercise.category))
    );

    // ----------------------- Functions -----------------------

    // Toggle visibility of exercise instructions
    const toggleInstructions = (id: number) => {
        setVisibleInstructions(visibleInstructions === id ? null : id);
    };

    // Add a selected exercise to the database
    const addExerciseToDatabase = async (exercise: Exercises) => {
        const currentDate = new Date();
        const dayOfWeek = currentDate.toLocaleDateString(undefined, {weekday: "long"});
        const formattedDate = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

        const newExercise: Exercise = {
            ...exercise,
            date: formattedDate,
            muscleGroup: exercise.primaryMuscles[0],
            dayOfWeek: dayOfWeek,
            sets: [],
            exerciseName: exercise.name,
            email: currentUserEmail || "",
        };

        try {
            // Send POST request to add exercise to the database
            const response = await fetch("/api/exercises", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newExercise),
            });

            if (!response.ok) {
                throw new Error("Failed to add exercise");
            }

            // Update state and show success message
            const addedExercise = await response.json();
            setExercises([...exercises, addedExercise]);
            setSuccessMessage("Added to exercises successfully");
            setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
        } catch (error) {
            console.error("Error adding exercise:", error);
        }
    };

    // Filter exercises based on selected muscle group and category
    const filteredExercises = exercisesData.filter((exercise) => {
        const matchesMuscle = selectedMuscle
            ? exercise.primaryMuscles.includes(selectedMuscle)
            : true;
        const matchesCategory = selectedCategory
            ? exercise.category === selectedCategory
            : true;
        return matchesMuscle && matchesCategory;
    });

    // ----------------------- JSX Rendering -----------------------
    return (
        <div className={styles.container}>
            {/* Navigation Bar */}
            <Nav/>

            {/* Title Section */}
            <div id={styles.titleContainer}>
                <h1 id={styles.title}>Example Workouts</h1>
            </div>

            {/* Filter Section */}
            <div id={styles.filterContainer}>
                {/* Muscle Group Filter */}
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

                {/* Category Filter */}
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
                        {/* Exercise Details */}
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
                                        <li id={styles.instructionContent} key={index}>
                                            {instruction}
                                        </li>
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