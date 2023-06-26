import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { normalizePath } from '../utils.js';


export const calculateHash = async (currentPath, pathToFile) => {
    try {
        pathToFile = normalizePath(currentPath, pathToFile);

        const output = await readFile(pathToFile);

        console.log(createHash('sha256').update(output).digest('hex'));

    } catch (err) {
        throw err;
    }
}