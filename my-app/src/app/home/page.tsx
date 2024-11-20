import React from "react";
import DailyView from "../components/DailyView";
import Nav from "../components/Nav";
import WorkoutPage from "../Workouts/page";




export default function DailyPage() {

    interface Set {
        reps: number;
        weight: number;
      }
    
    interface Exercise {
        exerciseName: string;
        muscleGroup: string;
        sets: Set[];
        date: string;
        dayOfWeek: string;
        imageUrl: string;
  
    
    }
    interface Workout {
        exercises: Exercise[];
        muscleGroups: string;
        date: string;
        dayOfWeek: string;
        imageUrl: string;
        
    }
    
    interface WorkoutProps {
        workoutExercise: Exercise[];
    }

    const dummyExercises: Exercise[] = [
        {
          exerciseName: 'Bench Press',
          muscleGroup: 'Chest',
          sets: [{ reps: 10, weight: 50 },{reps: 20, weight: 25}, {reps: 2, weight: 150}],
          date: '01/01/2023',
          dayOfWeek: 'Monday',
          imageUrl: 'data:image/jpeg;base64,...',
    
          
        },
        {
          exerciseName: 'Pull Up',
          muscleGroup: 'Back',
          sets: [{ reps: 12, weight: 60 }],
          date: '02/01/2023',
          dayOfWeek: 'Tuesday',
          imageUrl: 'data:image/jpeg;base64,...',
          
        },
        {
          exerciseName: 'Squat',
          muscleGroup: 'Legs',
          sets: [{ reps: 12, weight: 400 }],
          date: '02/06/2023',
          dayOfWeek: 'Friday',
          imageUrl: 'data:image/jpeg;base64,...',
    
        },
      ];

     



    return (
        <div>
            <div className='dv'>
        
              <WorkoutPage workoutExercise={dummyExercises}></WorkoutPage>
            </div>
        </div>
    );
}
