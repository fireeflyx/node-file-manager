import {isAbsolute, resolve} from 'path'

export const printGreeting = (username) => {
    process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
}

export const printFarewell = (username) => {
    process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
}

export const printCurrentDirectory = (pathToWorkingDirectory) => {
    process.stdout.write(`You are currently in ${pathToWorkingDirectory}\n`);
}

export const normalizePath = (current, target) => {
    return isAbsolute(target) ? target : resolve(current, target);
}