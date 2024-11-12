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
                    <Link href={changeView}>Change View</Link>
                </div>
                <div className={styles.tabs}>
                    <Link href='./login'>Sign Out</Link>
                </div>
            </div>
        </nav>
    )
};