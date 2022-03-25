import * as path from "path";
import { loadSentenceFiles, Sentences } from "./SentenceFileLoader";

export class SentenceGenerator {
    private sentences: Sentences = [];

    public async load(): Promise<void> {
        // This way doesn't allow us to use a test file in unit test
        const resourceDir = path.join(__dirname, "../res");
        // This function can be stubbed
        this.sentences = await loadSentenceFiles(resourceDir);
    }

    public async load2(): Promise<void> {
        const resourceDir = process.env.CONFIG_DIR || path.join(__dirname, "../res");
        this.sentences = await loadSentenceFiles(resourceDir);
    }

    public generate(): string {
        const choices = this.sentences.map((phrases: string[]) => {
            const random = Math.random() * phrases.length;
            const index = Math.trunc(random);
            return phrases[index];
        });
        return choices.join(" ") + ".";
    }
}
