import { describe, it, expect } from "vitest";
import { pickWords, WORD_PAIRS } from "../words";

describe("words", () => {
  describe("WORD_PAIRS", () => {
    it("should have valid word pairs", () => {
      expect(WORD_PAIRS.length).toBeGreaterThan(0);

      WORD_PAIRS.forEach((pair) => {
        expect(pair.civilian).toBeTruthy();
        expect(pair.undercover).toBeTruthy();
        expect(typeof pair.civilian).toBe("string");
        expect(typeof pair.undercover).toBe("string");
      });
    });

    it("should have unique pairs", () => {
      const civilianWords = WORD_PAIRS.map((p) => p.civilian);
      const uniqueCivilian = new Set(civilianWords);

      expect(civilianWords.length).toBe(uniqueCivilian.size);
    });
  });

  describe("pickWords", () => {
    it("should return a valid word pair", () => {
      const pair = pickWords();

      expect(pair).toBeTruthy();
      expect(pair.civilian).toBeTruthy();
      expect(pair.undercover).toBeTruthy();
    });

    it("should return a pair from WORD_PAIRS", () => {
      const pair = pickWords();

      const found = WORD_PAIRS.some(
        (p) => p.civilian === pair.civilian && p.undercover === pair.undercover
      );

      expect(found).toBe(true);
    });
  });
});
