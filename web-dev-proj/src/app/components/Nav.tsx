"use client";

import styles from './Nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { doLogout } from './Login';

// Component: Navigation Bar
// Renders the navigation bar with links to different pages and logout functionality
export default function Nav() {
    const currentPath = usePathname();

    return (
        // Section: Navigation Container
        // Contains the main navigation bar elements
        <nav className={styles.nav}>
            {/* Logo Link: Redirects to Home Page */}
            <Link href="/home" className={styles.logo}>
                <h1>Track Fit</h1>
            </Link>

            {/* Section: Navigation Links */}
            <div className={styles.navLinks}>
                {/* Conditional Link: Displays based on current path */}
                {currentPath === '/Exercise' ? (
                    <Link href="/home" className={styles.navLink}>
                        Go to Workouts
                    </Link>
                ) : (
                    <Link href="/Exercise" className={styles.navLink}>
                        Go to Exercises
                    </Link>
                )}

                {/* Link: Redirects to Exercise Templates Page */}
                <Link href="/WorkoutOptions" className={styles.navLink}>
                    Exercise Templates
                </Link>

                {/* Link: Redirects to About Us Page */}
                <Link href="/About" className={styles.navLink}>
                    About Us
                </Link>

                {/* Button: Logout Functionality */}
                <button
                    onClick={doLogout}
                    className={styles.logoutButton}
                >
                    Sign Out
                </button>
            </div>
        </nav>
    );
}
