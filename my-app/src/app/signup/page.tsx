"use client";
import React from "react";
import FormComponent from "../components/LoginSignupForm";
import { useRouter } from "next/navigation";

interface User {
    username: string,
    password: string,
}
const SignupPage: React.FC = () => {
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
       
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
    
        try {
            
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); 
                router.push('/home'); 
            } else {
                const errorData = await response.json();
                console.error(errorData.message); 
                alert("Failed to create user");
            }
        } catch (error) {
            console.error("An error occurred during signup:", error);
            alert("An error occurred. Please try again.");
        }
    };
    

    return (
        <FormComponent
            formType="Sign Up"
            onSubmit={handleSignup}
            buttonText="Sign up"
            linkText="Login"
            linkAction={() => router.push('/')}
            isLogin={false}
        />
    );
};
export default SignupPage;