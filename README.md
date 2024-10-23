# Simple Tic-Tac-Toe

This project is a simple implementation of the popular game Tic-Tac-Toe. The idea behind this project was to apply Redux in a React project using TypeScript. In this implementation, there's only a player-vs-player mode, where two users can play on the same computer.

## Features

- **Game Board:** The game board allows players to select a spot, which will be marked with a symbol (either X or O, depending on the current player).
- **Score Board:** The score board allows players to check their victories, losses, and ties.
- **Reset Game:** The reset button allows players to erase the current game scores and history.
- **Check History:** The history button allows players to check the game board state of all their previous matches, as well as the match status and winner.

## Implementation Details

The entire game logic is inside Redux slices, leaving the React components neat and clean. There are three slices in total, each dedicated to a different part of the app. The first one is the `game` slice, which controls the statistics of each match andmanages the current player. The second is the `board` slice, where all the game logic resides. This is where the system checks moves and determines the match status and winner. Lastly, there's the `history` slice, responsible for handling the history of each move and match played.

In addition to the slices, which return a group of reducers, there are two listener middlewares set up. These middlewares work like events and are only triggered when a specific reducer is called. The purpose of this setup was to simplify reducer calls in the React code, making it even cleaner, and to keep the logic centralized.

The first listener is triggered whenever a player makes a move (when the `makeMove` reducer is called). It switches the current player, adds the move to the history, and checks if the move ends the match. The second listener is triggered when the system checks the current match status (when the `checkMatch` reducer is called). It adds the statistics to the scoreboard, sets up a new board, and adds the current match to the history.

## Getting Started

To get this project started, you simply need to install the dependencies and start the development server. To do so, start by running the following command:

```bash
npm i
```

After that, run the following command to start the development server:

```bash
npm run dev
```

Once the server is running, open your browser and go to [http://localhost:3000](http://localhost:3000) to view the website.
