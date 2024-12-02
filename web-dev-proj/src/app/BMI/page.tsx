"use client";

import React, { useState } from "react";
import styles from "./bmi.module.css";
import Nav from "../components/Nav"; // Import the Nav component

export default function BMIPage() {
    const [weight, setWeight] = useState("");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [bmi, setBMI] = useState<number | null>(null);
    const [category, setCategory] = useState<string | null>(null);

    const calculateBMI = () => {
        const weightNum = parseFloat(weight);
        const feetNum = parseFloat(feet);
        const inchesNum = parseFloat(inches);

        if (isNaN(weightNum) || isNaN(feetNum) || isNaN(inchesNum) || feetNum < 0 || inchesNum < 0) {
            alert("Please enter valid numbers for weight, feet, and inches!");
            return;
        }

        // Convert weight from pounds to kilograms
        const weightInKgs = weightNum * 0.453592;

        // Convert feet and inches to total height in meters
        const totalHeightMeters = ((feetNum * 12) + inchesNum) * 0.0254;

        if (totalHeightMeters <= 0) {
            alert("Height must be greater than zero!");
            return;
        }

        const bmiValue = weightInKgs / (totalHeightMeters * totalHeightMeters);
        setBMI(bmiValue);

        // Determine BMI category
        if (bmiValue < 18.5) {
            setCategory("Underweight");
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            setCategory("Normal weight");
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            setCategory("Overweight");
        } else {
            setCategory("Obese");
        }
    };

    return (
        <>
            {/* Include Nav at the top */}
            <Nav changeView="" />

            {/* BMI Calculator UI */}
            <div className={styles.bmiContainer}>
                <h1>BMI Calculator</h1>
                <div className={styles.inputGroup}>
                    <label htmlFor="weight">Weight (lbs):</label>
                    <input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter your weight"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Height:</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input
                            id="feet"
                            type="number"
                            value={feet}
                            onChange={(e) => setFeet(e.target.value)}
                            placeholder="Feet"
                            className={styles.input}
                        />
                        <input
                            id="inches"
                            type="number"
                            value={inches}
                            onChange={(e) => setInches(e.target.value)}
                            placeholder="Inches"
                            className={styles.input}
                        />
                    </div>
                </div>
                <button onClick={calculateBMI} className={styles.calculateButton}>
                    Calculate BMI
                </button>
                {bmi !== null && (
                    <div className={styles.result}>
                        <h2>Your BMI: {bmi.toFixed(2)}</h2>
                        <p>Category: {category}</p>
                    </div>
                )}
            </div>
        </>
    );
}