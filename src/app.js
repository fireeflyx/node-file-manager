import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { printCurrentDirectory, printFarewell, printGreeting } from "./utils.js";
import { commands } from './commands.js';
import { cd, ls, up} from './features/navigation.js';
import { calculateHash } from './features/hash.js';
import { compress, decompress } from './features/compression.js';
import { add, cat, rm, rn} from './features/filesOperation.js';


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
            let option1 = input[1];
            let option2 = input[2];

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
                        currentWorkingDirectory = await cd(currentWorkingDirectory, option1);
                        break;
                    }
                    case commands.commandsWithOneOption.hash: {
                        await calculateHash(currentWorkingDirectory, option1);
                        break;
                    }
                    case commands.commandsWithOneOption.cat: {
                        await cat(currentWorkingDirectory, option1);
                        break;
                    }
                    case commands.commandsWithOneOption.add: {
                        await add(currentWorkingDirectory, option1);
                        break;
                    }
                    case commands.commandsWithOneOption.rm: {
                        await rm(currentWorkingDirectory, option1);
                        break;
                    }
                    case commands.commandsWithTwoOptions.rn: {
                        await rn(currentWorkingDirectory, option1, option2);
                        break;
                    }
                    case commands.commandsWithTwoOptions.compress: {
                        await compress(currentWorkingDirectory, option1, option2);
                        break;
                    }
                    case commands.commandsWithTwoOptions.decompress: {
                        await decompress(currentWorkingDirectory, option1, option2);
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