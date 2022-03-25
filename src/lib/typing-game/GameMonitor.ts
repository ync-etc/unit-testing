import { updateConsoleLine } from "./LineUpdater";

export class GameMonitor {
    public countdown(): Promise<void> {
        return new Promise((resolve) => {
            const recursive = (count: number) => global.setTimeout(() => {
                updateConsoleLine(count);
                count--;
                if (count > 0) {
                    recursive(count);
                    resolve();
                }
            }, 1000);
            recursive(3);
        });
    }
}
