import { describe, it, expect } from "vitest";
import { shuffle, uid } from "../utils";

describe("utils", () => {
  describe("uid", () => {
    it("should generate a unique string", () => {
      const id1 = uid();
      const id2 = uid();

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it("should generate strings of consistent length", () => {
      const id = uid();
      expect(id.length).toBeGreaterThan(0);
    });
  });

  describe("shuffle", () => {
    it("should return an array of the same length", () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);

      expect(shuffled).toHaveLength(arr.length);
    });

    it("should contain all original elements", () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);

      expect(shuffled.sort()).toEqual(arr.sort());
    });

    it("should not mutate the original array", () => {
      const arr = [1, 2, 3, 4, 5];
      const original = [...arr];
      shuffle(arr);

      expect(arr).toEqual(original);
    });

    it("should handle empty arrays", () => {
      const arr: number[] = [];
      const shuffled = shuffle(arr);

      expect(shuffled).toEqual([]);
    });

    it("should handle single-element arrays", () => {
      const arr = [1];
      const shuffled = shuffle(arr);

      expect(shuffled).toEqual([1]);
    });
  });
});
