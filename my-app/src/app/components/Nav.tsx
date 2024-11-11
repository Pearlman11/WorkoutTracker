import styles from './Nav.module.css';
import Link from 'next/link';

/*
 *Initial Nav component idea...will update later when daily/weekly view is implemented
 */

interface NavProps {
    changeView: string;
}

export default function Nav({changeView}: NavProps) {
    return (
        <nav className = {styles.nav}>
            <div>
                <h1 >Track Fit</h1>  
            </div>
            <div className={styles.tabContainer}>
                <div className={styles.tabs}>
                    <a href={changeView}>Change View</a>
                </div>
                <div className={styles.tabs}>
                    <a href="/login">Sign Out</a>
                </div>
            </div>
        </nav>
    )
};