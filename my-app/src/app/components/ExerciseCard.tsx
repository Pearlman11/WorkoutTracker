import React, { useState } from 'react';
import SetCard from './SetCard';
import style from './ExerciseCard.module.css'


 /**
 *  *Defined the Set interface to represent a single set of an exercise
 */

interface Set {
  reps: number;
  weight: number;
}

 /**
 *  *Defined the Exercise interface to represent an exercise with multiple sets
 */

interface Exercise {
  muscleGroup: string;
  sets: Set[];
  date: string;
  dayOfWeek: string;

}

const ExerciseCard: React.FC = () => {
  //* state to keep track of list of exercises
  const [exercises, setExercises] = useState<Exercise[]>([]);

  //* State to mmanage the form inputs when adding a new exercise  
  const [exerciseForm, setExerciseForm] = useState({
    exerciseName: '',
    muscleGroup: '',
  });

  //* Handle Changes to the exercise form 
  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //* Updating the form state with the new input values
    setExerciseForm({
      ...exerciseForm,
      [name]: value,
    });
  };

  //* Function to add the new exercise to the list  
  const addExercise = (e: React.FormEvent) => {

    e.preventDefault();

    //* getting the current date and the day of the week for use    
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dayOfWeek = currentDate.toLocaleDateString(undefined, { weekday: 'long' });


    //* creating a new exercise object with the form inputs as well as date
    const newExercise: Exercise = {
      muscleGroup: exerciseForm.muscleGroup,
      sets: [],
      date: dateString,
      dayOfWeek: dayOfWeek,
    };

    //* updating the exercise state with the new exercise
    setExercises([...exercises, newExercise]);

    //* resettingn the form inputs
    setExerciseForm({
      exerciseName: '',
      muscleGroup: '',
    });
  };


  /* 
  * function to remove an exercise from the list
  * 1. filter out the exercise at the specified index
  * 2. update exercise state with filtered list
  */ 
  const removeExercise = (exerciseIndex: number) => {

    const updatedExercises = exercises.filter((_, index) => index !== exerciseIndex);
    
    setExercises(updatedExercises);

  };

  return (
    <div className={style.container}>
      <h1>Daily Workout</h1>
      <form className={style.addExerciseForm} onSubmit={addExercise}>
        <input
          type="text"
          name="muscleGroup"
          value={exerciseForm.muscleGroup}
          onChange={handleExerciseChange}
          placeholder="Muscle Group"
          required
        />
        <button id = {style.addExerciseButton}type="submit">Add Exercise</button>
      </form>
      {exercises.map((exercise, exerciseIndex) => (
        <div  className={style.exercise}key={exerciseIndex}>
            <p id = {style.muscleGroup}>Muscle Group: {exercise.muscleGroup}</p>
            <p id = {style.date}>Date: {exercise.dayOfWeek} {exercise.date}</p>
          <div id={style.buttonContainer}>
            <button id = {style.removeExerciseButton}onClick={() => removeExercise(exerciseIndex)}>Remove Exercise</button>
          </div>
          <SetList 
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            setExercises={setExercises}
          />
        </div>
      ))}
    </div>
  );
};




interface SetListProps {
  exercise: Exercise;
  exerciseIndex: number;
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const SetList: React.FC<SetListProps> = ({ exercise, exerciseIndex, setExercises }) => {
  //* State to manage form input for adding new set
const [setForm, setSetForm] = useState<Set>({
    reps: NaN,
    weight: NaN,
});

//* Handle changes to the set input form 
const handleSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //* update the form state with new input values
    setSetForm({
        ...setForm,
        [name]: value === '' ? NaN : Number(value),
    });
};

  /**
   * * Function to add a new set to the exercise 
   * * 1. Create a copy of the exercises array
   * * 2. create a new exercise obest with updated sets
   * * 3. replace the old exercise with the new one
   * * 4. reset the form inputs
   */
  const addSet = (e: React.FormEvent) => {
    e.preventDefault();
    setExercises(prevExercises => {
      // Create a deep copy of the exercises array
      const updatedExercises = [...prevExercises];
      // Create a new sets array with the new set added
      const updatedSets = [...updatedExercises[exerciseIndex].sets, setForm];
      // Create a new exercise object with the updated sets
      const updatedExercise = {
        ...updatedExercises[exerciseIndex],
        sets: updatedSets,
      };
      // Replace the old exercise with the updated one
      updatedExercises[exerciseIndex] = updatedExercise;
      return updatedExercises;
    });
    setSetForm({
        reps: NaN,
        weight: NaN,

    });
  };

    /**
   * * Function to remove a set 
   * * 1. Create a copy of the exercises array
   * * 2. filter out the set at the index
   * * 3. create new exercise object with updated sets
   * * 4. replace the old exercise with the updated one
   */ 
  const removeSet = (setIndex: number) => {
    setExercises(prevExercises => {
      const updatedExercises = [...prevExercises];
      const updatedSets = updatedExercises[exerciseIndex].sets.filter(
        (_, index) => index !== setIndex
      );
      const updatedExercise = {
        ...updatedExercises[exerciseIndex],
        sets: updatedSets,
      };
      updatedExercises[exerciseIndex] = updatedExercise;
      return updatedExercises;
    });
  };

  return (
    <div className={style.setList}>
  <form className={style.repsAndWeightForm} onSubmit={addSet}>
  <input
    className={style.repsInput}
    type="number"
    name="reps"
    value={setForm.reps}
    onChange={handleSetChange}
    placeholder="Reps"
    required
  />
  <input
    className={style.weightInput}
    type="number"
    name="weight"
    value={setForm.weight}
    onChange={handleSetChange}
    placeholder="Weight"
    required
  />

  <button id={style.addSetButton} type="submit">Add Set</button>
</form>
      {exercise.sets.map((set, setIndex) => (
        <SetCard
          key={setIndex}
          set={set}
          removeSet={() => removeSet(setIndex)}
        />
      ))}
    </div>
  );
};

export default ExerciseCard;