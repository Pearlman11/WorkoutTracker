import React from "react";
import style from './LoginSignupForm.module.css';
import Link from "next/link";
import Image from "next/image";
import {signIn, signOut } from "@/auth";

export async function doLogout() {
    await signOut({redirectTo: "/"});
}


interface FormComponentProps {
    formType: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText: string;
    linkText: string;
    linkAction: () => void;
    isLogin: boolean;
}


const FormComponent: React.FC<FormComponentProps> = ({
   formType,
   onSubmit,
   buttonText,
   linkText,
   linkAction,
   isLogin
 }) => {
    return (
      
           
      
        <section className={style.formContainer}>
            <div id = {style.formSection} >
                <div id = {style.logoNameContainer}>
                    
                   <Image id = {style.logo} src ={"data:image/jpeg;base64,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"} 
                   alt = {"barbell"} width={100} height={100}/>
                   <span>TrackFit</span>
                </div>
                <h2 id = {style.formTitle}>{formType}</h2>
              
                
                <form onSubmit={onSubmit}>
                    <div id={style.inputGroup}>
                        <label>Username</label>
                        <input type="text" 
                        name="username"
                        placeholder="UserName" required/>
                    </div>
                    <div id={style.inputGroup}>
                        <label>Password</label>
                        <input type="password" 
                        name="password"
                        placeholder="Password" required/>
                    </div>
       
                    {!isLogin && (
                        <div id={style.inputGroup}>
                            <div className= {style.footerLinks}>
                                <Link href = './login' onClick={(e) => {
                                    e.preventDefault();
                                    linkAction();
                                }}>{linkText}</Link>
                            </div>
                        </div>
                    )}

                    {isLogin && (
                        <div className= {style.footerLinks}>
                            
                            <Link href = '/signup' onClick={(e) => {
                                e.preventDefault();
                                linkAction();
                            }}>{linkText}</Link>
                        </div>
                    )}
                  
                        <button type="submit" className={style.formButton}>{buttonText}</button>
                  
                </form>
           
            </div>
        </section>
    );
};

export default FormComponent;
