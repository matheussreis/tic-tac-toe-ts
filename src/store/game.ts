import { PlayerSymbol } from '../enums';
import { createSlice } from '@reduxjs/toolkit';
import { GameAction, GameState, ScoreBoard } from '../types';

const DEFAULT_SCOREBOARD: ScoreBoard = {
  wins: {
    X: 0,
    O: 0,
  },
  losses: {
    X: 0,
    O: 0,
  },
  draws: 0,
};

const INITIAL_GAME_STATE: GameState = {
  players: [PlayerSymbol.X, PlayerSymbol.O],
  scoreboard: DEFAULT_SCOREBOARD,
  currentPlayer: PlayerSymbol.X,
  currentPlayerIndex: 0,
};

const resetCurrentPlayer = (state: GameState) => {
  state.currentPlayer = state.players[0];
  state.currentPlayerIndex = 0;
};

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_GAME_STATE,
  reducers: {
    addWin(state: GameState, action: GameAction) {
      const player = action.payload;
      state.scoreboard.wins[player] += 1;
      resetCurrentPlayer(state);
    },
    addLoss(state: GameState, action: GameAction) {
      const player = action.payload;
      state.scoreboard.losses[player] += 1;
      resetCurrentPlayer(state);
    },
    addDraw(state: GameState) {
      state.scoreboard.draws += 1;
      resetCurrentPlayer(state);
    },
    resetGame(state: GameState) {
      state.scoreboard = DEFAULT_SCOREBOARD;
      state.currentPlayer = state.players[0];
      state.currentPlayerIndex = 0;
    },
    switchPlayers(state: GameState) {
      const nextPlayerIndex = state.currentPlayerIndex === 0 ? 1 : 0;
      state.currentPlayer = state.players[nextPlayerIndex];
      state.currentPlayerIndex = nextPlayerIndex;
    },
  },
});

export const { addWin, addLoss, addDraw, resetGame, switchPlayers } =
  gameSlice.actions;

export default gameSlice.reducer;
