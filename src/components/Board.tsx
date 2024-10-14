import { Player } from '../types';
import { HtmlHTMLAttributes } from 'react';
import { cn, getPlayerColor } from '../lib/utils';

interface CellProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Cell({ children, className, onClick }: CellProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'border border-slate-300 hover:border-opacity-60 rounded select-none',
        'w-full h-20 text-3xl font-bold text-center p-1 content-center',
        !children && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

interface BoardProps {
  selectedSpots: Array<string>;
  readOnly?: boolean;
  onCellClick?: (spot: number) => void;
}

const readOnlyClassNames = 'pointer-events-none opacity-70';

export default function Board({
  selectedSpots,
  readOnly = false,
  onCellClick,
}: BoardProps) {
  return (
    <div
      className={`grid grid-cols-3 gap-2 w-96 ${
        readOnly ? readOnlyClassNames : ''
      }`}
    >
      {Array.from({ length: 9 }).map((_, index) => {
        const player = selectedSpots[index] as Player;
        const colorClass = getPlayerColor(player);

        return (
          <Cell
            key={index}
            onClick={(onCellClick && onCellClick(index)) ?? undefined}
            className={colorClass}
          >
            {selectedSpots[index] ?? ''}
          </Cell>
        );
      })}
    </div>
  );
}
