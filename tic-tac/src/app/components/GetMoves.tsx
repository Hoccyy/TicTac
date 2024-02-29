import OpenAI from "openai";
import GridParser from './GridParser';
import CompletionCheck from './CompletionCheck';

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

const GetMoves = async ({ grid = '', CPU = 'O', USER = 'X' }: Props) => {
    let CPUGrid = '';

    // Processes the user's request through the OpenAI API with selective prompting
    const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
            role: "user",
            content: "This is a game of Tic tac toe played on a 3x3 grid. You are playing as the " + CPU + " on this grid:" + grid +
            "The rules you MUST follow are:\n" +
            "1. You cannot change or overwrite any characters '" + USER + 
            "'.\n2. You CANNOT move around the users character, '" + USER+ "'. all characters '" + USER +  "' must stay intact the entire time." + 
            "\n3. You can ONLY make one move at a time" + 
            "\n4. You can ONLY choose to use your character, '" + CPU + "' for each move." + 
            "\n5. You MUST make precisely one move, you cannot skip." + 
            "\n6. If all the grids are full OR someone has 3 characters in a row you do nothing and change nothing." + 
            "\n7. You MUST try to win at any chance you get by getting 3 '" + CPU + "' in a whole row, OR down an entire column OR diagonally. Play as if you are an expert." + 
            "\n8. You MUST try to defend and stop. '" + USER + "' From getting 3 in a row, column, or diagonally. Stop them at any chance." + 
            "\n9. Treat the array as a 3x3 grid. you need to get 3 '" + CPU + "' in a row, colun, or diagonally to win." + 
            "Do the best most logical move possible to make the game extremely hard." +
            "\nFormatting is as follows, (you must follow all these rules):\n" +
            "1. Return only the 3x3 grid, not your explanation." +
            "2. Return the grid in array format, again with no explanation just the array formatted grid" +
            "DO NOT ever return anything EXCEPT a 3x3 array, as 3 arrays nested inside of ONE like [[], [], []]. No messages."
        }],
        stream: true,
    });

    let loadingMessage = document.getElementById('StatusMessage');
    loadingMessage!.innerHTML = 'Thinking...';

    for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) CPUGrid += (chunk.choices[0].delta.content);
    }
    //alert(CPUGrid);
    GridParser({grid : CPUGrid, CPU: CPU, USER : USER});
    CompletionCheck({ CPU: CPU, USER : USER});
    
    loadingMessage!.innerHTML = '⠀';
    return CPUGrid;
};

export default GetMoves;
