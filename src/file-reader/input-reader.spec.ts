import fs from "fs";
import path from "path";
import {Orientation} from "../domain/mower";
import {readInput} from "./input-reader";
import {Position} from "../domain/position";
import {
    EmptyInputFileError,
    IncompleteMowerDefinitionError, InvalidMowerCoordinatesError,
    LawnDimensionsNotNumbersError
} from "./input-reader.errors";
import {InvalidLawnDimensionError} from "../domain/lawn.errors";

const TEST_INPUT_FILE_NAME = "temp-input.txt";
const tempInputFile = path.resolve(__dirname, `../../input/${TEST_INPUT_FILE_NAME}`);

afterEach(() => {
    if (fs.existsSync(tempInputFile)) fs.unlinkSync(tempInputFile);
});

describe("readInput", () => {

    it("parses a valid file correctly", () => {

        // Given
        const fileContent = ["5 5", "1 2 N", "LFLFLFLFF", "3 3 E",  "FFRFFRFRRF"].join("\n");
        fs.writeFileSync(tempInputFile,fileContent);

        // When
        const { lawnMax, mowers } = readInput(TEST_INPUT_FILE_NAME);

        // Then
        expect(lawnMax).toEqual(new Position(5, 5));
        expect(mowers.length).toBe(2);

        const m1 = mowers[0]!;
        const m2 = mowers[1]!;

        expect(m1.position).toEqual(new Position(1, 2));
        expect(m1.orientation).toBe(Orientation.NORTH);
        expect(m1.commands).toBe("LFLFLFLFF");

        expect(m2.position).toEqual(new Position(3, 3));
        expect(m2.orientation).toBe(Orientation.EAST);
        expect(m2.commands).toBe("FFRFFRFRRF");
    });

    it("throws error for empty file", () => {
        // Given
        fs.writeFileSync(tempInputFile, "");

        // When & Then
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(EmptyInputFileError);
    });

    it("throws error if lawn dimensions are missing", () => {
        // Given
        const fileContent = ["5", "1 2 N", "LFLFLFLFF"].join("\n");
        fs.writeFileSync(tempInputFile, fileContent);

        // When & Then
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            InvalidLawnDimensionError
        );
    });

    it("throws error if lawn dimensions are not numbers", () => {
        // Given
        const fileContent = ["A B", "1 2 N", "LFLFLFLFF"].join("\n");
        fs.writeFileSync(tempInputFile, fileContent);

        // When & Then
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            LawnDimensionsNotNumbersError
        );
    });

   it("throws IncompleteMowerDefinitionError if mower definition is missing command line", () => {
        // Given
        const fileContent = ["5 5", "1 2 N"].join("\n");
        fs.writeFileSync(tempInputFile, fileContent);

        // When & Then
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(IncompleteMowerDefinitionError);
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            "Incomplete mower definition at line 3"
        );
    });

    it("throws IncompleteMowerDefinitionError if mower position is empty", () => {
        // Given
        const fileContent = ["5 5", ""].join("\n");
        fs.writeFileSync(tempInputFile, fileContent);

        // When & Then
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(IncompleteMowerDefinitionError);
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            "Incomplete mower definition at line 2"
        );
    });

    it("throws InvalidMowerCoordinatesError if mower orientation are invalid", () => {
        // Given
        const fileContent = ["5 5", "1 2", "LFLFLFLFF"].join("\n");
        fs.writeFileSync(tempInputFile, fileContent);

        // When & Then
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(InvalidMowerCoordinatesError);
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            "Invalid mower coordinates or orientation at line 2"
        );
    });

    it("throws error if mower coordinates is missing", () => {
        // Given
        const fileContent = ["5 5", "N", "LFLFLFLFF"].join("\n");
        fs.writeFileSync(tempInputFile,fileContent);

        // When & Then
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            InvalidMowerCoordinatesError
        );
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            "Invalid mower coordinates or orientation at line 2"
        );
    });

    it("throws error when mower X coordinate is not a number", () => {
        const fileContent = ["5 5", "X 2 N", "LFLFLFLFF"].join("\n");
        fs.writeFileSync(tempInputFile, fileContent);

        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(InvalidMowerCoordinatesError);
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            "Invalid mower coordinates or orientation at line 2"
        );
    });

    it("throws error when mower Y coordinate is not a number", () => {
        const fileContent = ["5 5", "1 Y N", "LFLFLFLFF"].join("\n");
        fs.writeFileSync(tempInputFile, fileContent);

        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(InvalidMowerCoordinatesError);
        expect(() => readInput(TEST_INPUT_FILE_NAME)).toThrow(
            "Invalid mower coordinates or orientation at line 2"
        );
    });




});


/*
*



    it("throws error if mower definition is incomplete", () => {
        fs.writeFileSync(tempInputFile, `
5 5
1 2 N
`);
        expect(() => readInput("temp-input.txt")).toThrow(
            "Incomplete mower definition at lines 2 and 3"
        );
    });

    it("throws error if mower coordinates are invalid", () => {
        fs.writeFileSync(tempInputFile, `
5 5
X Y N
LFLFLFLFF
`);
        expect(() => readInput("temp-input.txt")).toThrow(
            "Mower coordinates must be numbers at line 2"
        );
    });


*
* */