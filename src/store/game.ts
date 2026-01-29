import { create } from "zustand";
import type { Role, Phase, Player, Settings, Words } from "../types";
import { uid, shuffle } from "../lib/utils";
import { pickWords } from "../lib/words";
import { computeWinners } from "../lib/game-logic";

type GameState = {
  phase: Phase;
  players: Player[];
  settings: Settings;
  words: Words | null;

  revealIndex: number; // index du joueur à qui on passe le tel
  votes: Record<string, string>; // voterId -> targetId

  eliminatedPlayerId: string | null;
  winnerText: string | null;

  // actions
  reset: () => void;
  restartWithSamePlayers: () => void;
  setPhase: (p: Phase) => void;

  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  startGame: () => void;

  nextReveal: () => void;

  eliminatePlayer: (playerId: string) => void;

  whiteGuess: (guess: string) => void;
};

export const useGame = create<GameState>((set, get) => ({
  phase: "HOME",
  players: [],
  settings: { undercoverCount: 1, whiteCount: 1 },
  words: null,

  revealIndex: 0,
  votes: {},

  eliminatedPlayerId: null,
  winnerText: null,

  reset: () =>
    set({
      phase: "HOME",
      players: [],
      words: null,
      revealIndex: 0,
      votes: {},
      eliminatedPlayerId: null,
      winnerText: null,
    }),

  restartWithSamePlayers: () => {
    const { players, settings } = get();
    if (players.length < 3) return;

    const roles: Role[] = [];
    for (let i = 0; i < settings.undercoverCount; i++) roles.push("UNDERCOVER");
    for (let i = 0; i < settings.whiteCount; i++) roles.push("WHITE");
    while (roles.length < players.length) roles.push("CIVIL");

    const shuffledRoles = shuffle(roles);
    const w = pickWords();

    set({
      players: players.map((p, i) => ({
        ...p,
        alive: true,
        role: shuffledRoles[i],
      })),
      words: w,
      phase: "REVEAL",
      revealIndex: 0,
      votes: {},
      eliminatedPlayerId: null,
      winnerText: null,
    });
  },

  setPhase: (p) => set({ phase: p }),

  addPlayer: (name) =>
    set((s) => ({
      players: [
        ...s.players,
        { id: uid(), name: name.trim(), alive: true, role: "CIVIL" },
      ],
    })),

  removePlayer: (id) =>
    set((s) => ({ players: s.players.filter((p) => p.id !== id) })),

  updateSettings: (settings) =>
    set((s) => ({ settings: { ...s.settings, ...settings } })),

  startGame: () => {
    const { players, settings } = get();
    if (players.length < 3) return;

    const roles: Role[] = [];
    for (let i = 0; i < settings.undercoverCount; i++) roles.push("UNDERCOVER");
    for (let i = 0; i < settings.whiteCount; i++) roles.push("WHITE");
    while (roles.length < players.length) roles.push("CIVIL");

    const shuffledRoles = shuffle(roles);
    const w = pickWords();

    set({
      players: players.map((p, i) => ({
        ...p,
        alive: true,
        role: shuffledRoles[i],
      })),
      words: w,
      phase: "REVEAL",
      revealIndex: 0,
      votes: {},
      eliminatedPlayerId: null,
      winnerText: null,
    });
  },

  nextReveal: () => {
    const { revealIndex, players } = get();
    const next = revealIndex + 1;
    if (next >= players.length) {
      set({ phase: "VOTE", votes: {} });
    } else {
      set({ revealIndex: next });
    }
  },

  eliminatePlayer: (playerId: string) => {
    const { players } = get();

    // Marquer le joueur éliminé
    const updated = players.map((p) =>
      p.id === playerId ? { ...p, alive: false } : p
    );
    const elimPlayer = updated.find((p) => p.id === playerId) ?? null;

    // Si Mr.White est éliminé -> phase guess
    if (elimPlayer?.role === "WHITE") {
      set({
        players: updated,
        eliminatedPlayerId: playerId,
        phase: "WHITE_GUESS",
      });
      return;
    }

    // Vérifier les conditions de victoire
    const winner = computeWinners(updated);
    set({
      players: updated,
      eliminatedPlayerId: playerId,
      phase: winner ? "END" : "REVEAL_ELIM",
      winnerText: winner,
    });
  },

  whiteGuess: (guess) => {
    const { words, players } = get();
    if (!words) return;

    const normalized = guess.trim().toLowerCase();
    const target = words.civilian.trim().toLowerCase();

    if (normalized === target) {
      set({ phase: "END", winnerText: "Mr.White gagne ⚪️" });
      return;
    }

    // mauvais guess : Mr.White est out, la partie continue
    const winner = computeWinners(players);
    set({
      phase: winner ? "END" : "REVEAL_ELIM",
      winnerText: winner,
    });
  },
}));
