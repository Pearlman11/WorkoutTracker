"use client";
import {useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import style from '@/app/components/SetsPage.module.css';


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

const SetsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const exerciseParam = searchParams.get('exercise');
  const [exerciseData, setExerciseData] = useState<Exercise | null>(null);

  useEffect(() => {
    if (exerciseParam) {
      console.log(exerciseParam);
      setExerciseData(JSON.parse(exerciseParam));
    }
  }, [exerciseParam]);

  if (!exerciseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <h1 id = {style.setTitle}>Sets for {exerciseData.muscleGroup}</h1>
      <h2 id = {style.date}> {exerciseData.dayOfWeek} {exerciseData.date}</h2>
      <div id={style.setContainer}>
      {exerciseData.sets.map((set, index) => (
        <div id={style.setInfo} key={index}>
          <p>Set {index + 1}: {set.reps} reps x {set.weight} lbs</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SetsPage;