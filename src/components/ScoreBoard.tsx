import { cn } from '../lib/utils';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { HtmlHTMLAttributes } from 'react';

interface CellProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Cell({ children, className }: CellProps) {
  return (
    <div
      className={cn(
        'border border-slate-200 w-full h-15 text-xl',
        'text-center p-1 content-center select-none',
        className
      )}
    >
      {children}
    </div>
  );
}

export default function ScoreBoard() {
  const game = useSelector((state: RootState) => state.game);

  return (
    <div className="grid grid-cols-3 w-96">
      <Cell className="font-bold bg-slate-100">Player</Cell>
      <Cell className="font-bold bg-slate-100">{game.players[0]}</Cell>
      <Cell className="font-bold bg-slate-100">{game.players[1]}</Cell>
      <Cell className="bg-gray-200">Wins</Cell>
      <Cell>{game.scoreboard.wins.X}</Cell>
      <Cell>{game.scoreboard.wins.O}</Cell>
      <Cell className="bg-gray-200">Losses</Cell>
      <Cell>{game.scoreboard.losses.X}</Cell>
      <Cell>{game.scoreboard.losses.O}</Cell>
      <Cell className="bg-gray-200">Draws</Cell>
      <Cell className="col-span-2">{game.scoreboard.draws}</Cell>
    </div>
  );
}
