import "mocha";
import { expect } from "chai";
import sinon from "sinon";
import path from "path";
import { SentenceGenerator } from "../../lib/typing-game/SentenceGenerator";
import * as generator from "../../lib/typing-game/SentenceFileLoader";

describe("SentenceGenerator", () => {
    let instance: SentenceGenerator;
    beforeEach(() => {
        instance = new SentenceGenerator();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("load", () => {
        it("should not throw an error", () => {
            const result = () => instance.load();
            expect(result).not.to.throw;
        });
    });

    describe("generate", () => {
        describe("load + generate", () => {
            it("should generate a sentence with space and dot", async () => {
                sinon.stub(generator, "loadSentenceFiles")
                    .resolves([
                        ["It's"],
                        ["a beautiful"],
                        ["test"],
                    ]);
                await instance.load();
                const result = instance.generate();
                expect(result).to.equal("It's a beautiful test.");
            });
        });

        describe("load2 + generate", () => {
            let originalEnv: NodeJS.ProcessEnv;

            before(() => {
                originalEnv = { ...process.env };
                // src/test/res/files
                process.env.CONFIG_DIR = path.join(__dirname, "../res/files");
            });

            after(() => {
                process.env = { ...originalEnv };
            });

            it("should generate a sentence with space and dot", async () => {
                await instance.load2();
                const result = instance.generate();
                expect(result).to.match(/(AA1|AA2) (BBB1|BBB2) (CC 1|CC 2|CC 3)./);
            });
        });
    });
});
