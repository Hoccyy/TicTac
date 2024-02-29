import OpenAI from "openai";

const GPT_API_KEY = process.env.NEXT_PUBLIC_GPT_API_KEY13;

const openai = new OpenAI({
    apiKey: GPT_API_KEY,
    dangerouslyAllowBrowser: true
});

type Props = {
    CPU: string,
    USER: string,
};

function routeCheck(role: string) {
    // Store grid as array
    let GridAsArray = [];
    for (let i = 0; i < 9; i++) {
        if (document.getElementById('gridNum'+i)?.innerHTML != '') {
            GridAsArray.push(document.getElementById('gridNum'+i)?.innerHTML);
        } else {
            GridAsArray.push('-');
        }
    }
    // Grid
    let gridString = (
        GridAsArray.slice(0, 3) +
        '\n' +
        GridAsArray.slice(3, 6) + 
        '\n' +
        GridAsArray.slice(6, 9)
    );

    // Row win checks
    let rowWin : boolean = false;
    for (let i = 0; i < 9; i += 3) {
        if (GridAsArray.slice(i, i + 3).join('') === role.repeat(3)) {
            console.log(role + " wins!");
            rowWin = true;
            break;
        }
    }
    if (rowWin) {
        return true;
    }

    // Column checks
    let columnWin : boolean = false;
    if (GridAsArray[0] == role && GridAsArray[3] == role && GridAsArray[6] == role || GridAsArray[1] == role && GridAsArray[4] == role && GridAsArray[7] == role || GridAsArray[2] == role && GridAsArray[5] == role && GridAsArray[8] == role) {
        console.log(role + ' wins! (column)');
        columnWin = true;
    }
    if (columnWin) {
        return true;
    }

    // Diagonals check
    let diagonalWin = false;
    if ((GridAsArray[0] == role && GridAsArray[4] == role && GridAsArray[8] == role) || (GridAsArray[2] == role && GridAsArray[4] == role && GridAsArray[6] == role)) {
        console.log(role + ' wins! (diagonal)');
        diagonalWin = true;
    }
    if (diagonalWin) {
        return true;
    }

    // Tied game
    if (!gridString.includes('-')) {
        console.log('Tied!');
        setTimeout(function() {
            document.getElementById('StatusMessage')!.innerHTML = ("Tied!");
        }, 1300);
        document.getElementById('StatusMessage')!.innerHTML = '⠀';
        resetter();
    }


    return false;
}

function sleep(ms: number) {
    const end = Date.now() + ms;
    while (Date.now() < end) continue;
}

function resetter() {
    // Store grid as array
    for (let i = 0; i < 9; i++) {
        document.getElementById('gridNum'+i)!.innerHTML = '';
        document.getElementById('gridContainer'+i)!.setAttribute('style', 'background-color: grey;');
    }
    

    sleep(1300);
    //document.getElementById('StatusMessage')!.innerHTML = '⠀';
}

const CompletionCheck = async ({ CPU = 'O', USER = 'X' }: Props) => {
    // Player check
    if (routeCheck(USER)) {
        document.getElementById('tallier')!.innerHTML = (parseInt(document.getElementById('tallier')!.innerHTML.split(' - ')[0]) + 1) + ' - ' + parseInt(document.getElementById('tallier')!.innerHTML.split(' - ')[1]);
        document.getElementById('StatusMessage')!.innerHTML = ("User won! :D");
        resetter();
        return true;
    }

    //CPU Check
    if (routeCheck(CPU)) {
        document.getElementById('tallier')!.innerHTML = parseInt(document.getElementById('tallier')!.innerHTML.split(' - ')[0]) + ' - ' + (parseInt(document.getElementById('tallier')!.innerHTML.split(' - ')[1]) + 1);
        document.getElementById('StatusMessage')!.innerHTML = ("CPU Won! 🦾🤖");
        resetter();
        return true;
    }
    return false;
};

export default CompletionCheck;
