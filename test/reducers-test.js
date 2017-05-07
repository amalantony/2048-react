import expect from "expect";
import { grid, result } from "../client/reducers.js";
import { NEW_GAME, GAME_WON, GAME_LOST } from "../client/actions.js";

describe("In reducers", () => {
  describe("result reducer", () => {
    it("must reset text on NEW_GAME", () => {
      expect(result("Game won!", { type: NEW_GAME })).toEqual("");
    });

    it("must set text on GAME_WON", () => {
      expect(result("", { type: GAME_WON })).toEqual("Game Won!");
    });

    it("must set text on GAME_LOST", () => {
      expect(result("", { type: GAME_LOST })).toEqual("Game Lost!");
    });
  });
});
