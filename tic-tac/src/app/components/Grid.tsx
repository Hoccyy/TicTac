'use client'
import React from 'react';
import styles from '../page.module.css'
import GetMoves from './GetMoves';
import CompletionCheck from './CompletionCheck';


const Grid = ({ keyID = '0', CPU = 'O', USER = 'X' }) => {
    return (
        <div id={'gridContainer'+keyID} className={styles.grid} onClick={() => {
            let thisGrid = document.getElementById('gridNum'+keyID);
            if (thisGrid!.innerHTML != '') {
                return;
            }
            // TODO: User's choice
            thisGrid!.innerHTML = 'X';
            document.getElementById('gridContainer'+keyID)!.setAttribute('style', 'background-color: lightblue;');

            let GridAsArray = [];
            for (let i = 0; i < 9; i++) {
                if (document.getElementById('gridNum'+i)?.innerHTML != '') {
                    GridAsArray.push(document.getElementById('gridNum'+i)?.innerHTML);
                } else {
                    GridAsArray.push('-');
                }
            }
            // TODO?
            let gridString = (
                GridAsArray.slice(0, 3) +
                '\n' +
                GridAsArray.slice(3, 6) + 
                '\n' +
                GridAsArray.slice(6, 9)
            );

            GetMoves({ grid: gridString, CPU: CPU, USER: USER });
        }}>
            <h1 id={'gridNum'+keyID}></h1>
        </div>
    );
};

export default Grid;
