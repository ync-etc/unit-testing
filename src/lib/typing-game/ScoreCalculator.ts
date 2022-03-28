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
        } else if (args.original.length === 0) {
            return 0;
        } else {
            return (args.original.length - diffCount) / args.original.length;
        }
    };
    // const correctRate = diffCount === 0 ? 1 :
    //     (args.original.length - diffCount) / args.original.length;
    const correctRate = calculateCorrectRate();

    return 10000 * correctRate / Math.sqrt(args.time);
}
