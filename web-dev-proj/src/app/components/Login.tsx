"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";
import style from "./LoginSignup.module.css";
import Image from "next/image";

export async function doLogout() {
  try {
    await signOut({ callbackUrl: "/login" });
  } catch (err) {
    console.error("Error during logout:", err);
  }
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response?.ok) {
      throw new Error(response?.error || "Login failed");
    }

    return response;
  } catch (err: any) {
    console.error("Error during login:", err.message);
    throw err;
  }
}

export default function Login() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
        const response = await doCredentialLogin(formData);
        console.log("Login response:", response);

        if (response?.error === null) {
            console.log("Login successful:", response);
            window.location.href = "/home"; 
        } else {
            console.error("Login failed:", response?.error);
            alert("Invalid login credentials. Please try again.");
        }
    } catch (err) {
        console.error("Login failed:", err);
        alert("An unexpected error occurred during login.");
    }
};


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
                        />
                    </div>
                    <div id={style.inputGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                    </div>
                    <button className={style.formButton} type="submit">
                        Login
                    </button>
                </form>
                <a id={style.loginLink} href="/">
                    Don't have an account? Sign up here
                </a>
            </div>
        </section>
  );
}
