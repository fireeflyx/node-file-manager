import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { normalize, join} from 'path';


export const calculateHash = async (currentPath, pathToFile) => {
    try {
        pathToFile = normalize(join(currentPath, pathToFile));

        const output = await readFile(pathToFile);

        console.log(createHash('sha256').update(output).digest('hex'));

    } catch (err) {
        throw err;
    }
}