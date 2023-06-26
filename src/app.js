import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output} from 'node:process';
import { printCurrentDirectory, printFarewell, printGreeting } from "./utils.js";



export const startWork = async () => {
    const username = process.argv[process.argv.length - 1].split('=')[1] || 'Username';
    const currentWorkingDirectory = process.cwd();

    printGreeting(username);
    printCurrentDirectory(currentWorkingDirectory);

    const rl = readline.createInterface({ input, output });

    rl.on('line', (line) => {
        try{
            const command = line;

            try{
                switch(command){
                    case '.exit': rl.close();
                }
            } catch(err){

            }
        } catch (err){

        }
    })


    rl.on('close', () => {
        printFarewell(username);
    })
}