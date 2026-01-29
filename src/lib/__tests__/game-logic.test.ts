import { describe, it, expect } from "vitest";
import { computeWinners, tallyVotes } from "../game-logic";
import type { Player } from "../../types";

describe("game-logic", () => {
  describe("computeWinners", () => {
    it("should return null when game continues", () => {
      const players: Player[] = [
        { id: "1", name: "Alice", alive: true, role: "CIVIL" },
        { id: "2", name: "Bob", alive: true, role: "CIVIL" },
        { id: "3", name: "Charlie", alive: true, role: "UNDERCOVER" },
        { id: "4", name: "Dave", alive: true, role: "WHITE" },
      ];

      const result = computeWinners(players);
      expect(result).toBeNull();
    });

    it("should return civils win when all undercover and white are eliminated", () => {
      const players: Player[] = [
        { id: "1", name: "Alice", alive: true, role: "CIVIL" },
        { id: "2", name: "Bob", alive: true, role: "CIVIL" },
        { id: "3", name: "Charlie", alive: false, role: "UNDERCOVER" },
        { id: "4", name: "Dave", alive: false, role: "WHITE" },
      ];

      const result = computeWinners(players);
      expect(result).toBe("Les civils gagnent 🟢");
    });

    it("should return undercover win when undercover >= civils", () => {
      const players: Player[] = [
        { id: "1", name: "Alice", alive: true, role: "CIVIL" },
        { id: "2", name: "Bob", alive: false, role: "CIVIL" },
        { id: "3", name: "Charlie", alive: true, role: "UNDERCOVER" },
        { id: "4", name: "Dave", alive: false, role: "WHITE" },
      ];

      const result = computeWinners(players);
      expect(result).toBe("Undercover gagne 🔴");
    });

    it("should not count white as civil for undercover victory", () => {
      const players: Player[] = [
        { id: "1", name: "Alice", alive: true, role: "CIVIL" },
        { id: "2", name: "Bob", alive: true, role: "UNDERCOVER" },
        { id: "3", name: "Charlie", alive: true, role: "WHITE" },
      ];

      const result = computeWinners(players);
      expect(result).toBe("Undercover gagne 🔴");
    });
  });

  describe("tallyVotes", () => {
    it("should return the player with most votes", () => {
      const votes = {
        player1: "targetA",
        player2: "targetA",
        player3: "targetB",
      };

      const result = tallyVotes(votes);
      expect(result).toBe("targetA");
    });

    it("should return null on tie", () => {
      const votes = {
        player1: "targetA",
        player2: "targetB",
      };

      const result = tallyVotes(votes);
      expect(result).toBeNull();
    });

    it("should handle unanimous vote", () => {
      const votes = {
        player1: "target",
        player2: "target",
        player3: "target",
      };

      const result = tallyVotes(votes);
      expect(result).toBe("target");
    });

    it("should handle three-way tie", () => {
      const votes = {
        player1: "targetA",
        player2: "targetB",
        player3: "targetC",
      };

      const result = tallyVotes(votes);
      expect(result).toBeNull();
    });

    it("should handle empty votes", () => {
      const votes = {};
      const result = tallyVotes(votes);
      expect(result).toBeNull();
    });
  });
});
