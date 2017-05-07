import { combineReducers } from "redux";

import { MOVE_LEFT, MOVE_RIGHT, MOVE_UP, MOVE_DOWN } from "./actions.js";

export const grid = (
  state = {
    grid: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    dimension: 4
  },
  action
) => {
  console.log("In grid, got action", action.type);
  switch (action.type) {
    default:
      return state;
  }
};

export const result = (state = "", action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  grid,
  result
});
