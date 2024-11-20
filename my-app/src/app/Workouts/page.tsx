// my-app/src/app/Exercises/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from '@/app/components/exercisePage.module.css';
import Image from 'next/image';
import Nav from '../components/Nav';



interface Set {
  reps: number;
  weight: number;
}



interface Exercise {
  exerciseName: string;
  sets: Set[];

 
}

interface Workout {
    exercises: Exercise[];
    muscleGroups: string;
    date: string;
    dayOfWeek: string;
    imageUrl: string;
    
}

const WorkoutPage: React.FC = () => {
  const router = useRouter();

  const calculateTotalVolumeSets = (sets: Set[]) => {
    return sets.reduce((total, set) => total + set.reps * set.weight, 0);
  };
  const dummyExercises: Exercise[] = [
    {
      exerciseName: 'Bench Press',
      sets: [{ reps: 10, weight: 50 },{reps: 20, weight: 25}, {reps: 2, weight: 150}],


    },
    {
      exerciseName: 'Lat Pulldown',
      sets: [{ reps: 12, weight: 60 }],


    },
    {
      exerciseName: 'Back Squat',
      sets: [{ reps: 12, weight: 400 }],

    },
  ];

  const dummyWorkouts: Workout[] = [
    {
        exercises: dummyExercises,
        muscleGroups: "legs, back, chest",
        date: '01/01/2023',
        dayOfWeek: "Monday",
        imageUrl: 'data:image/jpeg;base64,...'
        
        
    }
  ]

  

  const [exercises, setExercises] = useState<Exercise[]>(dummyExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null> (null);
  const [workouts, setWorkouts] = useState<Workout[]>(dummyWorkouts);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null> (null);

  const [exerciseForm, setExerciseForm] = useState({
    muscleGroup: '',
    imageUrl: '',
  });

  const [workoutForm, setWorkoutForm] = useState({
    muscleGroups: '',
    imageUrl: '',
  });

  

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExerciseForm({ ...exerciseForm, [name]: value });
  };

  const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkoutForm({ ...workoutForm, [name]: value });
  };

 
  const addWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dayOfWeek = currentDate.toLocaleDateString(undefined, { weekday: 'long' });

    const newExercise: Exercise = {
      exerciseName: exerciseForm.muscleGroup,
      sets: [],

    };

    setExercises([...exercises, newExercise]);
    setExerciseForm({ muscleGroup: '', imageUrl: '' });
  };

  

  const addExercise = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dayOfWeek = currentDate.toLocaleDateString(undefined, { weekday: 'long' });

    const newExercise: Exercise = {
      exerciseName: exerciseForm.muscleGroup,
      sets: [],

    };

    setExercises([...exercises, newExercise]);
    setExerciseForm({ muscleGroup: '', imageUrl: '' });
  };

  const removeExercise = (exerciseIndex: number) => {
    const updatedExercises = exercises.filter((_, index) => index !== exerciseIndex);
    setExercises(updatedExercises);
  };

  const removeWorkout = (workoutIndex: number) => {
    const updatedWorkouts = workouts.filter((_, index) => index !== workoutIndex);
    setWorkouts(updatedWorkouts);
  };

  const navigateToSets = (exercise: Exercise) => {
    router.push(`/Sets?exercise=${encodeURIComponent(JSON.stringify(exercise))}`);
     
  };

  const navigateToExercise = (workout: Workout) => {
    router.push(`/exercise?workout=${encodeURIComponent(JSON.stringify(workout))}`);
     
  };


 
  
  function total(sets: Set[]): number {
    let totalVolume = 0;
    sets.forEach((set) => {
      totalVolume += set.reps * set.weight;
    });
    return totalVolume;
  }
  
  const calculateTotalVolumeExercises = (exercises: Exercise[]) => {
    return exercises.reduce((total, exercise) => {
      return total + calculateTotalVolumeSets(exercise.sets);
    }, 0);
  };
  

 

  return (
    
    <div className={style.container}>
        <div id = {style.navContainer}>
            <Nav changeView='./login'></Nav>
        </div>
        <div id={style.section}>
            <div id = {style.titleContainer}>
                <h1 id={style.title}>Workout</h1>
            </div>
            <form  id = {style.WorkoutForm} onSubmit={addWorkout}>
                <h2 id={style.formTitle}>Add New Workout</h2>
                <div id={style.inputGroup}>
                    <input
                        id={style.muscleInputField}
                        type="text"
                        name="muscleGroup"
                        value={workoutForm.muscleGroups}
                        onChange={handleWorkoutChange}
                        placeholder="Muscle Group(s)"
                        required
                    />
                    <input
                        id={style.imageInputField}
                        type="text"
                        name="imageUrl"
                        value={workoutForm.imageUrl}
                        onChange={handleWorkoutChange}
                        placeholder="Image"
                        required
                    />
                    <button id={style.addExerciseButton} type="submit"
                    >
                    Add Workout
                    </button>
                </div>
            </form>
            {workouts.map((workout, workoutIndex) => (
                <div id={style.exercise} key={workoutIndex}>
                    <p id={style.muscleGroup}>Muscle Group: {workout.muscleGroups}</p>
                    <div id = {style.summaries}> 
                        <p id={style.totalSets}>Total Exercises: {workout.exercises.length}</p>
                        <p id={style.totalVolume}>Total Volume: {calculateTotalVolumeExercises(workout.exercises)} lbs </p>
                    </div>
                    <p id={style.date}>
                    Date: {workout.dayOfWeek} {workout.date}
                    </p>
                    <p id = {style.images}>
                    <Image src={workout.imageUrl} alt="image for exercise" width={100} height={100} />
                    </p>
                    <div id={style.buttonContainer}>
                        <button
                            id={style.removeExerciseButton}
                            onClick={() => removeWorkout(workoutIndex)}
                        >
                        Remove Exercise
                        </button>
                        <button
                            id={style.viewSetsButton}
                            onClick={() => navigateToExercise(workout)}
                        >
                            View Exercises
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default WorkoutPage;