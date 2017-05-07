import expect from "expect";

import {
  transformLeft,
  transformRight,
  transformUp,
  transformDown,
  isTransformable
} from "../client/game-transforms.js";

describe("In game-transforms", () => {
  it("transformLeft must transform an array to the left", () => {
    expect(transformLeft([[0, 2, 2], [0, 4, 0], [4, 0, 2]])).toEqual([
      [4, 0, 0],
      [4, 0, 0],
      [4, 2, 0]
    ]);
  });

  it("transformRight must transform an array to the right", () => {
    expect(transformRight([[4, 0, 2], [8, 8, 0], [2, 4, 2]])).toEqual([
      [0, 4, 2],
      [0, 0, 16],
      [2, 4, 2]
    ]);
  });

  it("transformUp must transform an array up", () => {
    expect(transformUp([[2, 0, 4], [2, 4, 16], [4, 8, 2]])).toEqual([
      [4, 4, 4],
      [4, 8, 16],
      [0, 0, 2]
    ]);
  });

  it("transformDown must transform an array down", () => {
    expect(transformDown([[8, 4, 2], [0, 4, 4], [8, 4, 8]])).toEqual([
      [0, 0, 2],
      [0, 4, 4],
      [16, 8, 8]
    ]);
  });
});
