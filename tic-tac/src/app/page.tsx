import Image from "next/image";
import styles from "./page.module.css";
import Grid from './components/Grid';
import StatusBar from './components/StatusBar';

const grids : any = [];

for (let i = 0; i < 9; i++) {
  grids.push(<Grid key={i} keyID={i+''} CPU='O' USER='X'/>);
}

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Tic-Tac</h1>
      <p id='tallier'>0 - 0</p>
      <StatusBar/>
      <div className={styles.mainFrame}>
        {grids}
      </div>
    </main>
  );
}
