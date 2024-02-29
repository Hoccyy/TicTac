"use client";
import React from 'react';
import styles from '../page.module.css'


// <progress className={styles.timerProgress} value={13} max={100}></progress>
const StatusBar = ({
    placeHolder = ''
}) => {
    return (
        <main>
            <h1 id='StatusMessage'>⠀</h1>
        </main>
    );
};

export default StatusBar;