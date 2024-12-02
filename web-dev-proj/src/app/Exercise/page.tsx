"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import style from './ExercisePage.module.css';
import Nav from '../components/Nav';

// Interface for individual exercise sets
interface Set {
  reps: number;    // Number of repetitions in the set
  weight: number;  // Weight used in the set (in lbs)
}

// Interface defining the structure of an Exercise
interface Exercise {
  _id?: string;          // MongoDB unique identifier
  muscleGroup: string;   // Target muscle group (e.g., "Chest", "Arms")
  sets: Set[];          // Array of sets performed
  date: string;         // Date exercise was performed
  dayOfWeek: string;    // Day of the week (e.g., "Monday")
  exerciseName: string; // Name of the exercise
}

// Component: ExercisesPage
// Renders the page for managing and displaying exercises
const ExercisesPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date'); // Get date parameter from URL
  const [exercises, setExercises] = useState<Exercise[]>([]); // State for exercises
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isFormVisible, setIsFormVisible] = useState(false); // Form visibility state
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(null); // Currently edited exercise ID

  // Fetch exercises from the API
  const fetchExercises = useCallback(async () => {
    try {
      const response = await fetch('/api/exercises');
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      return data; // Return fetched data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch exercises');
      alert(error);
      return []; // Return empty array on error
    }
  }, [error]);

  // Load exercises on component mount or when dateParam changes
  useEffect(() => {
    const loadExercises = async () => {
      const fetchedExercises = await fetchExercises();
      if (dateParam) {
        const filteredExercises = fetchedExercises.filter(
          (exercise: Exercise) => exercise.date === dateParam
        );
        setExercises(filteredExercises); // Set filtered exercises
      } else {
        setExercises(fetchedExercises); // Set all fetched exercises
      }
      setLoading(false); // Set loading to false
    };
    loadExercises();
  }, [dateParam, fetchExercises]);

  // Utility function to calculate total volume (reps × weight) for all sets
  const calculateTotalVolume = (sets: Set[]) => {
    return sets.reduce((total, set) => total + set.reps * set.weight, 0);
  };

  // Form state for adding new exercises
  const [exerciseForm, setExerciseForm] = useState({
    muscleGroup: '',
    exerciseName: '',
    date: new Date().toISOString().split('T')[0], // Sets default date to today
  });

  // Predefined list of available muscle groups
  const muscleGroups = [
    "abdominals",
    "hamstrings",
    "adductors",
    "quadriceps",
    "biceps",
    "shoulders",
    "chest",
    "middle back",
    "calves",
    "glutes",
    "lower back",
    "lats",
    "triceps",
    "traps",
    "forearms",
    "neck",
    "abductors"
  ];

  // Handler for form input changes
  const handleExerciseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setExerciseForm(prev => ({
      ...prev,
      [name]: value // Update form state
    }));
  };

  // Function to add a new exercise
  const addExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateString = exerciseForm.date;
    const [year, month, day] = dateString.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const dayOfWeek = selectedDate.toLocaleDateString(undefined, { weekday: 'long' });

    const newExercise: Exercise = {
      muscleGroup: exerciseForm.muscleGroup,
      sets: [],
      date: exerciseForm.date,
      dayOfWeek: dayOfWeek,
      exerciseName: exerciseForm.exerciseName,
    };

    try {
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

      const addedExercise = await response.json();
      setExercises(prev => [...prev, addedExercise]);

      // Reset form, format the date properly
      setExerciseForm({
        muscleGroup: '',
        exerciseName: '',
        date: new Date().toISOString().split('T')[0], // Correctly format as yyyy-MM-dd
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add exercise');
      console.error(err);
    }
  };

  // Function to update an existing exercise
  const updateExerciseInDB = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentExerciseId) {
      alert('No exercise selected for update');
      return;
    }
  
    const dateString = exerciseForm.date;
    const [year, month, day] = dateString.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const dayOfWeek = selectedDate.toLocaleDateString(undefined, { weekday: 'long' });

    let existingSets: Set[] = [];
    try {
      const response = await fetch(`/api/sets/${currentExerciseId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch existing sets');
      }
      existingSets = await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch existing sets');
      console.error(err);
      return;
    }
   
    const updatedExercise: Exercise = {
      muscleGroup: exerciseForm.muscleGroup,
      date: exerciseForm.date,
      dayOfWeek: dayOfWeek,
      exerciseName: exerciseForm.exerciseName,
      sets: existingSets,
    };
  
    try {
      const response = await fetch(`/api/exercises/${currentExerciseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExercise),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update exercise');
      }
  
      const updatedExerciseFromServer = await response.json();
  
      setExercises(prevExercises =>
        prevExercises.map(exercise =>
          exercise._id === currentExerciseId ? updatedExerciseFromServer : exercise
        )
      );

      setExerciseForm({
        muscleGroup: '',
        date:  new Date().toISOString().split('T')[0],
        exerciseName:'',
      });
  
      // Reset form and states
      setIsEditing(false);
      setIsFormVisible(false);
      setCurrentExerciseId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update exercise');
      console.error(err);
    }
  };

  // Function to edit an exercise
  const editExercise = async (exercise: Exercise) => {
    setIsEditing(true);
    setCurrentExerciseId(exercise._id || null);

    setExerciseForm({
      muscleGroup: exercise.muscleGroup,
      date: exercise.date,
      exerciseName: exercise.exerciseName,
    });

    setIsFormVisible(true);
  };

  // Function to remove an exercise
  const removeExercise = async (exerciseId: string) => {
    try {
      const response = await fetch(`/api/exercises/${exerciseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove exercise');
      }

      setExercises(prev => prev.filter(exercise => exercise._id !== exerciseId)); // Update exercises state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove exercise');
    }
  };

  // Function to navigate to the Sets page
  const navigateToSets = (exercise: Exercise) => {
    router.push(`/Sets?exercise=${encodeURIComponent(JSON.stringify(exercise))}`);
  };

  // Function to format the date
  const formatDate = (dateString: string) => {
    // Split date string into components and convert each part to an integer
    const [year, month, day] = dateString.split('-').map(part => parseInt(part, 10));
    const date = new Date(year, month - 1, day); // -1 since month is zero-based
    return date.toLocaleDateString(undefined, {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateExerciseInDB(e); 
      setIsFormVisible(false);
    } else {
      addExercise(e);
      setIsFormVisible(false);
    }
  };

  return (
    <div className={style.container}>
      <div id={style.navContainer}>
        <Nav />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div id={style.section}>
          <div id={style.titleContainer}>
            <h1 id={style.title}>Exercises</h1>
            <button
              id={style.toggleFormButton}
              onClick={() => {
                if (isEditing && isFormVisible){
                  setIsFormVisible(false);
                  setIsEditing(false);
                } else if (!isEditing && isFormVisible) {
                  setIsFormVisible(false);
                } else if (!isEditing && !isFormVisible) {
                  setIsFormVisible(true);
                } else {
                  setIsFormVisible(false);
                }
              }}
            >
              {isFormVisible ? 'Close Form' : 'Add New Exercise'}
            </button>
          </div>
          <div id={style.exerciseForm} className={isFormVisible ? style.visible : ''}>
            <form onSubmit={handleSubmit}>
              <h2 id={style.formTitle}>Add New Exercise</h2>
              <div id={style.inputGroup}>
                <input
                  id={style.exerciseNameInput}
                  type="text"
                  name="exerciseName"
                  value={exerciseForm.exerciseName}
                  onChange={handleExerciseChange}
                  placeholder="Exercise Name"
                  required
                />
                <select
                  id={style.muscleInputField}
                  name="muscleGroup"
                  value={exerciseForm.muscleGroup}
                  onChange={handleExerciseChange}
                  required
                >
                  <option value="">Select Muscle Group</option>
                  {muscleGroups.map((muscle) => (
                    <option key={muscle} value={muscle}>
                      {muscle}
                    </option>
                  ))}
                </select>
                <input
                  id={style.dateInputField}
                  type="date"
                  name="date"
                  value={exerciseForm.date}
                  onChange={handleExerciseChange}
                  required
                />
                <button id={style.addExerciseButton} type="submit">
                 {isEditing ? "Update Exercise" : "Add Exercise"} 
                </button>
              </div>
            </form>
          </div>
          {exercises.length === 0 ? (
            <p id={style.noExercises}>No exercises found.</p>
          ) : (
            exercises.map((exercise, exerciseIndex) => (
              <div id={style.exercise} key={exerciseIndex}>
                <p id={style.date}>
                  Date: {exercise.dayOfWeek} {formatDate(exercise.date)}
                </p>
                <p id={style.muscleGroup}>Muscle Group: {exercise.muscleGroup}</p>
                <p id={style.exerciseName}>Exercise: {exercise.exerciseName}</p>
                <div id={style.summaries}>
                  <p id={style.totalSets}>Total Sets: {exercise.sets.length}</p>
                  <p id={style.totalVolume}>Total Volume: {calculateTotalVolume(exercise.sets)} lbs</p>
                </div>
                <div id={style.buttonContainer}>
                  <button
                    id={style.removeExerciseButton}
                    onClick={() => exercise._id && removeExercise(exercise._id)}
                  >
                    Remove Exercise
                  </button>
                  <button
                    id={style.viewSetsButton}
                    onClick={() => navigateToSets(exercise)}
                  >
                    View Sets
                  </button>
                  <button
                    id={style.editExerciseButton}
                    onClick={() => editExercise(exercise)}
                  >
                    Edit Exercise
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

export default ExercisesPage;
