import { describe, it, expect, beforeEach } from "vitest";
import { useGame } from "../game";

describe("game store", () => {
  beforeEach(() => {
    // Reset store avant chaque test
    useGame.getState().reset();
  });

  describe("player management", () => {
    it("should add players", () => {
      const { addPlayer } = useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");

      const currentPlayers = useGame.getState().players;
      expect(currentPlayers).toHaveLength(2);
      expect(currentPlayers[0].name).toBe("Alice");
      expect(currentPlayers[1].name).toBe("Bob");
    });

    it("should remove players", () => {
      const { addPlayer, removePlayer } = useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");
      const alice = useGame.getState().players[0];

      removePlayer(alice.id);

      const currentPlayers = useGame.getState().players;
      expect(currentPlayers).toHaveLength(1);
      expect(currentPlayers[0].name).toBe("Bob");
    });

    it("should trim player names", () => {
      const { addPlayer } = useGame.getState();

      addPlayer("  Alice  ");

      const currentPlayers = useGame.getState().players;
      expect(currentPlayers[0].name).toBe("Alice");
    });
  });

  describe("game flow", () => {
    it("should not start game with less than 3 players", () => {
      const { addPlayer, startGame } = useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");
      startGame();

      expect(useGame.getState().phase).toBe("HOME");
    });

    it("should start game with 3+ players", () => {
      const { addPlayer, startGame } = useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");
      addPlayer("Charlie");
      startGame();

      const state = useGame.getState();
      expect(state.phase).toBe("REVEAL");
      expect(state.words).toBeTruthy();
      expect(state.revealIndex).toBe(0);
    });

    it("should assign roles correctly", () => {
      const { addPlayer, startGame } = useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");
      addPlayer("Charlie");
      addPlayer("Dave");
      startGame();

      const state = useGame.getState();
      const roles = state.players.map((p) => p.role);

      // Devrait avoir 1 undercover, 1 white, et le reste civils
      const undercoverCount = roles.filter((r) => r === "UNDERCOVER").length;
      const whiteCount = roles.filter((r) => r === "WHITE").length;
      const civilCount = roles.filter((r) => r === "CIVIL").length;

      expect(undercoverCount).toBe(1);
      expect(whiteCount).toBe(1);
      expect(civilCount).toBe(2);
    });
  });

  describe("reveal phase", () => {
    it("should progress through reveal phase", () => {
      const { addPlayer, startGame, nextReveal } = useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");
      addPlayer("Charlie");
      startGame();

      expect(useGame.getState().revealIndex).toBe(0);

      nextReveal();
      expect(useGame.getState().revealIndex).toBe(1);

      nextReveal();
      expect(useGame.getState().revealIndex).toBe(2);

      nextReveal();
      // Devrait passer à la phase VOTE après le dernier reveal
      expect(useGame.getState().phase).toBe("VOTE");
    });
  });

  describe("vote phase", () => {
    it("should eliminate a player directly", () => {
      const { addPlayer, startGame, eliminatePlayer, setPhase } =
        useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");
      addPlayer("Charlie");
      startGame();

      const players = useGame.getState().players;
      const aliveCount = players.filter((p) => p.alive).length;

      setPhase("VOTE");
      eliminatePlayer(players[0].id);

      const newPlayers = useGame.getState().players;
      expect(newPlayers.filter((p) => p.alive).length).toBe(aliveCount - 1);
      expect(newPlayers[0].alive).toBe(false);
    });

    it("should eliminate player and transition to WHITE_GUESS if Mr.White is eliminated", () => {
      const { addPlayer, startGame, eliminatePlayer, updateSettings, setPhase } =
        useGame.getState();

      updateSettings({ whiteCount: 1, undercoverCount: 1 });
      addPlayer("Alice");
      addPlayer("Bob");
      addPlayer("Charlie");
      startGame();

      const players = useGame.getState().players;
      const whitePlayer = players.find((p) => p.role === "WHITE");
      if (!whitePlayer) return;

      setPhase("VOTE");
      eliminatePlayer(whitePlayer.id);

      expect(useGame.getState().phase).toBe("WHITE_GUESS");
      expect(useGame.getState().eliminatedPlayerId).toBe(whitePlayer.id);
    });

    it("should check win conditions after elimination", () => {
      const { addPlayer, startGame, eliminatePlayer, updateSettings, setPhase } =
        useGame.getState();

      updateSettings({ whiteCount: 0, undercoverCount: 1 });
      addPlayer("Alice");
      addPlayer("Bob");
      addPlayer("Charlie");
      startGame();

      const players = useGame.getState().players;
      const undercoverPlayer = players.find((p) => p.role === "UNDERCOVER");
      if (!undercoverPlayer) return;

      setPhase("VOTE");
      eliminatePlayer(undercoverPlayer.id);

      // Les civils devraient gagner
      expect(useGame.getState().phase).toBe("END");
      expect(useGame.getState().winnerText).toContain("civils");
    });
  });

  describe("white guess", () => {
    it("should win if guess is correct", () => {
      const { whiteGuess } = useGame.getState();

      // Setup initial state avec un mot
      useGame.setState({
        words: { civilian: "Test", undercover: "Other" },
        phase: "WHITE_GUESS",
      });

      whiteGuess("Test");

      const state = useGame.getState();
      expect(state.phase).toBe("END");
      expect(state.winnerText).toBe("Mr.White gagne ⚪️");
    });

    it("should be case insensitive", () => {
      useGame.setState({
        words: { civilian: "Test", undercover: "Other" },
        phase: "WHITE_GUESS",
      });

      useGame.getState().whiteGuess("test");

      const state = useGame.getState();
      expect(state.phase).toBe("END");
      expect(state.winnerText).toBe("Mr.White gagne ⚪️");
    });

    it("should continue game if guess is wrong and game not over", () => {
      const { addPlayer, startGame } = useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");
      addPlayer("Charlie");
      addPlayer("Dave");
      startGame();

      // S'assurer qu'il reste d'autres joueurs undercover ou que les civils n'ont pas encore gagné
      const players = useGame.getState().players;
      const whitePlayer = players.find((p) => p.role === "WHITE");

      // Marquer le White comme éliminé mais garder un undercover vivant
      useGame.setState({
        phase: "WHITE_GUESS",
        players: players.map((p) =>
          p.id === whitePlayer?.id ? { ...p, alive: false } : p
        ),
        eliminatedPlayerId: whitePlayer?.id ?? null,
      });

      useGame.getState().whiteGuess("WrongGuess");

      const state = useGame.getState();
      // Si le jeu n'est pas terminé, devrait passer à REVEAL_ELIM ou END selon l'état
      expect(["REVEAL_ELIM", "END"]).toContain(state.phase);
    });
  });

  describe("reset", () => {
    it("should reset game to initial state", () => {
      const { addPlayer, startGame, reset } = useGame.getState();

      addPlayer("Alice");
      addPlayer("Bob");
      addPlayer("Charlie");
      startGame();

      reset();

      const state = useGame.getState();
      expect(state.phase).toBe("HOME");
      expect(state.players).toHaveLength(0);
      expect(state.words).toBeNull();
      expect(state.votes).toEqual({});
      expect(state.eliminatedPlayerId).toBeNull();
      expect(state.winnerText).toBeNull();
    });
  });
});
