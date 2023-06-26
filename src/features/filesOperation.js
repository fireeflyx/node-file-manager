import * as fs from 'fs';
import { writeFile, rm as removeFile, rename} from 'fs/promises';
import { normalizePath } from '../utils.js';

export const cat = async (currentPath, pathToFile) => {
    pathToFile = normalizePath(currentPath, pathToFile);

    try {
        const readStream = fs.createReadStream(pathToFile);

        readStream.on('data', (chunck) => {
            process.stdout.write(chunck.toString());
        })

        readStream.on('error', () => readStream.destroy())

    } catch (err) {
        throw err;
    }
}

export const add = async (currentPath, fileName) => {
    let pathToFile = normalizePath(currentPath, fileName)

    try {
        await writeFile(pathToFile, '', { flag: 'wx' });
    }
    catch (err) {
        throw err;
    }
}

export const rm = async (currentPath, fileName) => {
    let pathToFile = normalizePath(currentPath, fileName);

    try {
        await removeFile(pathToFile);
    }
    catch (err) {
        throw err;
    }
}

export const rn = async (currentPath, oldFileName, newFileName) => {
    oldFileName = normalizePath(currentPath, oldFileName);
    newFileName = normalizePath(currentPath, newFileName);

    try {
        await rename(oldFileName, newFileName);
    }
    catch (err) {
        throw err;
    }
}

