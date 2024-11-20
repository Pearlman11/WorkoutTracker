"use client";
import {useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import style from '@/app/components/SetsPage.module.css';


interface Set {
  reps: number;
  weight: number;
}

interface Exercise {
  exerciseName: string;
  sets: Set[];
  totalWeight: number;
}

interface Workout {
    exercises: Exercise[];
    muscleGroups: string;
    date: string;
    dayOfWeek: string;
    imageUrl: string;
    
}

const ExercisePage: React.FC = () => {
  const searchParams = useSearchParams();
  const workoutParam = searchParams.get('workout');
  const [workoutData, setWorkoutData] = useState<Workout | null>(null);

  useEffect(() => {
    if (workoutParam) {
      setWorkoutData(JSON.parse(workoutParam));
    }
  }, [workoutParam]);

  if (!workoutData) {
    return <div>Loading...</div>;
  }

  const calculateTotalWeight = (sets: Set[]) => {
    return sets.reduce((total, set) => total + set.reps * set.weight, 0);
  };
  return (
    <div className={style.container}>
      <h1 id = {style.setTitle}>Exercises for {workoutData.muscleGroups}</h1>
      <h2 id = {style.date}> {workoutData.dayOfWeek} {workoutData.date}</h2>
      <div id={style.setContainer}>
      {workoutData.exercises.map((exercise, index) => (
        <div id={style.setInfo} key={index}>
          <p> {exercise.exerciseName}: {calculateTotalWeight(exercise.sets)} lbs </p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ExercisePage;