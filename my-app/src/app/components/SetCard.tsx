import React from 'react';
import style from './SetCard.module.css'

interface Set {
  reps: number;
  weight: number;
}



interface SetCardProps {
  set: Set;
  removeSet: () => void;
}



const SetCard: React.FC<SetCardProps> = ({ set, removeSet }) => {
  const volume = set.reps * set.weight
  return (
    <div className={style.setCard}>
      <div className = {style.setContainer}>
        <p id = {style.reps}>Reps: {set.reps}</p>
        <p id = {style.weight}>Weight: {set.weight} LBS</p>
        <p id = {style.volume}>Volume: {volume} LBS</p>
        <button  id ={style.removeSetButton}onClick={removeSet}>Remove Set</button>
      </div>
    </div>
  );
};

export default SetCard;