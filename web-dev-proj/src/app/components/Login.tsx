"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";
import style from "./LoginSignup.module.css";
import Image from "next/image";
import Link from "next/link";

interface LoginResponse {
  ok: boolean;
  error: string | null;
}

// Utility Function: Logout Functionality
// Handles logging out the user and redirecting to login page
export async function doLogout() {
  try {
    await signOut({ callbackUrl: "/login" });
  } catch (err) {
    console.error("Error during logout:", err);
  }
}

// Utility Function: Credential Login
// Handles user login using email and password credentials
export async function doCredentialLogin(formData: FormData): Promise<LoginResponse> {
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response?.ok) {
      alert("Login failed");
    }

    return response as LoginResponse;
  } catch (e) {
    alert("Error during login:");
    throw e;
  }
}

// Component: Login Form
// Renders the login form and handles form submission
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
    // Section: Login Form UI
    // Renders the login form with email and password inputs
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
        <h2 id={style.formTitle}>Login</h2>
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
        <Link className={style.link} href="/">
          Don&apos;t have an account? Sign up here
        </Link>
        <Link className={style.link} href="/About">
          About Us
        </Link>
      </div>
    </section>
  );
}
