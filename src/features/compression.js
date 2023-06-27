import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import * as fs from 'fs';
import { normalizePath } from '../utils.js';
import { join, normalize } from 'path';

export const compress = async (currentPath, pathToFile, pathToDest) => {
    pathToFile = normalizePath(currentPath, pathToFile);
    pathToDest = normalizePath(currentPath, pathToDest);

    try {

        const readStream = fs.createReadStream(pathToFile);
        const writeStream = fs.createWriteStream(pathToDest);
        const compressedStream = createBrotliCompress();


        readStream
            .on('error', () => readStream.destroy())
            .pipe(compressedStream)
            .pipe(writeStream)
            .on('error', () => readStream.destroy());

    } catch (err) {
        throw err;
    }
}

export const decompress = async (currentPath, pathToFile, pathToDest) => {
    pathToFile = normalize(join(currentPath, pathToFile));
    pathToDest = normalize(join(currentPath, pathToDest));

    try {

        const readStream = fs.createReadStream(pathToFile);
        const writeStream = fs.createWriteStream(pathToDest);
        const decompressedStream = createBrotliDecompress();


        readStream
            .on('error', () => readStream.destroy())
            .pipe(decompressedStream)
            .pipe(writeStream)
            .on('error', () => readStream.destroy());

    } catch (err) {
        throw err;
    }
}
