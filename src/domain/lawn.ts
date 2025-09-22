import {Position} from "./position";
import {AlreadyOccupiedPositionLawnError, InvalidLawnDimensionError, PositionOutsideLawnError} from "./lawn.errors";

export class Lawn {
    width: number;
    height: number;
    occupied: Set<string>;

    constructor(rightCornerPosition: Position) {
        if(rightCornerPosition.x <=0 || rightCornerPosition.y <=0) {
            throw new InvalidLawnDimensionError(`Invalid lawn dimensions: x=${rightCornerPosition.x}, y=${rightCornerPosition.y}`);
        }
        this.width = rightCornerPosition.x;
        this.height = rightCornerPosition.y;
        this.occupied = new Set();
    }

    isInside(position: Position): boolean {
        const outOfBoundsX = position.x < 0 || position.x > this.width;
        const outOfBoundsY = position.y < 0 || position.y > this.height;

        return !outOfBoundsX && !outOfBoundsY;
    }

    isOccupied(position: Position): boolean {
        const positionKey = this.positionKey(position);
        return this.occupied.has(positionKey);
    }

    occupy(position: Position) {
        if(!this.isInside(position)) {
            throw new PositionOutsideLawnError(position);
        }

        if(this.isOccupied(position)) {
            throw new AlreadyOccupiedPositionLawnError(position);
        }
        const positionKey = this.positionKey(position);
        this.occupied.add(positionKey);
    }

    free(position: Position) {
        const positionKey = this.positionKey(position);
        this.occupied.delete(positionKey);
    }
    private positionKey(position: Position): string {
        return `{${position.x},${position.y}`;
    }
}