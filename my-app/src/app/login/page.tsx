"use client";
import React from "react";
import FormComponent from "../components/LoginSignupForm";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";

const LoginPage: React.FC = () => {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //login logic will go here

        router.push('./home');
    };
    return (
        <div>
            <Nav changeView="/"/>
            <FormComponent
                formType="Login"
                onSubmit={handleLogin}
                buttonText="Login"
                linkText="Sign up"
                linkAction={() => router.push('./signup')}
                isLogin={true}
            />
        </div>
    );
};

export default LoginPage;