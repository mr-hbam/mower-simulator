import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    moduleFileExtensions: ["ts", "js", "json"],
};

export default config;