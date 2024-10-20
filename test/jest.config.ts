import type { Config } from 'jest';

const config: Config = {
    rootDir: "../",
    silent: true,
    testEnvironment: "jsdom",
    setupFiles: ["./test/setup_jest.js"],
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|ttf)(\\?.*)?$": "<rootDir>/test/mocks/imagemock.js",
        "\\.(css|less)$": "<rootDir>/test/mocks/imagemock.js",
        "\\.(schema)$": "<rootDir>/test/mocks/imagemock.js",
        "\\.svg(\\?.*)?$": "<rootDir>/test/mocks/svgmock.js",
    },
    transform: {
        ".(ts|tsx)$": ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }]
    },
    moduleFileExtensions: ["ts", "tsx", "js", "json"],

    // code coverage
    collectCoverage: false,
    collectCoverageFrom: ["./src/**"],
    coverageReporters: ['html'],
    coverageDirectory: './dist/coverage'

};

export default config;