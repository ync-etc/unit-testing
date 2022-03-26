import "mocha";
import { expect } from "chai";
import { calculateScore } from "../../lib/typing-game/ScoreCalculator";

describe("ScoreCalculator", () => {
    describe("calculateScore", () => {
        context('original is empty', () => {
            ["input", ""].forEach((userInput) => {
                it("should return 10000 when time is 1", () => {
                    const result = calculateScore({
                        original: "",
                        userInput,
                        time: 1,
                    });
                    expect(result).to.equal(10000);
                });
            });
        });

        context('when user input matches original', () => {
            it("should return 10000 when time is 1", () => {
                const result = calculateScore({
                    original: "input",
                    userInput: "input",
                    time: 1,
                });
                expect(result).to.equal(10000);
            });

            it("should return 5000 and time is 1", () => {
                const result = calculateScore({
                    original: "input",
                    userInput: "input",
                    time: 1,
                });
                expect(result).to.equal(10000);
            });

            it("should return 5000 and time is 4", () => {
                const result = calculateScore({
                    original: "input",
                    userInput: "input",
                    time: 4,
                });
                expect(result).to.equal(5000);
            });
        });


        context('when user input does not match original', () => {
            [
                "abdc", "ab"
            ].forEach((userInput) => {
                it("should return 5000 when half correct and time is 1", () => {
                    const result = calculateScore({
                        original: "abcd",
                        userInput,
                        time: 1,
                    });
                    expect(result).to.equal(5000);
                });
            });
        });
    });
});