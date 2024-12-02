"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./LoginSignup.module.css";
import Image from "next/image";
import Link from "next/link";

// Component: SignUp Form
// Renders a sign-up form allowing users to create an account
export default function SignUp() {
    const router = useRouter();

    // State: Form Data
    // Stores the values of username, email, and password input fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Handler: Input Change
    // Updates the form data as the user types into the input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler: Form Submit
    // Handles the sign-up form submission, sends user data to the server
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        try {
            await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
        } catch (err) {
            alert(err);
        }

        // Redirect to login page after successful sign-up
        router.push('/login');
    };

    return (
        // Section: Sign Up Form UI
        // Renders the sign-up form with username, email, and password input fields
        <section className={style.formContainer}>
            <div id={style.formSection}>
                <div id={style.logoNameContainer}>
                    <Image
                        id={style.logo}
                        src="/images/barbell.jpeg"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                    <span>TrackFit</span>
                </div>
                <h2 id={style.formTitle}>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    {/* Input: Email */}
                    <div id={style.inputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {/* Input: Username */}
                    <div id={style.inputGroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {/* Input: Password */}
                    <div id={style.inputGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {/* Button: Submit Form */}
                    <button className={style.formButton} type="submit">
                        Create Account
                    </button>
                </form>
                {/* Link: Redirect to Login Page */}
                <Link className={style.link} href="/login">
                    Already have an account? Login here
                </Link>
                <Link className={style.link} href="/About">
                    About Us
                </Link>
            </div>
        </section>
    );
}
