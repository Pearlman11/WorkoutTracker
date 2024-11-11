import React from 'react';
import ExerciseCard from './ExerciseCard';

export default function DailyCard() {
    return (
        <div>
            <h2>Daily</h2>
            <div>
                <h3>Monday</h3>
                <ExerciseCard />
            </div>
            <div>
                <h3>Tuesday</h3>
                <ExerciseCard />
            </div>
            <div>
                <h3>Wednesday</h3>
                <ExerciseCard />
            </div>
            <div>
                <h3>Thursday</h3>
                <ExerciseCard />
            </div>
            <div>
                <h3>Friday</h3>
                <ExerciseCard />
            </div>
            <div>
                <h3>Saturday</h3>
                <ExerciseCard />
            </div>
            <div>
                <h3>Sunday</h3>
                <ExerciseCard />
            </div>
        </div>
    );
};




