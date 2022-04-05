import "mocha";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import { GameMonitor } from "../../lib/typing-game/GameMonitor";
import { SentenceGenerator } from "../../lib/typing-game/SentenceGenerator";
import * as UserInput from "../../lib/typing-game/UserInput";
import sinonChai from "sinon-chai";
import * as ScoreCalculator from "../../lib/typing-game/ScoreCalculator";

describe("GameMonitor", () => {
    let instance: GameMonitor;
    let generator: SentenceGenerator;

    before(() => {
        use(chaiAsPromised);
        use(sinonChai);
    });

    beforeEach(() => {
        generator = new SentenceGenerator();
        instance = new GameMonitor(generator);
    });

    describe("countdown", () => {
        context('Without FakeTimer', () => {
            it("should be resolved after 3 seconds", async () => {
                const start = Date.now();
                await instance.countdown();
                const result = Date.now() - start;
                expect(result).to.be.greaterThan(3000);
            }).timeout(4000);
        });

        context('With FakeTimer', () => {
            let fakeTimer: sinon.SinonFakeTimers;

            beforeEach(() => {
                fakeTimer = sinon.useFakeTimers();
            });

            afterEach(() => {
                fakeTimer.restore();
            });

            it("should not be resolved after 2999 ms", () => {
                const result = instance.countdown();
                fakeTimer.tick(2999);
                // Don't add "return" here because the test fails due to timeout
                // since promise is not resolved.
                expect(result).not.to.be.fulfilled;
            });

            it("should resolve after 3 seconds", () => {
                const result = instance.countdown();
                fakeTimer.tick(3000);
                return expect(result).to.eventually.be.fulfilled;
            });

            it("should not call resolve twice after 6 seconds", () => {
                const result = instance.countdown();
                fakeTimer.tick(6000);
                return expect(result).to.eventually.be.fulfilled;
            });
        });
    });

    describe("start", () => {
        let consoleStub: sinon.SinonStub;
        let generatorStub: sinon.SinonStub;
        let userInputStub: sinon.SinonStub;
        let nowStub: sinon.SinonStub;
        let calcStub: sinon.SinonStub;

        beforeEach(() => {
            consoleStub = sinon.stub(console, "log");
            generatorStub = sinon.stub(generator, "generate");
            userInputStub = sinon.stub(UserInput, "promptUserInput");
            nowStub = sinon.stub(Date, "now");
            calcStub = sinon.stub(ScoreCalculator, "calculateScore");
        });

        afterEach(() => {
            consoleStub.restore();
            generatorStub.restore();
            userInputStub.restore();
            nowStub.restore();
            calcStub.restore();
            sinon.restore();
        });

        it("should show the generated sentence", async () => {
            generatorStub.returns("test text");
            userInputStub.resolves();
            await instance.start();
            expect(consoleStub).to.be.calledWith("test text");
        });

        it("should pass original string, userInput and elapsedTime", async () => {
            // sinon.mock throws an error without this because ScoreCalculator is already wrapped
            calcStub.restore();

            generatorStub.returns("test text");
            userInputStub.resolves("user input");
            nowStub.onFirstCall().returns(1000);
            nowStub.onSecondCall().returns(3000);

            const calcMock = sinon.mock(ScoreCalculator);
            calcMock.expects("calculateScore").calledWith({
                original: "test text",
                userInput: "user input",
                time: 2,
            });

            try {
                await instance.start();
                calcMock.verify();
            } finally {
                calcMock.restore();
            }
        });

        it("should pass original string, userInput and elapsedTime", async () => {
            generatorStub.returns("test text");
            userInputStub.resolves("user input");
            nowStub.onFirstCall().returns(1000);
            nowStub.onSecondCall().returns(3000);
            calcStub.returns(1);

            await instance.start();
            expect(calcStub).to.be.calledWith({
                original: "test text",
                userInput: "user input",
                time: 2,
            });
        });

        it("should show score", async () => {
            generatorStub.returns("test text");
            userInputStub.resolves("user input");
            nowStub.onFirstCall().returns(1000);
            nowStub.onSecondCall().returns(3000);
            calcStub.returns(12);

            await instance.start();
            expect(consoleStub).to.be.calledWithMatch("Your score is: 12");
        });

        describe("use fake timer", () => {
            let fakeTimer: sinon.SinonFakeTimers;

            beforeEach(() => {
                const timestamp = Date.parse("2022-04-04T10:11:12.000Z");
                fakeTimer = sinon.useFakeTimers(timestamp);
            });

            afterEach(() => {
                fakeTimer.restore();
            });

            function showCurrentTime(): void {
                const now = Date.now();
                const date = new Date(now);
                console.log(date.toISOString());
            }

            it("should pass original string, userInput and elapsedTime", async () => {
                // restore in order to show the current time in showCurrentTime()
                consoleStub.restore();

                generatorStub.returns("test text");

                showCurrentTime(); // 2022-04-04T10:11:12.000Z
                userInputStub.callsFake(() => {
                    fakeTimer.tick(2000);
                    return Promise.resolve("user input");
                });

                await instance.start();

                showCurrentTime(); // 2022-04-04T10:11:14.000Z
                expect(calcStub).to.be.calledWith({
                    original: "test text",
                    userInput: "user input",
                    time: 2,
                });
            });
        });
    });
});
