import {Position} from "../domain/position";
import {Simulator} from "./simulator";
import {MowerInput} from "../file-reader/input-reader";
import {Orientation} from "../domain/mower";
import * as workerThreads from "worker_threads";


describe("Simulator", () => {
    it("runs simulation and stores results", async () => {
        // Given
        const lawnMax = new Position(5, 5);
        const mowerInputs: MowerInput[] = [
            {
                position: new Position(1, 2),
                orientation: Orientation.NORTH,
                commands: 'LFLFLFLFF',
            },
            {
                position: new Position(3, 3),
                orientation: Orientation.EAST,
                commands: 'FFRFFRFRRF',
            },
        ];
        const simulator = new Simulator(lawnMax, mowerInputs);

        // When
        await simulator.run();

        // Then
        const mower1 = simulator.output.get("mower-1");
        const mower2 = simulator.output.get("mower-2");

        expect(mower1).toEqual({ x: 1, y: 3, orientation: "N" });
        expect(mower2).toEqual({ x: 5, y: 1, orientation: "E" });
    });
})