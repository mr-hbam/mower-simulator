import {Position} from "./position";
import {Lawn} from "./lawn";
import {AlreadyOccupiedPositionLawnError, PositionOutsideLawnError} from "./lawn.errors";


export class Mower {
    _key: string;
    _position: Position;
    _orientation: Orientation;
    private readonly _commands: string;

    constructor(key: string, position: Position, orientation: Orientation, private lawn: Lawn, commands?: string) {

        if(!this.lawn.isInside(position)) {
            throw new PositionOutsideLawnError(position)
        }

        if(this.lawn.isOccupied(position)) {
            throw new AlreadyOccupiedPositionLawnError(position)
        }

        this.lawn.occupy(position);

        this._key = key;
        this._position = position;
        this._orientation = orientation;
        this._commands = commands ?? "";
    }

    get key(): string {
        return this._key;
    }

    get position(): Position {
        return this._position;
    }

    get orientation(): Orientation {
        return this._orientation;
    }

    get commands(): string {
        return this._commands;
    }

    turnRight() {
        switch (this._orientation) {
            case Orientation.NORTH:
                this._orientation = Orientation.EAST;
                break;
            case Orientation.EAST:
                this._orientation = Orientation.SOUTH;
                break;
            case Orientation.SOUTH:
                this._orientation = Orientation.WEST;
                break;
            case Orientation.WEST:
                this._orientation = Orientation.NORTH;
                break;
        }
    }

    turnLeft() {
        switch (this._orientation) {
            case Orientation.NORTH:
                this._orientation = Orientation.WEST;
                break;
            case Orientation.WEST:
                this._orientation = Orientation.SOUTH;
                break;
            case Orientation.SOUTH:
                this._orientation = Orientation.EAST;
                break;
            case Orientation.EAST:
                this._orientation = Orientation.NORTH;
                break;
        }
    }

    moveForward() {
        const deltas: Record<Orientation, { dx: number; dy: number }> = {
            [Orientation.NORTH]: { dx: 0, dy: 1 },
            [Orientation.EAST]:  { dx: 1, dy: 0 },
            [Orientation.SOUTH]: { dx: 0, dy: -1 },
            [Orientation.WEST]:  { dx: -1, dy: 0 },
        };
        const delta = deltas[this._orientation];
        const nextPosition = new Position(this._position.x + delta.dx, this._position.y + delta.dy);

        if (!this.lawn.isInside(nextPosition) || this.lawn.isOccupied(nextPosition)) {
            return;
        }

        this.lawn.free(this._position);
        this._position = nextPosition;
        this.lawn.occupy(nextPosition);
    }
}

export enum Orientation {
    NORTH = 'N',
    EAST = 'E',
    WEST = 'W',
    SOUTH = 'S',
}

enum Command {
    LEFT = "L",
    RIGHT = "R",
    FORWARD = "F",
}
