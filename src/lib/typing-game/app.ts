import { GameMonitor } from "./GameMonitor";
import { SentenceGenerator } from "./SentenceGenerator";
import { promptUserInput } from "./UserInput";

async function run() {
    const generator = new SentenceGenerator();

    const loadPromise = generator.load();
    const userReady = promptUserInput("Press enter if you are ready to start.");

    // Wait for the two promises above.
    await Promise.all([loadPromise, userReady]);

    const game = new GameMonitor(generator);
    await game.countdown();
    await game.start();
}

run().then(() => { }).catch((error) => console.error(error));
