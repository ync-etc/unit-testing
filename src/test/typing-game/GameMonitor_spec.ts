import "mocha";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import { GameMonitor } from "../../lib/typing-game/GameMonitor";

describe("GameMonitor", () => {
    let instance: GameMonitor;

    before(() => {
        use(chaiAsPromised);
    });

    beforeEach(() => {
        instance = new GameMonitor();
    });

    describe("countdown", () => {
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
            expect(result).not.to.be.fulfilled;
        });

        it("should resolve after 3 seconds", () => {
            const result = instance.countdown();
            fakeTimer.tick(3000);
            expect(result).to.eventually.be.fulfilled;
        });

        it("should not call resolve twice after 6 seconds", () => {
            const result = instance.countdown();
            fakeTimer.tick(6000);
            expect(result).to.eventually.be.fulfilled;
        });
    });
});
