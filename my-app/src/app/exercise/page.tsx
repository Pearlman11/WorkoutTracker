"use client";
import React from "react";
import ExerciseCard from "../components/ExerciseCard";
import Nav from "../components/Nav";

const HomePage: React.FC = () => {
    return (
        <div>
            <Nav changeView='/' />
            <ExerciseCard />
        </div>
    );
};

export default HomePage;