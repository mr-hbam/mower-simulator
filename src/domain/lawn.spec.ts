import {Lawn} from "./lawn";
import {Position} from "./position";
import {AlreadyOccupiedPositionLawnError, InvalidLawnDimensionError, PositionOutsideLawnError} from "./lawn.errors";


describe("Lawn initialization", () => {
    it("should correctly set width and height", () => {
        // Given
        const position: Position = new Position(5, 5);

        // When
        const lawn = new Lawn(position);

        // Expect
        expect(lawn.height).toBe(5);
        expect(lawn.width).toBe(5);
    });

    it("should throw InvalidLawnDimensionError for negative width", () => {
        // Given
        const position: Position = new Position(-1, 5);

        // When & Then
        expect(() => new Lawn(position)).toThrow(InvalidLawnDimensionError);
        expect(() => new Lawn(position)).toThrow(`Invalid lawn dimensions: x=${position.x}, y=${position.y}`);

    });

    it("should throw InvalidLawnDimensionError for negative height", () => {
        // Given
        const position: Position = new Position(5, -1);

        // When & Then
        expect(() => new Lawn(position)).toThrow(InvalidLawnDimensionError);
    });

    it("should throw if width is 0", () => {
        // Given
        const position: Position = new Position(0, 5);

        // When & Then
        expect(() => new Lawn(position)).toThrow(InvalidLawnDimensionError);
    });

    it("should throw if height is 0", () => {
        // Given
        const position: Position = new Position(5, 0);

        // When & Then
        expect(() => new Lawn(position)).toThrow(InvalidLawnDimensionError);
    });

    it("should throw if both width and height are 0", () => {
        // Given
        const position: Position = new Position(0, 0);

        // When & Then
        expect(() => new Lawn(position)).toThrow(InvalidLawnDimensionError);
    });
});

describe("Lawn check boundaries", () => {
    let lawn: Lawn;
    beforeEach(() => {
        // Given: a 5x5 lawn
        lawn = new Lawn(new Position(5, 5));
    });

    it("should return true for positions inside the lawn", () => {
        // Given
        const mowerPosition: Position = new Position(5, 5);

        // When & Then
        expect(lawn.isInside(mowerPosition)).toBeTruthy();
    });

    it("should return false for positions outside the lawn", () => {

        // When & Then
        expect(lawn.isInside(new Position(6, 2))).toBe(false);
        expect(lawn.isInside(new Position(3, 6))).toBe(false);
        expect(lawn.isInside(new Position(-1, 2))).toBe(false);
    });
});

describe("Lawn Occupancy management", () => {
    it("should mark a position as occupied", () => {
        // Given
        const lawn = new Lawn(new Position(10, 10));
        const nextMowerPosition: Position = new Position(5, 5);

        // When
        lawn.occupy(nextMowerPosition);

        // Then
        expect(lawn.isOccupied(nextMowerPosition)).toBeTruthy();
    });

    it("should throw if position out of lawn", () => {
        // Given
        const lawn = new Lawn(new Position(10, 10));
        const nextMowerPosition: Position = new Position(11, 5);

        // When & Then
        expect(() => lawn.occupy(nextMowerPosition)).toThrow(PositionOutsideLawnError);
    });

    it("should throw if position is already occupied", () => {
        // Given
        const lawn = new Lawn(new Position(10, 10));
        const nextMowerPosition: Position = new Position(5, 5);
        lawn.occupy(nextMowerPosition);

        // When & Then
        expect(() => lawn.occupy(nextMowerPosition)).toThrow(AlreadyOccupiedPositionLawnError);
    });

    it("should free an occupied position", () => {
        // Given
        const lawn = new Lawn(new Position(10, 10));
        const nextMowerPosition: Position = new Position(5, 5);

        // When
        lawn.occupy(nextMowerPosition);
        lawn.free(nextMowerPosition);

        // Then
        expect(lawn.isOccupied(nextMowerPosition)).toBeFalsy();
    });
});
