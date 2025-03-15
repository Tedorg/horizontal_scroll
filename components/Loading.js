import styles from "@/styles/loading.module.css";

import { useState, useEffect } from 'react';

export default function Loading() {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsExiting(true), 400); // Adjust duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${styles.loadingContainer} ${isExiting ? styles.slideUp : ''}`}>
            <div className={styles.spinner}></div>
        </div>
    );
}