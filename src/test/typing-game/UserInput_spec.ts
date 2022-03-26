import "mocha";

import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import readline from "readline";
import { promptUserInput } from "../../lib/typing-game/UserInput";

describe("UserInput", () => {
    before(() => {
        use(chaiAsPromised);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("promptUserInput", () => {
        context("question is default value", () => {
            it("should call question function with empty string", () => {
                const rl = readline.createInterface(process.stdin);
                sinon.stub(readline, "createInterface").returns(rl);
                const stub = sinon.stub(rl, "question");
                stub.resolves();

                promptUserInput();

                expect(stub.calledWith("", sinon.match.any)).to.be.true;
            });
        });

        context("question is specified", () => {
            it("should resolve with user input", () => {
                const result = promptUserInput("my question");

                // it doesn't trigger without \r, \n or \r\n
                const input = "user input text\r";
                process.stdin.emit("data", input);

                // the received text doesn't contain \r, \n, \r\n
                return expect(result).to.eventually.equal("user input text");
            });
        });
    });
});
