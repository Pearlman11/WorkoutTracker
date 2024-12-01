import React from 'react';
import style from './SetCard.module.css';

// Interface: Set
// Represents a set containing reps and weight properties
interface Set {
  reps: number;
  weight: number;
}

// Interface: SetCardProps
// Defines the props for the SetCard component including a set and a remove function
interface SetCardProps {
  set: Set;
  removeSet: () => void;
}

// Component: SetCard
// Renders a card that displays the details of a workout set
const SetCard: React.FC<SetCardProps> = ({ set, removeSet }) => {
  const volume = set.reps * set.weight;

  return (
    // Section: Set Card Container
    // Contains the set information and remove button
    <div className={style.setCard}>
      <div className={style.setContainer}>
        {/* Display Reps */}
        <p id={style.reps}>Reps: {set.reps}</p>
        {/* Display Weight */}
        <p id={style.weight}>Weight: {set.weight} LBS</p>
        {/* Display Volume Calculation */}
        <p id={style.volume}>Volume: {volume} LBS</p>
        {/* Button: Remove Set */}
        <button id={style.removeSetButton} onClick={removeSet}>Remove Set</button>
      </div>
    </div>
  );
};

export default SetCard;