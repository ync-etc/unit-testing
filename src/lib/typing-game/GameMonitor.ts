import { updateConsoleLine } from "./LineUpdater";
import { calculateScore } from "./ScoreCalculator";
import { SentenceGenerator } from "./SentenceGenerator";
import { promptUserInput } from "./UserInput";

export class GameMonitor {
    constructor(private generator: SentenceGenerator) { }

    public countdown(): Promise<void> {
        return new Promise((resolve) => {
            const process = (count: number) => {
                updateConsoleLine(`    ${count}`);
                if (count > 0) {
                    count--;
                    global.setTimeout(() => process(count), 1000);
                    return;
                }
                console.log("GO!!");
                resolve();
            };
            process(3);
        });
    }

    public async start(): Promise<void> {
        const text = this.generator.generate();

        const startTime = Date.now();
        console.log(text);
        const userInput = await promptUserInput();
        const elapsedTimeMs = Date.now() - startTime;
        const elapsedTimeSec = elapsedTimeMs * 0.001;

        console.log("----- Result -----");
        console.log(text);
        console.log(userInput);

        const score = calculateScore({
            original: text,
            userInput,
            time: elapsedTimeSec,
        });
        console.log(`\nYour score is: ${Math.trunc(score)}`);
        console.log(`Time: ${elapsedTimeSec} (Sec)`);
    }
}
