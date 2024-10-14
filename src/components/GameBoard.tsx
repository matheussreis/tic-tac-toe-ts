import Board from './Board';
import Button from './ui/Button';
import { RootState } from '../store';
import { resetGame } from '../store/game';
import { makeMove, setupBoard } from '../store/board';
import { useDispatch, useSelector } from 'react-redux';
import { resetHistory, setHistoryVisibility } from '../store/history';

export default function GameBoard() {
  const board = useSelector((state: RootState) => state.board);
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const selectSpotHandler = (selectedSpot: number) => {
    if (!board.selectedSpots[selectedSpot]) {
      return () => {
        const payload = {
          selectedSpot: selectedSpot,
          player: game.currentPlayer,
        };
        dispatch(makeMove(payload));
      };
    }
  };

  const resetGameHandler = () => {
    dispatch(setupBoard());
    dispatch(resetGame());
    dispatch(resetHistory());
  };

  const historyVisibilityHandler = () => {
    dispatch(setHistoryVisibility());
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Board
        onCellClick={selectSpotHandler}
        selectedSpots={board.selectedSpots}
      />
      <div className="flex gap-1 w-full">
        <Button onClick={resetGameHandler}>Reset</Button>
        <Button onClick={historyVisibilityHandler}>History</Button>
      </div>
    </div>
  );
}
