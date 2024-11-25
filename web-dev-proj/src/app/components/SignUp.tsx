"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./LoginSignup.module.css";
import Image from "next/image";

export default function SignUp() {
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        const user = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }

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

        router.push('/login');
    }

    return (
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
                    <button className={style.formButton} type="submit">
                        Create Account
                    </button>
                </form>
                <a id={style.loginLink} href="/login">
                    Already have an account? Login here
                </a>
            </div>
        </section>
    );
}