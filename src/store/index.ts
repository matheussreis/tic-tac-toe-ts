import { BoardState, PlayerWithNone } from '../types';
import { MatchStatus, PlayerSymbol } from '../enums';
import board, { checkMatch, makeMove, setupBoard } from './board';
import game, { addDraw, addLoss, addWin, switchPlayers } from './game';
import history, { addMatchToHistory, addMoveToHistory } from './history';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

const getLoser = (player: PlayerWithNone) => {
  return player === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
};

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: makeMove,
  effect: (_, listenerApi) => {
    const { board } = listenerApi.getState() as { board: BoardState };
    listenerApi.dispatch(switchPlayers());
    listenerApi.dispatch(addMoveToHistory({ move: board.selectedSpots }));
    listenerApi.dispatch(checkMatch());
  },
});

listenerMiddleware.startListening({
  actionCreator: checkMatch,
  effect: (_, listenerApi) => {
    const { board } = listenerApi.getState() as { board: BoardState };

    if (board.matchStatus === MatchStatus.PlayerVictory && board.lastWinner) {
      const loser = getLoser(board.lastWinner);
      listenerApi.dispatch(addWin(board.lastWinner));
      listenerApi.dispatch(addLoss(loser));
      listenerApi.dispatch(setupBoard());
      listenerApi.dispatch(
        addMatchToHistory({
          winner: board.lastWinner,
          matchStatus: board.matchStatus,
        })
      );
    } else if (board.matchStatus === MatchStatus.Draw) {
      listenerApi.dispatch(addDraw());
      listenerApi.dispatch(setupBoard());
      listenerApi.dispatch(
        addMatchToHistory({
          matchStatus: board.matchStatus,
        })
      );
    }
  },
});

export const store = configureStore({
  reducer: {
    board: board,
    game: game,
    history: history,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;
