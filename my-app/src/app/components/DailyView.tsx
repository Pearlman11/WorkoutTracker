import React from 'react';
import WeeklySummary from './WeeklySummary';
import DailyCard from './DailyCard';
import style from './DailyView.module.css'

export default function DailyView() {
    const isLoggedIn = false

    return (
        <div className={style.dailyView}>
            {!isLoggedIn ? (
                <div className={style.alertBox}>
                    <div className={style.alert}>
                        <p>Please sign in or create an account to continue...</p>
                        <div className={style.alertButtons}>
                            <button className={style.button}>Sign up</button>
                            <button className={style.button}>Sign In</button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className={style.dailyCard}>
                        <DailyCard />
                    </div>
                    <div className={style.weekly}>
                        <WeeklySummary />
                    </div>
                </>
            )}
        </div>
    );
};
