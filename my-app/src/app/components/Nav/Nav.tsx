"use client"
import styles from './Nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProps {
    changeView: string;
}

export default function Nav({ changeView }: NavProps) {
    const currentPath = usePathname();

    return (
        <nav className={styles.nav}>
            <Link href="/home" className={styles.logo}>
                <h1>Track Fit</h1>
            </Link>
            <div className={styles.navLinks}>
                {currentPath === '/Exercises' ? (
                    <Link href="/Workouts" className={styles.navLink}>
                        Go to Workouts
                    </Link>
                ) : (
                    <Link href="/Exercises" className={styles.navLink}>
                        Go to Exercises
                    </Link>
                )}
                
                <Link 
                    href="/"
                    className={styles.logoutButton}
                >
                    Sign Out
                </Link>
            </div>
        </nav>
    );
}