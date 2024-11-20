// my-app/src/app/Exercises/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from '@/app/components/exercisePage.module.css';
import Image from 'next/image';
import Nav from '../components/Nav';
import SetsPage from '../Sets/page';

interface Set {
  reps: number;
  weight: number;
}



interface Exercise {
  muscleGroup: string;
  sets: Set[];
  date: string;
  dayOfWeek: string;
  imageUrl: string;

  
}

interface Workout {
    exercises: Exercise[];

}

const ExercisesPage: React.FC = () => {
  const router = useRouter();

  const calculateTotalVolume = (sets: Set[]) => {
    return sets.reduce((total, set) => total + set.reps * set.weight, 0);
  };

  const dummyExercises: Exercise[] = [
    {
      muscleGroup: 'Chest',
      sets: [{ reps: 10, weight: 50 },{reps: 20, weight: 25}, {reps: 2, weight: 150}],
      date: '01/01/2023',
      dayOfWeek: 'Monday',
      imageUrl: 'data:image/jpeg;base64,...',

    },
    {
      muscleGroup: 'Back',
      sets: [{ reps: 12, weight: 60 }],
      date: '02/01/2023',
      dayOfWeek: 'Tuesday',
      imageUrl: 'data:image/jpeg;base64,...',

    },
    {
      muscleGroup: 'Legs',
      sets: [{ reps: 12, weight: 400 }],
      date: '02/06/2023',
      dayOfWeek: 'Friday',
      imageUrl: 'data:image/jpeg;base64,...',

    },
  ];

  const [exercises, setExercises] = useState<Exercise[]>(dummyExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null> (null);

  const [exerciseForm, setExerciseForm] = useState({
    muscleGroup: '',
    imageUrl: '',
  });

  

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExerciseForm({ ...exerciseForm, [name]: value });
  };

  const addExercise = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dayOfWeek = currentDate.toLocaleDateString(undefined, { weekday: 'long' });

    const newExercise: Exercise = {
      muscleGroup: exerciseForm.muscleGroup,
      sets: [],
      date: dateString,
      dayOfWeek: dayOfWeek,
      imageUrl: exerciseForm.imageUrl,

    };

    setExercises([...exercises, newExercise]);
    setExerciseForm({ muscleGroup: '', imageUrl: '' });
  };

  const removeExercise = (exerciseIndex: number) => {
    const updatedExercises = exercises.filter((_, index) => index !== exerciseIndex);
    setExercises(updatedExercises);
  };

  const navigateToSets = (exercise: Exercise) => {
    router.push(`/Sets?exercise=${encodeURIComponent(JSON.stringify(exercise))}`);
     
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
            <form  id = {style.exerciseForm} onSubmit={addExercise}>
                <h2 id={style.formTitle}>Add New Exercise</h2>
                <div id={style.inputGroup}>
                    <input
                        id={style.muscleInputField}
                        type="text"
                        name="muscleGroup"
                        value={exerciseForm.muscleGroup}
                        onChange={handleExerciseChange}
                        placeholder="Muscle Group"
                        required
                    />
                    <input
                        id={style.imageInputField}
                        type="text"
                        name="imageUrl"
                        value={exerciseForm.imageUrl}
                        onChange={handleExerciseChange}
                        placeholder="Image"
                        required
                    />
                    <button id={style.addExerciseButton} type="submit">
                    Add Exercise
                    </button>
                </div>
            </form>
            {exercises.map((exercise, exerciseIndex) => (
                <div id={style.exercise} key={exerciseIndex}>
                    <p id={style.muscleGroup}>Muscle Group: {exercise.muscleGroup}</p>
                    <div id = {style.summaries}> 
                        <p id={style.totalSets}>Total Sets: {exercise.sets.length}</p>
                        <p id={style.totalVolume}>Total Volume: {calculateTotalVolume(exercise.sets)} lbs</p>
                    </div>
                    <p id={style.date}>
                    Date: {exercise.dayOfWeek} {exercise.date}
                    </p>
                    <p id = {style.images}>
                    <Image src={exercise.imageUrl} alt="image for exercise" width={100} height={100} />
                    </p>
                    <div id={style.buttonContainer}>
                        <button
                            id={style.removeExerciseButton}
                            onClick={() => removeExercise(exerciseIndex)}
                        >
                        Remove Exercise
                        </button>
                        <button
                            id={style.viewSetsButton}
                            onClick={() => navigateToSets(exercise)}
                        >
                            View Sets
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ExercisesPage;