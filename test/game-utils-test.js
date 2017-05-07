/*
    Tests:

    Transformations:
    -----------------
    [2 2 4 0]           ->  [4 4 0 0]
    [2 4 2 0]           ->  [2 4 2 0]
    [0 0 0 2]           ->  [2 0 0 0]
    [2 2 2 0]           ->  [4 2 0 0]
    [0 2 2 0]           ->  [4 0 0 0]
    [4 0 0 2]           ->  [4 2 0 0]
    [4 0 0 2 0 4 0 8]   ->  [4 2 4 8 0 0 0 0]
    [4 0 0 2 0 2 0 8]   ->  [4 4 8 0 0 0 0 0]

*/

import expect from "expect";
import {
  getScore,
  mergeAndTiltGrid,
  reverseGridRows,
  flipGrid,
  initEmptyGrid,
  mergeArray,
  tiltArray,
  isArrayRollOverable,
  rollOverPrefixZeros
} from "../client/game-utils.js";

describe("In game-utils", () => {
  it("rollOverPrefixZeros must rollover all the prefix zeros", () => {
    expect(rollOverPrefixZeros([0, 0, 2, 4, 0])).toEqual([2, 4, 0, 0, 0]);
  });

  describe("isArrayRolloverable", () => {
    it("must return true for an array with at-least 1 non-zero element", () => {
      expect(isArrayRollOverable([0, 0, 2, 4])).toEqual(true);
    });

    it("must return flase for an array with all zeros", () => {
      expect(isArrayRollOverable([0, 0, 0, 0])).toEqual(false);
    });
  });

  it("tiltArray must tilt the array passed to it", () => {
    expect(tiltArray([0, 0, 2, 0, 2, 4, 0, 8])).toEqual([
      2,
      2,
      4,
      8,
      0,
      0,
      0,
      0
    ]);
  });

  it("mergeArray must merge adjacent alike elements of the array passed to it", () => {
    expect(mergeArray([4, 0, 2, 2, 0])).toEqual([4, 4, 0, 0, 0]);
  });

  it("initEmptyGrid must generate an empty grid of given dimension", () => {
    expect(initEmptyGrid(2)).toEqual([[0, 0], [0, 0]]);
  });

  it("flipGrid must filp the rows and cols of the grid passed to it", () => {
    expect(flipGrid([[2, 4], [1, 8]])).toEqual([[2, 1], [4, 8]]);
  });

  it("reverseGridRows must reverse each row of the grid passed to it", () => {
    expect(reverseGridRows([[2, 0], [8, 4]])).toEqual([[0, 2], [4, 8]]);
  });

  it("mergeAndTiltGrid must tilt and merge each row of the grid", () => {
    expect(mergeAndTiltGrid([[2, 0, 2], [0, 4, 0], [0, 8, 8]])).toEqual([
      [4, 0, 0],
      [4, 0, 0],
      [16, 0, 0]
    ]);
  });

  it("getScore must get the score", () => {
    expect(getScore([[2, 4], [8, 0]])).toEqual(8);
  });
});
