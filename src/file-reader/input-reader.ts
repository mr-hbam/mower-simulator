import fs from "fs";
import path from "path";
import {Position} from "../domain/position";
import {Orientation} from "../domain/mower";
import {
    EmptyInputFileError,
    IncompleteMowerDefinitionError, InvalidMowerCoordinatesError,
    LawnDimensionsNotNumbersError
} from "./input-reader.errors";
import {InvalidLawnDimensionError} from "../domain/lawn.errors";


export interface MowerInput {
    position: Position;
    orientation: Orientation;
    commands: string;
}

export function readInput(fileName: string): { lawnMax: Position; mowers: MowerInput[] } {
    const filePath = path.resolve(__dirname, `../../input/${fileName}`);
    const lines = fs.readFileSync(filePath, "utf-8")
        .split(/\r?\n/);

    if (lines.length === 0 || !lines[0]?.trim()) {
        throw new EmptyInputFileError();
    }

    const [maxXStr, maxYStr] = lines[0].split(" ");
    if (!maxXStr || !maxYStr) {
        throw new InvalidLawnDimensionError("Invalid lawn dimensions in the first line");
    }
    const maxX = Number(maxXStr);
    const maxY = Number(maxYStr);

    if (Number.isNaN(maxX) || Number.isNaN(maxY)) {
        throw new LawnDimensionsNotNumbersError();
    }

    const mowers: MowerInput[] = [];

    for (let i = 1; i < lines.length; i += 2) {
        const posLine = lines[i];
        const cmdLine = lines[i + 1];
        if (!posLine) {
            throw new IncompleteMowerDefinitionError(i + 1);
        }

        if (!cmdLine) {
            throw new IncompleteMowerDefinitionError(i + 2);
        }

        const [xStr, yStr, orientStr] = posLine.split(" ");
        if (!xStr || !yStr || !orientStr) {
            throw new InvalidMowerCoordinatesError(i + 1);
        }

        const x = Number(xStr);
        const y = Number(yStr);
        const orientation = orientStr as Orientation;

        if (Number.isNaN(x) || Number.isNaN(y)) {
            throw new InvalidMowerCoordinatesError(i + 1);
        }

        mowers.push({
            position: new Position(x, y),
            orientation,
            commands: cmdLine,
        });
    }

    return { lawnMax: new Position(maxX, maxY), mowers };
}
