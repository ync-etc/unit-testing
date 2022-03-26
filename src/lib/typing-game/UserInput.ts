import readline from "readline";

export function promptUserInput(question = ""): Promise<string> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (userInput: string) => {
            rl.close();
            resolve(userInput);
        });
    });
}
