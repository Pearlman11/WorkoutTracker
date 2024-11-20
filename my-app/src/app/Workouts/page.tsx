// my-app/src/app/Exercises/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from '@/app/Workouts/workouts.module.css';
import Image from 'next/image';
import Nav from '../components/Nav';




interface Set {
    reps: number;
    weight: number;
}



interface Exercise {
    muscleGroup: string;
    sets: Set[];
    date: string;
    dayOfWeek: string;


}


interface Workout {
    id: string;
    exercises: Exercise[];
    muscleGroups: string;


}

interface WorkoutProps {
    workoutExercise: Exercise[];
}

const WorkoutPage: React.FC<WorkoutProps> = ({ workoutExercise }) => {


    const router = useRouter();

    const calculateTotalVolumeLifted = (exercises: Exercise[]) => {
        var total = 0;
        exercises.forEach((exercise) =>
            exercise.sets.forEach((set) =>
                total += set.reps * set.weight
            )
        );
        return total;
    }

   

    const [workoutId, setWorkoutId] = useState<number>(0);
    const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>(workoutExercise);


    const dummyWorkouts: Workout[] = [
        {
            id: workoutId.toString(),
            exercises: workoutExercises,
            muscleGroups: "legs, back, chest",
        }
    ]

    const [workouts, setWorkouts] = useState<Workout[]>(dummyWorkouts);
    const [exercises, setExercises] = useState<Exercise[]>(workoutExercises);


  


    const [workoutForm, setWorkoutForm] = useState({
        muscleGroups: '',
        imageUrl: '',
    });


    const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWorkoutForm({ ...workoutForm, [name]: value });
    };


    const addWorkout = (e: React.FormEvent) => {
        e.preventDefault();
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        const dayOfWeek = currentDate.toLocaleDateString(undefined, { weekday: 'long' });
        setWorkoutId(workoutId + 1);
        const newWorkout: Workout = {
            id: workoutId.toString(),
            exercises: [],
            muscleGroups: workoutForm.muscleGroups,
        }
        setWorkouts([...workouts, newWorkout])
        setWorkoutForm({

            muscleGroups: '',
            imageUrl: '',
        });

    };

    const groupedExercises = workoutExercises.reduce((groups: { [key: string]: Exercise[] }, exercise) => {
        const { date } = exercise;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(exercise);
        return groups;
    }, {});

    const getAllMuscleGroups = (exercises: Exercise[], date: string) => {
        const exercisesForDate = groupedExercises[date];
        const muscleGroups = exercisesForDate.map((exercise) => exercise.muscleGroup);
        const uniqueMuscleGroups = Array.from(new Set(muscleGroups));
        const muscleGroupsString = uniqueMuscleGroups.join(', ');
        return muscleGroupsString;
    }





    const removeWorkout = (date: string) => {
        const updatedExercises = workoutExercises.filter(
            (exercise) => exercise.date !== date
        );
        setWorkoutExercises(updatedExercises);
    };


    const navigateToExercise = (date: string) => {
        router.push(`/Exercises?date=${encodeURIComponent(date)}`);
    };





    return (

        <div className={style.container}>
            <div id={style.navContainer}>
                <Nav changeView='./login'></Nav>
            </div>
            <div id={style.section}>
                <div id={style.titleContainer}>
                    <h1 id={style.title}>Workouts</h1>
                </div>
                <form id={style.WorkoutForm} onSubmit={addWorkout}>
                    <h2 id={style.formTitle}>Add New Workout</h2>
                    <div id={style.inputGroup}>
                        <input
                            id={style.muscleInputField}
                            type="text"
                            name="muscleGroups"
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
                        <button id={style.addWorkoutButton} type="submit">Add Workout</button>
                    </div>
                </form>
                {Object.keys(groupedExercises).map((date) => (
                    <div key={date} className={style.workoutGroup}>

                        {/* Workout Card for each date */}
                        <div className={style.workoutCard}>
                            
                            <p id={style.date}>
                                {date}
                            </p>
                            <div id={style.summaries}>
                                <p id={style.muscleGroups}>Muscle Groups: {getAllMuscleGroups(groupedExercises[date], date)}</p>
                                <p id={style.totalSets}>Total Exercises: {groupedExercises[date].length}</p>
                                <p id={style.totalVolume}>
                                    Total Volume: {calculateTotalVolumeLifted(groupedExercises[date])} lbs
                                </p>
                              
                               
                            </div>
                          

                            <div id={style.buttonContainer}>
                                <button
                                    id={style.removeExerciseButton}
                                    onClick={() => removeWorkout(date)}
                                >
                                    Remove Workout
                                </button>
                                <button
                                    id={style.viewExercisesButton}
                                    onClick={() => navigateToExercise(date)}
                                >
                                    View Exercises
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default WorkoutPage;





{/** 

  
*/}