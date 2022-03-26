import "mocha";

import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { promptUserInput } from "../../lib/typing-game/UserInput";

describe("UserInput", () => {
    before(() => {
        use(chaiAsPromised);
    });

    describe("promptUserInput", () => {
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
