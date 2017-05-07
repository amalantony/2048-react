import expect from "expect";
import { moveLeft, MOVE_LEFT } from "../client/actions.js";

describe("In actions.js", () => {
  it("generateActionCreator must return an action creator based on the action passed to it", () => {
    expect(moveLeft()).toEqual({
      type: MOVE_LEFT
    });
  });
});
