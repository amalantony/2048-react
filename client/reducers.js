import { combineReducers } from "redux";

import {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  MOVE_DOWN,
  NEW_GAME,
  GAME_WON,
  GAME_LOST
} from "./actions.js";
import {
  transformLeft,
  transformRight,
  transformUp,
  transformDown
} from "./game-transforms.js";

import { fillNewGridCell, initGameGrid } from "./game-utils.js";

import deepFreeze from "deep-freeze";

export const grid = (state = {}, action) => {
  let newGrid;

  // if either state or action mutates, throw an error
  deepFreeze(state);
  deepFreeze(action);

  switch (action.type) {
    case MOVE_LEFT:
      newGrid = fillNewGridCell(transformLeft(state.grid));
      return Object.assign({}, state, { grid: newGrid });

    case MOVE_RIGHT:
      newGrid = fillNewGridCell(transformRight(state.grid));
      return Object.assign({}, state, { grid: newGrid });

    case MOVE_UP:
      newGrid = fillNewGridCell(transformUp(state.grid));
      return Object.assign({}, state, { grid: newGrid });

    case MOVE_DOWN:
      newGrid = fillNewGridCell(transformDown(state.grid));
      return Object.assign({}, state, { grid: newGrid });

    case NEW_GAME:
      newGrid = initGameGrid(state.dimension);
      return Object.assign({}, state, { grid: newGrid });

    default:
      return state;
  }
};

export const result = (state = "", action) => {
  switch (action.type) {
    case NEW_GAME:
      return "";
    case GAME_WON:
      return "Game Won!";
    case GAME_LOST:
      return "Game Lost!";
    default:
      return state;
  }
};

export default combineReducers({
  grid,
  result
});
