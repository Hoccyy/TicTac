import OpenAI from "openai";

const GPT_API_KEY = "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";

const openai = new OpenAI({
    apiKey: GPT_API_KEY,
    dangerouslyAllowBrowser: true
});

type Props = {
    grid: any,
    CPU: string,
    USER: string,
};

const GridParser = async ({ grid = '', CPU = 'O', USER = 'X' }: Props) => {
    let GridAsArray : any = [];

    let start = grid.indexOf('[');
    let end = grid.lastIndexOf(']') + 1;

    let gridString =  (grid.substr(start, end)).trim().replace(/'/g, '"');

    let gridList: any[] = [];

    try {
        gridList = JSON.parse(gridString);//
    } catch (error) {
        alert("Grid string: \n"  + gridString)
        alert ("original grid:" + grid)
    }
    if (gridList == null) {
        return;
    } 
    

    gridList = gridList.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
    }, []);
    
    for (let i = 0 ; i < 9; i++) {
        if (![USER, CPU].includes(gridList[i])) {
            continue;
        }
        document.getElementById('gridNum'+i)!.innerHTML = gridList[i];
        if (gridList[i] == CPU) {
            document.getElementById('gridContainer'+i)!.setAttribute('style', 'background-color: orange;');
        }
    }
    return;
};

export default GridParser;
