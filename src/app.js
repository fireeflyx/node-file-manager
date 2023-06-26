import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { printCurrentDirectory, printFarewell, printGreeting } from "./utils.js";
import { commands } from './commands.js';
import { cd, ls, up } from './features/navigation.js';
import { calculateHash } from './features/hash.js';


export const startWork = async () => {
    const username = process.argv[process.argv.length - 1].split('=')[1] || 'Username';
    let currentWorkingDirectory = process.cwd();

    printGreeting(username);
    printCurrentDirectory(currentWorkingDirectory);

    const rl = readline.createInterface({ input, output });

    rl.on('line', async (line) => {

        try {
            const input = line.split(" ");
            let command = input[0];
            let option = input[1];

            try {
                switch (command) {
                    case commands.commandsWithoutOptions.up: {
                        currentWorkingDirectory = up(currentWorkingDirectory);
                        break;
                    }
                    case commands.commandsWithoutOptions.ls: {
                        await ls(currentWorkingDirectory);
                        break;
                    }
                    case commands.commandsWithOneOption.cd: {
                        currentWorkingDirectory = await cd(currentWorkingDirectory, option);
                        break;
                    }
                    case commands.commandsWithOneOption.hash: {
                        await calculateHash(currentWorkingDirectory, option);
                        break;
                    }
                    case '.exit': {
                        rl.close();
                        return;
                    };
                }
            } catch (err) {

            }
        } catch (err) {

        }

        printCurrentDirectory(currentWorkingDirectory);

    })


    rl.on('close', () => {
        printFarewell(username);
    })
}