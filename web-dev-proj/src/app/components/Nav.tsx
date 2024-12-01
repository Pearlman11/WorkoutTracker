"use client"
import styles from './Nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { doLogout } from './Login';

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
                <Link href="/BMI" className={styles.navLink}>
                    BMI Calculator
                </Link>
                {currentPath === '/Exercise' ? (
                    <Link href="/home" className={styles.navLink}>
                        Go to Workouts
                    </Link>
                ) : (
                    <Link href="/Exercise" className={styles.navLink}>
                        Go to Exercises
                    </Link>
                )}
                
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