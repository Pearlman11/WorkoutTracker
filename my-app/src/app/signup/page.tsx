"use client";
import React from "react";
import FormComponent from "../components/LoginSignupForm";
import { useRouter } from "next/navigation";


const SignupPage: React.FC = () => {
    const router = useRouter();

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //signup logic here
        router.push('/home');
    };

    return (
        <FormComponent
            formType="Sign Up"
            onSubmit={handleSignup}
            buttonText="Sign up"
            linkText="Login"
            linkAction={() => router.push('/login')}
            isLogin={false}
        />
    );
};
export default SignupPage;