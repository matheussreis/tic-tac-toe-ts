import { MatchStatus, PlayerSymbol } from '../enums';

export type GameMove = Array<Player>;

export type GameMoves = GameMove[];

export type Players =
  | [PlayerSymbol.O, PlayerSymbol.X]
  | [PlayerSymbol.X, PlayerSymbol.O];

export type Player = PlayerSymbol.O | PlayerSymbol.X;

export type PlayerWithNone =
  | PlayerSymbol.O
  | PlayerSymbol.X
  | PlayerSymbol.None;

export type ScoreBoard = {
  wins: Record<Exclude<PlayerSymbol, PlayerSymbol.None>, number>;
  losses: Record<Exclude<PlayerSymbol, PlayerSymbol.None>, number>;
  draws: number;
};

export type GameState = {
  players: Players;
  scoreboard: ScoreBoard;
  currentPlayer: Player;
  currentPlayerIndex: number;
};

export type GameAction = {
  payload: Player;
};

export type WinningSets = Array<[number, number, number]>;

export type BoardState = {
  selectedSpots: GameMove;
  availableSpots: Array<number>;
  winningSets: WinningSets;
  lastWinner?: Player;
  matchStatus: MatchStatus;
};

export type BoardAction = {
  payload: {
    selectedSpot: number;
    player: Player;
  };
};

export type HistoryStateItem = {
  matchStatus: MatchStatus;
  winner: PlayerWithNone;
  moves: GameMoves;
};

export type HistoryState = {
  previous: Array<HistoryStateItem>;
  current: HistoryStateItem;
  visible: boolean;
};

export type AddMoveToHistoryAction = {
  payload: {
    move: GameMove;
  };
};

export type AddMatchToHistoryAction = {
  payload: {
    winner?: Player;
    matchStatus: MatchStatus;
  };
};
