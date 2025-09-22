import {Position} from "./position";

export class AlreadyOccupiedPositionLawnError extends Error {
    constructor(position: Position) {
        super(`Position (${position.x}, ${position.y}) is already occupied`);
        this.name = "AlreadyOccupiedPositionLawnError";
    }
}
export class InvalidLawnDimensionError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "InvalidLawnDimensionError";
    }
}

export class PositionOutsideLawnError extends Error {
    constructor(position: { x: number; y: number }) {
        super(`Position (${position.x}, ${position.y}) is outside the lawn`);
        this.name = "PositionOutsideLawnError";
    }
}