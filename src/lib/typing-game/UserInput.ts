import readline from "readline";

export function promptUserInput(question: string): Promise<string> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question + "\n", (userInput: string) => {
            rl.close();
            resolve(userInput);
        });
    });
}
