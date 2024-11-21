"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Nav from './components/Nav/Nav';
import FormComponent from './components/LoginSignupForm';
import { useRouter } from "next/navigation";
import DailyView from './components/DailyView/DailyView';

const Page: React.FC = () => {
  const pathname = usePathname();
  console.log("current path:" + pathname);
  const isLoggedIn = false;
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //login logic will go here

    router.push('./home');
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
