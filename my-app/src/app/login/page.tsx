"use client";
import React from "react";
import FormComponent from "../components/LoginSignupForm";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //login logic will go here

        router.push('./home');
    };
    return (
        <FormComponent
            formType="Login"
            onSubmit={handleLogin}
            buttonText="Login"
            linkText="Sign up"
            linkAction={() => router.push('./signup')}
            isLogin={true}
        />
    );
};

export default LoginPage;