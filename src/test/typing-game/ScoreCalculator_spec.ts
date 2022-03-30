import "mocha";
import { expect } from "chai";
import { calculateScore } from "../../lib/typing-game/ScoreCalculator";

describe("ScoreCalculator", () => {
    describe("calculateScore", () => {
        context('original is empty', () => {
            it("should return 10000 when time is 1 and user input is empty", () => {
                const result = calculateScore({
                    original: "",
                    userInput: "",
                    time: 1,
                });
                expect(result).to.equal(10000);
            });

            it("should return 0 when time is 1 and user input is not empty", () => {
                const result = calculateScore({
                    original: "",
                    userInput: "1",
                    time: 1,
                });
                expect(result).to.equal(0);
            });
        });

        context('when user input matches original', () => {
            [0.5, 1].forEach((time) => {
                it(`should return 10000 when time is ${time}`, () => {
                    const result = calculateScore({
                        original: "input",
                        userInput: "input",
                        time,
                    });
                    expect(result).to.equal(10000);
                });
            });

            it("should return 5000 when time is 4", () => {
                const result = calculateScore({
                    original: "input",
                    userInput: "input",
                    time: 4,
                });
                expect(result).to.equal(5000);
            });
        });


        context('when user input does not match original', () => {
            context('when time is 1', () => {
                it("should return 5000 when half correct and the same length", () => {
                    const result = calculateScore({
                        original: "abcd",
                        userInput: "abdc",
                        time: 1,
                    });
                    expect(result).to.equal(5000);
                });
                it("should return 5000 when userInput is half length", () => {
                    const result = calculateScore({
                        original: "abcd",
                        userInput: "ab",
                        time: 1,
                    });
                    expect(result).to.equal(5000);
                });
                it("should return 0 when userInput is empty", () => {
                    const result = calculateScore({
                        original: "abcd",
                        userInput: "",
                        time: 1,
                    });
                    expect(result).to.equal(0);
                });
                it("should return 0 when incorrect count is bigger than the original length", () => {
                    const result = calculateScore({
                        original: "abcd",
                        userInput: "xxxxyyyy",
                        time: 1,
                    });
                    expect(result).to.equal(0);
                });
                it("should return 5000 when userInput has half length extra input", () => {
                    const result = calculateScore({
                        original: "abcd",
                        userInput: "abcd11",
                        time: 1,
                    });
                    expect(result).to.equal(5000);
                });
            });
        });
    });
});