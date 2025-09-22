# Welcome to mower-simulator 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> This project simulates autonomous mowers operating on a rectangular lawn. Each mower has a position, orientation, and a set of movement commands. The simulator executes the commands concurrently using Node.js worker threads and calculates the final positions and orientations of all mowers.

## Features
- Supports multiple mowers on a shared lawn.
- Executes commands: move forward (`F`), turn left (`L`), turn right (`R`).
- Concurrency handled via Node.js Worker Threads.
- Stores and outputs the final positions and orientations of all mowers.
- Graceful error handling for mower or worker failures.
- Fully testable with Jest (mocked workers for unit tests).

## Input
The simulator reads mower instructions from a **text file** (`.txt`).

- Place the input file **`input.txt`** in the **`./input/` folder** at the root of the project (create it if it doesn’t exist).
- **First line:** Lawn max coordinates (`X Y`)
- **Next lines:** For each mower, two lines:
    1. Initial position and orientation (`X Y N|E|S|W`)
    2. Movement commands (`L`, `R`, `F`)
  
## Install

```sh
yarn install
```

## Usage

```sh
yarn dev
```

## Run tests

```sh
yarn test
```

## Author

👤 **Hicham BELGHITI ALAOUI**

* LinkedIn: [@hicham-belghiti-alaoui](https://linkedin.com/in/hicham-belghiti-alaoui)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
