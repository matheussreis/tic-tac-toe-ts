import {
  HistoryState,
  HistoryStateItem,
  AddMatchToHistoryAction,
  AddMoveToHistoryAction,
} from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { MatchStatus, PlayerSymbol } from '../enums';

const INITIAL_HISTORY_STATE: HistoryState = {
  previous: [],
  current: {
    matchStatus: MatchStatus.None,
    winner: PlayerSymbol.None,
    moves: [],
  },
  visible: false,
};

const DEFAULT_CURRENT: HistoryStateItem = {
  matchStatus: MatchStatus.None,
  winner: PlayerSymbol.None,
  moves: [],
};

const gameSlice = createSlice({
  name: 'history',
  initialState: INITIAL_HISTORY_STATE,
  reducers: {
    addMatchToHistory(state: HistoryState, action: AddMatchToHistoryAction) {
      const { winner, matchStatus } = action.payload;
      state.previous = [
        {
          ...state.current,
          winner: winner ?? PlayerSymbol.None,
          matchStatus: matchStatus,
        },
        ...state.previous,
      ];

      state.current = DEFAULT_CURRENT;
    },
    addMoveToHistory(state: HistoryState, action: AddMoveToHistoryAction) {
      state.current.moves = [...state.current.moves, action.payload.move];
    },
    resetHistory(state: HistoryState) {
      state.previous = [];
      state.current = DEFAULT_CURRENT;
    },
    setHistoryVisibility(state: HistoryState) {
      state.visible = !state.visible;
    },
  },
});

export const {
  addMatchToHistory,
  addMoveToHistory,
  resetHistory,
  setHistoryVisibility,
} = gameSlice.actions;

export default gameSlice.reducer;
