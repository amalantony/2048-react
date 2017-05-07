import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./reducers.js";
import { initGameGrid } from "./game-utils.js";
import App2048 from "./components/App2048.jsx";

/*
  In order to change the dimensions of the grid, or the win score, edit the values below
*/
export const DIMENSION = 4; // 4 x 4 grid
export const WINSCORE = 2048; // reach 2048 to win

// state initialisation
const dimension = DIMENSION;
const winScore = WINSCORE;
const grid = initGameGrid(dimension);

const initialState = {
  grid: {
    grid,
    dimension,
    winScore
  },
  result: ""
};

const store = createStore(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App2048 />
  </Provider>,
  document.getElementById("root")
);
