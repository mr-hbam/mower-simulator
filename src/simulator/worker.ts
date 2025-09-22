import { parentPort, workerData } from "worker_threads";

(async function run() {
    const { id, commands } = workerData;
    for (const cmd of commands) {
        parentPort?.postMessage({ type: "command", mowerId: id, command: cmd });

        // wait for main thread confirmation
        await new Promise<void>((resolve) => {
            parentPort?.once("message", (msg) => {
                if (msg.type === "ack" && msg.mowerId === id) {
                    resolve();
                }
            });
        });
    }

    parentPort?.postMessage({ type: "done", mowerId: id });
})();