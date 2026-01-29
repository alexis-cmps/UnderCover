export type Role = "CIVIL" | "UNDERCOVER" | "WHITE";

export type Phase =
  | "HOME"
  | "PLAYERS"
  | "REVEAL"
  | "VOTE"
  | "REVEAL_ELIM"
  | "WHITE_GUESS"
  | "END";

export type Player = {
  id: string;
  name: string;
  alive: boolean;
  role: Role;
};

export type Settings = {
  undercoverCount: number;
  whiteCount: number;
};

export type Words = {
  civilian: string;
  undercover: string;
};
