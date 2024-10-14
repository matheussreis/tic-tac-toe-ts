import { Player } from '../types';
import { PlayerSymbol } from '../enums';
import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlayerColor(player: Player) {
  return player === PlayerSymbol.X ? 'text-red-500' : 'text-blue-500';
}
