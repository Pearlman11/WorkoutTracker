"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Nav from './components/Nav/Nav';
import FormComponent from './components/LoginSignupForm';
import { useRouter } from "next/navigation";
import DailyView from './components/DailyView/DailyView';
import {signIn, signOut } from "next-auth/react";

export async function doLogout() {
  await signOut({redirectTo: "/"});
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const response = await signIn("credentials", {
      username,
      password,
      redirect: false, // Avoid automatic redirection
    });

    console.log("SignIn Response:", response);
    return response;
  } catch (err: any) {
    console.error("Error during login:", err.message);
    throw err;
  }
}




const Page: React.FC = () => {
  const pathname = usePathname();
  console.log("current path:" + pathname);
  const isLoggedIn = false;
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    try {
      const response = await doCredentialLogin(formData);
  
      if (response?.ok) {
        console.log("Login successful:", response);
        router.push("/home");
      } else {
        console.error("Login failed:", response?.error);
        alert("Invalid login credentials.");
      }
    } catch (err: any) {
      console.error("Login error:", err.message);
      alert("An error occurred during login.");
    }
  };
  
  
  

  return (
    <div>
      {
        isLoggedIn ? (
          <>
            <div className='nav'>
              <Nav changeView='./login' />
            </div>
            <div className='dv'>
              <DailyView />
            </div>
          </>
        ) : (
          <FormComponent
            formType="Login"
            onSubmit={handleLogin}
            buttonText="Login"
            linkText="Sign up"
            linkAction={() => router.push('./signup')}
            isLogin={true}
          />
        )
      }
    </div>
  );
};

export default Page;
