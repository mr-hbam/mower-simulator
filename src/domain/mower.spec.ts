import {Lawn} from "./lawn";
import {Position} from "./position";
import {Mower, Orientation} from "./mower";
import {AlreadyOccupiedPositionLawnError, PositionOutsideLawnError} from "./lawn.errors";

describe("Mower initialization", () => {
    it("should correctly set mower fields", () => {
        // Given
        const mowerKey = "Mower-1";
        const mowerPosition = new Position(0, 0);
        const mowerOrientation: Orientation = Orientation.EAST;
        const lawn = new Lawn(new Position(5, 5));

        // When
        const mower = new Mower(mowerKey, mowerPosition, mowerOrientation, lawn, "FLL");

        // Expect
        expect(mower.key).toBe(mowerKey);
        expect(mower.position).toBe(mowerPosition);
        expect(mower.orientation).toBe(mowerOrientation);
        expect(mower.commands).toBe("FLL");
        expect(lawn.isOccupied(mowerPosition)).toBeTruthy();
    });

    it("should throw PositionOutsideLawnError for negative Position", () => {
        // Given
        const mowerKey = "Mower-1";
        const mowerOrientation: Orientation = Orientation.EAST;
        const lawn = new Lawn(new Position(5, 5));

        // When & Then
        expect(() => new Mower(mowerKey, new Position(-1, 0), mowerOrientation, lawn)).toThrow(PositionOutsideLawnError);
        expect(() => new Mower(mowerKey, new Position(0, -1), mowerOrientation, lawn)).toThrow(PositionOutsideLawnError);
    });

    it("should throw AlreadyOccupiedPositionLawnError for negative Position", () => {
        // Given
        const mowerPosition: Position = new Position(0, 0);
        const mowerOrientation: Orientation = Orientation.EAST;
        const lawn = new Lawn(new Position(5, 5));

        // When
        new Mower("Mower-1", mowerPosition, mowerOrientation, lawn);

        // Expect
        expect(() => new Mower("Mower-2", mowerPosition, mowerOrientation, lawn)).toThrow(AlreadyOccupiedPositionLawnError);
    });

});

describe("Mower orientation management", () => {
    it("should go from North to East", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(0, 0), Orientation.NORTH, lawn);

        // When
        mower.turnRight();

        // Expect
        expect(mower.orientation).toBe(Orientation.EAST);
    });

    it("should go from East to South", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(0, 0), Orientation.EAST, lawn);

        // When
        mower.turnRight();

        // Expect
        expect(mower.orientation).toBe(Orientation.SOUTH);
    });

    it("should go from South to West", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(0, 0), Orientation.SOUTH, lawn);

        // When
        mower.turnRight();

        // Expect
        expect(mower.orientation).toBe(Orientation.WEST);
    });

    it("should go from West to North", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(0, 0), Orientation.WEST, lawn);

        // When
        mower.turnRight();

        // Expect
        expect(mower.orientation).toBe(Orientation.NORTH);
    });

    it("should go from North to West", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(0, 0), Orientation.NORTH, lawn);

        // When
        mower.turnLeft();

        // Expect
        expect(mower.orientation).toBe(Orientation.WEST);
    });

    it("should go from West to South", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(0, 0), Orientation.WEST, lawn);

        // When
        mower.turnLeft();

        // Expect
        expect(mower.orientation).toBe(Orientation.SOUTH);
    });

    it("should go from South to East", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(0, 0), Orientation.SOUTH, lawn);

        // When
        mower.turnLeft();

        // Expect
        expect(mower.orientation).toBe(Orientation.EAST);
    });

    it("should go from East to North", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(0, 0), Orientation.EAST, lawn);

        // When
        mower.turnLeft();

        // Expect
        expect(mower.orientation).toBe(Orientation.NORTH);
    });
});

describe("Mower movement management", () => {
    it("should move in +X axis", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(4, 4), Orientation.EAST, lawn);

        // When
        mower.moveForward();

        // Expect
        expect(mower.position.x).toBe(5);
        expect(mower.position.y).toBe(4);
        expect(lawn.isOccupied(new Position(4, 4))).toBeFalsy();
        expect(lawn.isOccupied(new Position(5, 4))).toBeTruthy();
    });

    it("should move in +Y axis", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(4, 4), Orientation.NORTH, lawn);

        // When
        mower.moveForward();

        // Expect
        expect(mower.position.x).toBe(4);
        expect(mower.position.y).toBe(5);
        expect(lawn.isOccupied(new Position(4, 4))).toBeFalsy();
        expect(lawn.isOccupied(new Position(4, 5))).toBeTruthy();

    });

    it("should move in -X axis", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(4, 4), Orientation.SOUTH, lawn);

        // When
        mower.moveForward();

        // Expect
        expect(mower.position.x).toBe(4);
        expect(mower.position.y).toBe(3);
        expect(lawn.isOccupied(new Position(4, 4))).toBeFalsy();
        expect(lawn.isOccupied(new Position(4, 3))).toBeTruthy();
    });

    it("should move in -Y axis", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(4, 4), Orientation.WEST, lawn);

        // When
        mower.moveForward();

        // Expect
        expect(mower.position.x).toBe(3);
        expect(mower.position.y).toBe(4);
        expect(lawn.isOccupied(new Position(4, 4))).toBeFalsy();
        expect(lawn.isOccupied(new Position(3, 4))).toBeTruthy();

    });


    it("should stay in current position when moving outside", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(5, 5), Orientation.NORTH, lawn);

        // When
        mower.moveForward();

        // Given & Then
        expect(mower.position.x).toBe(5);
        expect(mower.position.y).toBe(5);
        expect(lawn.isOccupied(new Position(5, 5))).toBeTruthy();
    });

    it("should stay in current position when position is already occupied", () => {
        // Given
        const lawn = new Lawn(new Position(5, 5));
        const mower = new Mower("Mower-1", new Position(4, 4), Orientation.NORTH, lawn);

        // When
        lawn.occupy(new Position(4, 5));
        mower.moveForward();

        // Given & Then
        expect(mower.position.x).toBe(4);
        expect(mower.position.y).toBe(4);
        expect(lawn.isOccupied(new Position(4, 5))).toBeTruthy();
    });
});


