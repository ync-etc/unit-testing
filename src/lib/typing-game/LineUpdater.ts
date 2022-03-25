/**
 * Overwrite a console line
 */
export function updateConsoleLine(text: { toString: () => string }): void {
    process.stdout.write(text.toString() + "\r");
}
