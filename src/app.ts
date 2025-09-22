import {readInput} from "./file-reader/input-reader";
import {Simulator} from "./simulator/simulator";

async function main() {
    const { lawnMax, mowers } = readInput("input.txt");
    const simulator = new Simulator(lawnMax, mowers);
    console.log("Running simulator");
    await simulator.run();
    simulator.output.forEach((state, mowerId) => {
        console.log(`${mowerId}: ${state.x} ${state.y} ${state.orientation}`);
    });
}

main().catch((err) => {
    console.error("Simulator failed:", err);
    process.exit(1);
});