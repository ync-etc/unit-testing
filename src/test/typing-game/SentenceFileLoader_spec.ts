import "mocha";
import { expect } from "chai";
import sinon from "sinon";
import { loadSentenceFiles } from "../../lib/typing-game/SentenceFileLoader";
import path from "path";
import fs from "fs";

describe("SentenceFileLoader", () => {
    describe("loadSentenceFiles", () => {
        context('there is no file', () => {
            it("should return empty array", async () => {
                const dir = path.join(__dirname, "../res/empty");
                const result = await loadSentenceFiles(dir);
                expect(result).to.be.empty;
            });
        });

        context('there are 3 files', () => {
            let dir: string;
            beforeEach(() => {
                dir = path.join(__dirname, "../res/files");
            });

            it("should return 3 length of array", async () => {
                const result = await loadSentenceFiles(dir);
                expect(result).to.be.lengthOf(3)
            });
            it("should contain 1.txt contents in the first index", async () => {
                const result = await loadSentenceFiles(dir);
                expect(result[0]).to.deep.equal(["AA1", "AA2"]);
            });
            it("should contain 2.txt contents in the second index", async () => {
                const result = await loadSentenceFiles(dir);
                expect(result[1]).to.deep.equal(["BBB1", "BBB2"]);
            });
            it("should contain 12.txt contents in the first index", async () => {
                const result = await loadSentenceFiles(dir);
                expect(result[2]).to.deep.equal(["CC 1", "CC 2", "CC 3"]);
            });
        });

        describe('stub functions of fs modules', () => {
            let readdirStub: sinon.SinonStub;
            let readFileStub: sinon.SinonStub;

            beforeEach(() => {
                readdirStub = sinon.stub(fs.promises, "readdir");
                readFileStub = sinon.stub(fs.promises, "readFile");
            });

            afterEach(() => {
                readdirStub.restore();
                readFileStub.restore();
            });

            [
                "12.txt",
                "0x123.txt",
            ].forEach((filename) => {
                it(`should contain files whose filename is a number (${filename})`, async () => {
                    readdirStub.resolves([filename]);
                    readFileStub.resolves("aaa\r\nbbb\r\n");
                    await loadSentenceFiles("dir");
                    expect(readFileStub.calledWith(`dir\\${filename}`)).to.be.true;
                });
            });

            it(`should not contain files whose filename is not a number`, async () => {
                readdirStub.resolves(["foo.txt"]);
                readFileStub.resolves("aaa\r\nbbb\r\n");
                await loadSentenceFiles("dir");
                expect(readFileStub.notCalled).to.be.true;
            });

            it(`should sort file array by ascending`, async () => {
                readdirStub.resolves([
                    "12.txt",
                    "4.txt",
                    "3.txt",
                ]);
                readFileStub.resolves("aaa\r\nbbb\r\n");
                await loadSentenceFiles("dir");
                expect(readFileStub.firstCall.calledWith(`dir\\3.txt`)).to.be.true;
                expect(readFileStub.secondCall.calledWith(`dir\\4.txt`)).to.be.true;
                expect(readFileStub.thirdCall.calledWith(`dir\\12.txt`)).to.be.true;
            });
        });
    });
});
