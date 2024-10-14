import { MatchStatus } from '../enums';
import { createSlice } from '@reduxjs/toolkit';
import { BoardAction, BoardState, WinningSets } from '../types';

const WINNING_SETS: WinningSets = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const DEFAULT_AVAILABLE_SPOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const INITIAL_BOARD_STATE: BoardState = {
  selectedSpots: Array(9),
  availableSpots: DEFAULT_AVAILABLE_SPOTS,
  winningSets: WINNING_SETS,
  lastWinner: undefined,
  matchStatus: MatchStatus.None,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: INITIAL_BOARD_STATE,
  reducers: {
    setupBoard(state: BoardState) {
      state.matchStatus = MatchStatus.None;
      state.availableSpots = DEFAULT_AVAILABLE_SPOTS;
      state.selectedSpots = Array(9);
    },
    makeMove(state: BoardState, action: BoardAction) {
      const { selectedSpot, player } = action.payload;

      const selectedSpots = [...state.selectedSpots];
      selectedSpots[selectedSpot] = player;

      const availableSpots = state.availableSpots.filter(
        (spot) => spot !== selectedSpot
      );

      state.selectedSpots = selectedSpots;
      state.availableSpots = availableSpots;
    },
    checkMatch(state: BoardState) {
      for (const winningSet of state.winningSets) {
        const [a1, a2, a3] = winningSet;

        if (
          state.selectedSpots[a1] &&
          state.selectedSpots[a2] === state.selectedSpots[a1] &&
          state.selectedSpots[a3] === state.selectedSpots[a2]
        ) {
          state.matchStatus = MatchStatus.PlayerVictory;
          state.lastWinner = state.selectedSpots[a1];
          return;
        }
      }

      if (state.availableSpots.length === 0) {
        state.matchStatus = MatchStatus.Draw;
      }
    },
  },
});

export const { setupBoard, makeMove, checkMatch } = boardSlice.actions;

export default boardSlice.reducer;
