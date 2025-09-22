export class EmptyInputFileError extends Error {
    constructor(message: string = "Input file is empty") {
        super(message);
        this.name = "EmptyInputFileError";
    }
}

export class LawnDimensionsNotNumbersError extends Error {
    constructor(message: string = "Lawn dimensions must be numbers") {
        super(message);
        this.name = "LawnDimensionsNotNumbersError";
    }
}

export class IncompleteMowerDefinitionError extends Error {
    constructor(lineNumber: number) {
        super(`Incomplete mower definition at line ${lineNumber}`);
        this.name = "IncompleteMowerDefinitionError";
    }
}

export class InvalidMowerCoordinatesError extends Error {
    constructor(lineNumber: number) {
        super(`Invalid mower coordinates or orientation at line ${lineNumber}`);
        this.name = "InvalidMowerCoordinatesError";
    }
}