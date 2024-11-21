import React, { createContext, useContext, useState, useEffect } from 'react';

interface Set {
  reps: number;
  weight: number;
}

interface Exercise {
  _id?: string; 
  muscleGroup: string;
  sets: Set[];
  date: string;
  dayOfWeek: string;
  imageUrl: string;
}

interface WorkoutContextType {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
  addExercise: (exercise: Exercise) => Promise<void>;
  removeExercise: (exerciseToRemove: Exercise) => Promise<void>;
  updateExercise: (exercise: Exercise) => Promise<void>;
  fetchExercises: () => Promise<void>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch exercises when component mounts
  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/exercises');
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      setExercises(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addExercise = async (exercise: Exercise) => {
    try {
      setLoading(true);
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise)

    });

    if (!response.ok) {
      throw new Error ('failed to add exercise');
    }
      const newExercise = await response.json();

      setExercises(prev => [...prev, newExercise]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add exercise');
    } finally {
      setLoading(false);
    }
  };

  const removeExercise = async (exerciseToRemove: Exercise) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/exercises/${exerciseToRemove._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to Remove Exercise');
      }

      setExercises(prev => prev.filter(exercise => exercise._id !== exerciseToRemove._id));
    
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove exercise');
    } finally {
      setLoading(false);
    }
  };

  const updateExercise = async (updatedExercise: Exercise) => {
    try {
      setLoading(true);
      const response = await fetch (`/api/exercises/${updatedExercise._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateExercise)
      });

      if (!response.ok) {
        throw new Error ('Failed to update Exercise')
      }
      const updated = await response.json();


      setExercises(prev => prev.map(exercise => 
        exercise._id === updatedExercise._id ? updated : exercise
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update exercise');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WorkoutContext.Provider value={{ 
      exercises, 
      loading, 
      error, 
      addExercise, 
      removeExercise, 
      updateExercise,
      fetchExercises 
    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}