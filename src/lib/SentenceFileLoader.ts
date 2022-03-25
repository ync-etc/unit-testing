import path from "path";
import fs from "fs";

export type Sentences = string[][];
/**
 * Load sentence files
 * @param dir Directory that contains sentence files
 * @returns 
 */
export async function loadSentenceFiles(dir: string): Promise<Sentences> {
    const files = await fs.promises.readdir(dir);
    const numberFiles = files.filter((x) => /\d+.txt/.test(x))
        .sort((a, b) => {
            const regex = /(\d+).txt/;
            const numberA = regex.exec(a)![1];
            const numberB = regex.exec(b)![1];
            return parseInt(numberA, 10) - parseInt(numberB, 10);
        });

    let result: Sentences = [];
    for (let i = 0; i < numberFiles.length; i++) {
        const filePath = path.join(dir, numberFiles[i]);
        const contents = await fs.promises.readFile(filePath, "utf-8");
        const sentences = contents.split("\r\n");
        result.push(sentences);
    }
    return result;
}
