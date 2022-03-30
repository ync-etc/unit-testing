export interface ScoreInput {
    original: string;
    userInput: string;
    time: number;
}

export function calculateScore(args: ScoreInput): number {
    let diffCount = 0;
    for (let i = 0; i < args.original.length; i++) {
        if (args.userInput[i] === undefined || args.userInput[i] === null) {
            diffCount++;
            continue;
        }

        if (args.original[i] !== args.userInput[i]) {
            diffCount++;
        }
    }

    if (args.userInput.length > args.original.length) {
        diffCount += args.userInput.length - args.original.length;
    }

    const calculateCorrectRate = () => {
        if (diffCount === 0) {
            return 1;
        } else if (args.original.length === 0 || args.original.length < diffCount) {
            return 0;
        } else {
            return (args.original.length - diffCount) / args.original.length;
        }
    };
    const correctRate = calculateCorrectRate();

    const time = args.time <= 1 ? 1 : Math.sqrt(args.time);

    return 10000 * correctRate / time;
}
