import React, { useState } from 'react';
import SetCard from './SetCard';
import style from './ExerciseCard.module.css'
import Image from 'next/image'


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
  imageUrl: string;
  

}

const ExerciseCard: React.FC = () => {

  const dummyExercises: Exercise[] = [
    {
      muscleGroup: 'Chest',
      sets: [
        { reps: 10, weight: 50 },
      ],
      date: '01/01/2023',
      dayOfWeek: 'Monday',
      imageUrl: "data:image/jpeg;base64,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"
    },
    {
      muscleGroup: 'Back',
      sets: [
        { reps: 12, weight: 60 },
      ],
      date: '02/01/2023',
      dayOfWeek: 'Tuesday',
      imageUrl: 'data:image/jpeg;base64,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'
    },
    {
      muscleGroup: 'Legs',
      sets: [
        { reps: 12, weight: 400 },
      ],
      date: '02/06/2023',
      dayOfWeek: 'Friday',
      imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHBhUUBxMVFhUXGRoZFhUXGBYYGhofGxkbGhodGB4dHiggGCAoGxceIjMiJSkrMzAwGSAzODM4QyotLjcBCgoKDg0OGxAQGi4iICItNy03MC0xNy03KzUrMTctNS0wLSstNS0tLS0vKy8rLS0xLS0tNzctLS0tLS0tLS0tK//AABEIALYBFQMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABEEAACAQIEAwUEBQkGBwEAAAABAgADEQQFEiEGMUETIlFhcQcygZEUI0KSsRVSYnKCoaKywUNTg8Ph8CQlM5OzwtEW/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAIxEBAAICAQQCAwEAAAAAAAAAAAECAxExBBIhURNBMmGxBf/aAAwDAQACEQMRAD8A7jERAREQEREBERARPjEKt25Cc4z3Nc9zHEseHqaUaI9wns2qOPE67qL+AG3jA6RE5bwl7Q8UmfrhOLKYBZtC1lGnSx91agBsQTtqW1iRtuSOpQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREDQz8kZLV7M2YoQp5bsLDextuedjaRmBfEMiCyFdPfIBUhha2xY7EHla4Ikvm2HOLyuqlL3mRgp8Dbun52lQPEVDLcvFIVAatgGpKCagNrHUoGq/LmIGpneSflHH3oaAQVOre9w19rA72E6LKbw0zLmQ/KA0NVDOtM2utrBA36TDW1r7aB4S5QEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEis2z2nltQJZnqH7Ccx5seSj9/gJkz3N6eS4A1MSdyQqL1djsqj49eguekp+Ly9MyyR2avVpu9ya1OoKbKwO/e2C3PQtuLbWsAEhmnFTJSAOile+rvEvsDstwLE8r2PPbeaeTuMPTV6696oQzcidYuGAO/2tKeplIyvhXFDNKb5Tj6rsSWPbotcWBte7MNuVyu/fBE6EyfT8204jZlQWUXAO5uwPInUeY8QetgGyoXEEmvYsX5i/LcDzHJiPIib2R5sK9dqNR9RUXRvzhyIv1I8eoI8zIavkXZMSztpItbYcun+/CYKmS/SWIJJ02sSSSPCx5jleBe4kFwtjalak9LGnU1O1nPNlJYDV4sCh39JOwEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBNbMMfTy3CmpjWCqOp/ADmT5CbMq3HuCOKwtIrvapbTewJI2J67aenjArmd4h+IMeKqKyov/SD2BsBuQu4BZup6BQQJyji3iuuuZ1MPk1eqlCm5AKkq7MCdTM3vc7i1+l+s6nicTU3RaR7Q/V0qahru52uSQCR+kdgAzGc54w9mWZZbm1RsJRbEU2OvtKQBN23YaL6tmvbY3FvSBn9nftEORN2Od3ekTtV3ZlN/t3O6i53G4vvqFgOz1a1Ps1xNE6xbkvNh9q3yHyn5vyThbE5znC0GpVKe47RnRk0rff3hu3gOp+M78mW/k/ArWy1yQRqZSbg925K35E29CT53gZeMcQtfJQ+X1OoKW6m/I9fUdLHznrDZoMJgTr95lU263N9h48pq1sroZzhRVw3dc3OxsGPU2Pd1Dxt622ser9Do9ri6dyqsoIH2iRsR9k38zz5wNvhLEuM+qriR76AqfNGOofHXf8AZMuUrOQVVxmdv2C92lTUFuhapZrD0Vd/1xLNAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQExYnDriqJWuLqem45bixG4N+omWIGjl+U0MuN8Ilja1yWY28AWJIGw+Qm9EQOb43EfQuLqwwgYliVXR3SpVRUYk3Grv1iP2ZIYTED6PTulTUrDVpFx3W3uQCrC4v0vMWcU/+ZaaZAIxLsWAF+9SU2/iAPpJDCYQ1MGyU2AXUwG1z7x/qYENpr5XiC9LQEY/W0kuwXTsahUgWW433Fr332AnMcoOVt21kDLa63cMCNrC9wfC17fKbGJanSpu9Q7Md1A3boL+Pp/8AZi4Tw1GrgmUoQyOxKXbSAzFkIW+nTY2G32T4QM3A2Wtl2SXrX1VGLkHmBYKgPh3FBt0JMsMRAREQEREBERAREQEREBInijPU4dyhq1ZWcjZaac2Y8h4KOpJ5AH0ktIHPK2nN6Kst10vflse7a4PPYHl0DGBy7Ee1bNVr6hQw6J+Y1Osduvf1i58wo9J0zgbi2nxdlJqUVKVEOmrSJvpPMEHbUp6Gw5EcwZgzVEznKWWrTYDcEMoBuDa3MjmOYJmh7PMk/JeYV2pjSjpTAFwTcFzuBytfr4wLzERAREQEREBERAREQEREBERATBj8YmX4J6uLOlKal2PgFFz+4TPOc+1vMTiBRwND+0YVa9ulNSdAPkzrf/DI6yJnSaxudKXhOIK9R3r1f7WsamnoCTYAHw7Ngt/0RLflPFYFL6xOpJ38DfwlarYZXwIVRsdXlsG3kLWr1cupurAsBYlwNlW9u94XJA+MRwTysubcRvjhfL1ChSSCTqPw/NHMcuUsXs3zD6Zn+JNRrl6dJhfwVql/Sxe1vOUDCY0YaneoO4QqMfAi9j8739fKTXszY0+PiE5NSqfIlSf4kX5ysT5aWpqsS7RERLsiIiAiIgIiICIiAiIgJA8QIwzLDshABLo26gna62J5Ws3LxmjnGZ1sdmJo5cxWmpIdl2ZyPeAPNFHK43JvbYbwedpSRSMMl6rqKVubXZlB1MehAPePpztAls9zb6VW7DAnVUOwVdwCftMeijnfy8dpI5DmlNUK1xpOoqtQ+64B7pv9m/gdt9jvaQeUpTy+iyYZQDYhbC2od4htuppqWv1NpPIKYwmmtp0hAGtuNgALeIIJgT8SuZXnAwQ7PMrqoP1dVt1K87Melt9ztYDfnLHAREQEREBERAREQEREBERATjueYg1/aPXZjtTKqPRaabffLH4zsU4DxRiHy/jvFpUG5qXX0YKy/wAwEw6j8Hd/nRE5vPpccvelj+Ge1roLpUrUyVFj7xYcvK3zEis3ycVMLjEw5axpUS197WxNNvwVp94XrCjlmJoVttNSlV36hmCPf4KPvS5ZJk5xPDmIfEizYpGsORCaSKfoe8W8tXlL4p3SJY9XTszWj9/3y5hl2DTE8O1Gdj3VDEaR1JI6+klPZwi4Xi9NJa4Ur3iN0YWPyfs/veUjeHsSDw8Q326YB+X+klODTr4zoW+0p/cUY/yzlx5LfJp6mfp6R08zEO0RETueGREQEREBERAREQEheL82bJ8jd8LbtSNNIEXGogm5HWwBNvKTU53xPxRh8VmyqEqVaSKQTSCm7ORc7sDbStgw56yfC4esNmyZHlAq48hbooDMyrdiOrMQBdrnfzn3gw0cyKVab03Y+8yMHIJ5i4JtvfaatdMHxBlD/lKlSCoW1CqqhqSk3RtViVGkrurIo3BaVTI+CcJmeKTEcL1XosjuNaNrS6G1yHJ1oDYEBrMG52gdOrYYV82q9l3QoCWBP5oBsAdhY2sOVvMzAcuam+7c2vcb3PK92uQfMT1llRqWYkV1VNV2BViwuLXtcAi43tvax3njjKr2OB7Si9mUgjpqPQHyP9YCplpxlMlySQefXxBkpwi7Ll5pVTfszZf1CAyj4XKjyUSOwWbdllrGqLE2ax8xax87gieOF69WlnzrX9yomw8Gpn+oY/dEC4REQEREBERAREQEREBERASg+0vIEx1CpXw6E4iklJk0i5YCobiw3PdvL9IHG1KlTPiKNgq01vcbklj+AI+9ItG41K9LzS0Wj6c64SyypmueWxtJ0Woih0dSpKowdyVNjpJCp/iHwnYKi6qRA6giUeiTgeIhXDkhmCEdNLWBv6NY/s+Zl7kUrFY1CcuSclptL8x4Ra2HwbBVNqd1f9EgbhvDl+6Xn2Z4f6Txej/3VFr/ALewP7jLhU4Vo086xqcqeOpA6bCy1AXFRl9datbxLT5w7ltLhjFg1bKKmpCwva/cK3PQd1vnMKYO28S78/XRkxTSF0iInS8wiIgIiICIiAiIgJyXPMAeFalQabUi31bMygWO/Ub25c77ect3EvFwynBCoisUdtFPQAWY2O9z3UXY7kMT4TmWbZHU4jxbYnNW0X91WdqhUeAJ2A62VVHlMsmatOXVg6S+WO7iPam+0DMTjswprTqq9LsgyhWva7Ns9ri4te1zbV0NxMfCnGmK4WUrgtDU2bU1Nx1ta6kbqbDz9OcsdDgd+Jm04BgFpneu1gijqG8Tb7I3Gx5TSxns0q4FWbFYmkyD+7D3be32rW9d/SWx3767U6jD8V+3e3V8h4gp53kCVcUnZ1KyggE6gASQDfbe49eR6iamNwOIwtXUymqpv2ZNmAJ2su4F9yATYm9he9po5faliT+SgVpBKdluCAhT3bHc2csAL9LetgwFStl9Nu61SjbcEAkXNrKvNl6W3ItsDLsHvKKtHG1aZqmzKpLowKm/PcHmAS24uN+clMpxKYnOaYoj+w7Qn9Yqq/8At8pHfVY/DkONQO6lSQ6nfdSwDHnuN9ttwTM/A+GcYqu9bkNNJf2S7N/Oo+FuhgW6IiAiIgIiICIiAiIgIiICV3NsR9GxlfbcUTU8/d6f9s/KWKQ2Z4damad77dFwf2SAP/KYFcw1enm2Lp08Cb3YMQOiKQWJ8Pzd+pAl8lS9n2VLg8LVqruaj2B6hUGnT8H1/u8JbZEJnW/CM4jIo5U9Vrg0QaoI590EsPMFbi3+kr2dXxeDPYG63BHhewcX8RYmXDE0VxOHZKwurAqR5EWP7jKLkrGjkr4fEbvTJS52voZqVx6rTv8AGShYuEMx+n5ZZ73pnTvztba/obr+zJyV3hHD9lUxDdGdD8TTVjb4vLFAREQEREBERATy660IPUWnqIFMzrtaNHsMTSDUioTnYMLc+ex25cxa/nIWjkmCZgKlKowB91q9Z0Ftt7c9+hPSdKq0lrUytUAg8wRcSp51w7UwJNbILk82pE+946SeZ8jz8ZWa1nmGlMt6eK2mG0lGgMKqlW0KO6iq1NF/VVbD53kBxTjaWX5S/ZUwuogbBQTuOe9zsOshqvEGIFYFKTqoPfVVJv5bju38r+Ql4fh3L+IsrBdS6uLq+t9YPkb3U+Q28pMKTE/blz5i2Hs9DwIZfEHlp8wd7eZm1nXHjUck/wCBX61tkLbqLd5mIvvYC1vFh5ybq+yDTX/4TH1An5tSkrt94Mo/hmLij2a0Mr4cNTL+0qVabaqjMRdqZBVwFFlUANr2Go6LXMRtMxEcS57kPEWZ08XVOBqmoGu7LUUOPDUBbunrZbDflJn2U57icLxrTGIqM1PFlg6n3bimWRgo2BGgLt0Nugmz7HshqVs6apiLaEQ0yL3uTpIPpYesn8g4To8P+0tBWbuaXbCix94qbofAhC1vECUiLcui1scRNY9OrxETRykREBERAREQEREBERAx4nEJhaBfEsFVRcsxAAHmTIM4w45zVsVQKRTBuGYGxLMPs3sLDn487DVxGRtm2Y9pmaaijE01YnQnQWB2Jt1AP4WmqeVJp+vuzdTqZR8ADYfj5wNHgzVSyns643V3I9HYuL+Y1EfASemOhQXDpaiLD/fPxmSAlXzbCChmzMg9/Sx9dFRT/KD6sZaJBZ6/Z5lS93enV5+Rpgeuzn5wM/C57TJUfq41H5BfwUSWkTwvU7TJl5bFgCORsx5fh8JLQEREBERAREQEREBESB4jy+pmzik4Jole8oJGskkEN+iB59TtyIDVxWJoY/NSuDVagFxUfYqG8FPU89XT43mTKVbB5g3Z+4zAaR1O/eHmOp6i/gJuZdkVPC0AukKi+6iEgD1IsSZI0MIlA/VD4kk/K52gZ58YBls24PMT7EDmWIwp4C4iZ8MrHDVtwL30m3eF/EWvY7keNjPOd4xs54swT5duA9Num3e3P3Fb4Ey58bYOljeFcQMcupVpO4t7wKqSpU9Dcf0Mq3BmFC8UrqU2FFnF9grXprcD9VyPifEQOixEQEREBERAREQEREBERAREQEREBKLxhmCniIJcfVUd7kDeqwNvlTU/ES9Sv5nwrTzHMWq12Pet3SAQLBBt4e5/EfKBi4Br9pkzKRbRVcfetU/zLfCWWamWZdTyzDlMKLAksfMn/QAfCbcBERAREQEREBERAREQEREBERAr/HWLGG4ddWteqVpAHrqPe/gDH4SvcK4sf/pKYWxBpvTBBv4P/lS3Z/k653hAlVitiTcAHmrL18mMxZVw7Qy3E66KjVckGwFr87eG23xMCYiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiB/9k='
    },
    
    
  ];

  //* state to keep track of list of exercises
  const [exercises, setExercises] = useState<Exercise[]>(dummyExercises);

  //* State to mmanage the form inputs when adding a new exercise  
  const [exerciseForm, setExerciseForm] = useState({
    exerciseName: '',
    muscleGroup: '',
    imageUrl: '',
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
      imageUrl: exerciseForm.imageUrl,
    };

    //* updating the exercise state with the new exercise
    setExercises([...exercises, newExercise]);

    //* resettingn the form inputs
    setExerciseForm({
      exerciseName: '',
      muscleGroup: '',
      imageUrl: ''
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
      <div id = {style.section}>
        <h1 id = {style.title}>Daily Workout</h1>
      <form  onSubmit={addExercise}>
        <div id = {style.inputGroup}>
          <input id={style.inputField}
            type="text"
            name="muscleGroup"
            value={exerciseForm.muscleGroup}
            onChange={handleExerciseChange}
            placeholder="Muscle Group"
            required
          />
          <input id={style.inputField}
            type="text"
            name="imageUrl"
            value={exerciseForm.imageUrl}
            onChange={handleExerciseChange}
            placeholder="Image"
            required
          />
          <button className = {style.addExerciseButton}type="submit">Add Exercise</button>
        </div>
      </form>
      {exercises.map((exercise, exerciseIndex) => (
        <div  className={style.exercise}key={exerciseIndex}>
            <p id = {style.muscleGroup}>Muscle Group: {exercise.muscleGroup}</p>
            <p id = {style.date}>Date: {exercise.dayOfWeek} {exercise.date}</p>
            <Image src={exercise.imageUrl} alt='image for exercise' width={100} height={100}></Image>
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
    reps: 0,
    weight: 0,
});

//* Handle changes to the set input form 
const handleSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //* update the form state with new input values
    setSetForm({
        ...setForm,
        [name]: value === '' ? 0 : Number(value),
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
        reps: 0,
        weight: 0,

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
   <div id={style.repsAndWeight}>
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
  </div>
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