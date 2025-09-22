import {Lawn} from "../domain/lawn";
import {Mower} from "../domain/mower";
import {MowerInput} from "../file-reader/input-reader";
import {Position} from "../domain/position";
import path from "path";
import {Worker} from "worker_threads";
import {Command} from "./command";

export class Simulator {
    private readonly lawn: Lawn;
    private mowers: Map<string, Mower>;
    private readonly _output: Map<string, { x: number; y: number; orientation: string }>;

    constructor(lawnMax: Position, mowerInputs: MowerInput[]) {
        this.lawn = new Lawn(lawnMax);
        this.mowers = new Map<string, Mower>();
        this._output = new Map<string, { x: number; y: number; orientation: string }>();
        mowerInputs.forEach((m, i) => {
            const mowerKey = `mower-${i+1}`;
            const mower = new Mower(mowerKey, m.position, m.orientation, this.lawn, m.commands);
            this.mowers.set(mowerKey, mower);
        });
    }

    get output(): Map<string, { x: number; y: number; orientation: string }>{
        return this._output;
    }

    public async run() {
        const workersDone: Promise<void>[] = [];

        this.mowers.forEach((mower, key) => {
            const worker = this.createWorker(mower.key, mower.commands);
            const donePromise = new Promise<void>((resolve, reject) => {
                worker.on("message", (msg) => {
                    if (msg.type === "command") {
                        this.handleCommand(msg.command, mower);
                        worker.postMessage({ type: "ack", mowerId: msg.mowerId });
                    }

                    if (msg.type === "done") {
                        this.handleDone(mower);
                        resolve();
                    }
                });
            });
            workersDone.push(donePromise);
        });
        await Promise.all(workersDone);
    }

    private createWorker(id: string, commands: string) {
        const workerPath = path.resolve(__dirname, "./worker.ts");
        return new Worker(workerPath, {
            workerData: {id, commands},
            execArgv: ["-r", "ts-node/register"],
        });
    }

    private handleCommand(command: Command, mower: Mower) {
        switch (command) {
            case Command.LEFT: mower.turnLeft(); break;
            case Command.RIGHT: mower.turnRight(); break;
            case Command.MOVE_FORWARD: mower.moveForward(); break;
        }
    }

    private handleDone(mower: Mower) {
        this.output.set(mower.key, {
            x: mower.position.x,
            y: mower.position.y,
            orientation: mower.orientation,
        });
    }
}
