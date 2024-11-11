import styles from './Nav.module.css';

export default function Nav() {
    return (
        <nav className = {styles.nav}>
            <div>
                <h1 >Track Fit</h1>  
            </div>
            <div className={styles.tabContainer}>
                <div className={styles.tabs}>
                    <a href="/login">Workouts</a>
                </div>
                <div className={styles.tabs}>
                    <a href="/login">Change View</a>
                </div>
                <div className={styles.tabs}>
                    <a href="/login">Sign Out</a>
                </div>
            </div>
        </nav>
    )
};