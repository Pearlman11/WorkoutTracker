import React from "react";
import DailyView from "../components/DailyView";
import Nav from "../components/Nav";

export default function DailyPage() {
    return (
        <div>
            <div className='nav'>
                <Nav changeView="/login" />
            </div>
            <div className='dv'>
                <DailyView />
            </div>
        </div>
    );
}
