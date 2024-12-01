"use client";

import React from 'react';
import styles from './about.module.css';
import Nav from '../components/Nav';

const AboutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Nav/>
      <div className={styles.content}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.message}>
          Welcome to TrackFit! This app was developed to help users track their workouts and progress. Our goal is to provide an easy-to-use platform that helps you stay motivated and achieve your fitness goals.
        </p>
        <h2 className={styles.subtitle}>Meet the Developers</h2>
        <ul className={styles.developers}>
          <li>Developer 1: Jake Pearlman</li>
          <li>Developer 2: Ethan </li>
          <li>Developer 3: Michael</li>
          <li>Developer 4: Lucas</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;