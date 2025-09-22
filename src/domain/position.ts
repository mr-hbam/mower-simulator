export class Position {
    _x: number;
    _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}