import Board from './Board';
import { RootState } from '../store';
import { MatchStatus } from '../enums';
import { useSelector } from 'react-redux';
import { Player, PlayerWithNone } from '../types';

interface HistoryListItemProps {
  selectedSpots: Array<Player>;
  winner: PlayerWithNone;
  matchStatus: MatchStatus;
}

function HistoryListItem({
  selectedSpots,
  winner,
  matchStatus,
}: HistoryListItemProps) {
  return (
    <li>
      <Board selectedSpots={selectedSpots} readOnly />
      <div className="flex flex-row gap-1 mt-4 justify-evenly">
        <div className="flex flex-row gap-2 select-none">
          <p className="m-0 font-bold">Match Status: </p>
          <p className="m-0">{matchStatus.toString()}</p>
        </div>
        <div className="flex flex-row gap-2 select-none">
          <p className="m-0 font-bold">Winner: </p>
          <p className="m-0">{winner.toString()}</p>
        </div>
      </div>
    </li>
  );
}

export default function HistoryPanel() {
  const history = useSelector((state: RootState) => state.history);

  return (
    <>
      {history.visible && (
        <div className="mt-8 flex flex-col gap-4 justify-center items-center">
          <h2 className="text-2xl font-bold select-none">History</h2>
          {history.previous.length < 1 && <span>No Matches</span>}
          {history.previous.length > 0 && (
            <ul className="m-0 p-0 flex flex-col gap-6">
              {history.previous.map((match, index) => (
                <HistoryListItem
                  key={index}
                  selectedSpots={match.moves[match.moves.length - 1]}
                  winner={match.winner}
                  matchStatus={match.matchStatus}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
