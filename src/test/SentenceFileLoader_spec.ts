import "mocha";
import { expect } from "chai";
import { loadSentenceFiles } from "../lib/SentenceFileLoader";
import path from "path";

describe("SentenceFileLoader", () => {
    describe("loadSentenceFiles", () => {
        context('there is no file', () => {
            it("should return empty array", async () => {
                const dir = path.join(__dirname, "./res/empty");
                const result = await loadSentenceFiles(dir);
                expect(result).to.be.empty;
            });
        });

        context('there are 3 files', () => {
            let dir: string;
            beforeEach(() => {
                dir = path.join(__dirname, "./res/files");
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
    });
});
