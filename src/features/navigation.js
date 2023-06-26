import { readdir, access } from 'fs/promises';
import { dirname, join, normalize } from 'path';
import * as fs from 'fs';


export const up = (path) => {
    return dirname(path);
}

export const ls = async (path) => {
    try {
        let files = await readdir(path);

        let output =
            [...files.filter(i => isDirectory(join(path, i))).sort((a, b) => a - b).map(i => ({ Name: i, Type: 'directory' })),
            ...files.filter(i => !isDirectory(join(path, i))).sort((a, b) => a - b).map(i => ({ Name: i, Type: 'file' }))];

        console.table(output);

    } catch (err) {
        throw err;
    }
}

export const cd = async (currentPath, target) => {
    let normalizedPath = normalize(join(currentPath, target));
    console.log(normalizedPath);
    try {
        await access(normalizedPath);
        return normalizedPath;
    } catch (err) {
        throw err;
    }
}

export const isDirectory = (path) => {
    return fs.lstatSync(path).isDirectory() ? true : false;
}
