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
            <div>
                <h1>Track Fit</h1>
            </div>
            <div className={styles.tabContainer}>

                    {currentPath === '/Exercises' ? (
                        <div>
                            <Link href="/Workouts">
                                <button className={styles.navButton}>Go to Workouts</button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link href="/Exercises">
                                <button className={styles.navButton}>Go to Exercises</button>
                            </Link>
                        </div>
                    )}
                   
                        <Link className = {styles.signout} href={changeView}>Sign Out</Link>

            </div>
        </nav>
    );
}