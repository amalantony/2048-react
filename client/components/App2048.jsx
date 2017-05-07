import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Grid from "./Grid.jsx";
import GameControl from "./GameControl.jsx";
import Title from "./Title.jsx";
import GameResult from "./GameResult.jsx";

import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  updateScore,
  gameWon,
  gameLost
} from "../actions.js";

import { isTransformable } from "../game-transforms.js";
import { getScore } from "../game-utils.js";

class App2048 extends React.Component {
  constructor() {
    super();
    this.isBound = false;
    this.didWin = false;
    this.didLoose = false;
  }

  dispatchEvent(e) {
    if (this.didWin) return true;
    const { left, right, up, down } = this.props;
    switch (e.keyCode) {
      case 37:
        left();
        break;
      case 38:
        up();
        break;
      case 39:
        right();
        break;
      case 40:
        down();
        break;
    }
  }

  bindKeys() {
    if (this.isBound) return; // don't bind keys twice
    this.isBound = true;
    document.addEventListener("keydown", this.dispatchEvent.bind(this));
  }

  unbindKeys() {
    this.isBound = false;
    document.removeEventListener("keydown", this.dispatchEvent.bind(this));
  }

  componentDidMount() {
    this.bindKeys();
  }

  componentWillUnmount() {
    this.unbindKeys();
  }

  updateGameState(grid, winScore) {
    // check for victory or loss & dispatch appr actions
    // loss: try all tranformations & see if the array changes for any one of them, if not it's a loss
    // victory: if the score == winScore
    const { won, lost } = this.props;
    if (getScore(grid) === winScore) {
      // gameWon;
      this.didWin = true;
      this.unbindKeys();
      won();
    }
    if (!isTransformable(grid)) {
      // gameLost;
      this.didLoose = true;
      this.unbindKeys();
      lost();
    }
  }

  render() {
    const { result, grid, winScore } = this.props;
    window.setTimeout(() => this.updateGameState(grid, winScore));
    if (result.length > 0) {
      // some result, unbind all keys
      this.unbindKeys();
    } else {
      // blank result, game has to start
      this.didWin = false;
      this.didLoose = false;
      this.bindKeys();
    }
    //render all sub-components
    return (
      <div className="container">
        <Title />
        <GameControl />
        <Grid />
        <GameResult />
      </div>
    );
  }
}

App2048.propTypes = {
  left: PropTypes.func.isRequired,
  right: PropTypes.func.isRequired,
  up: PropTypes.func.isRequired,
  down: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  won: PropTypes.func.isRequired,
  lost: PropTypes.func.isRequired,
  result: PropTypes.string.isRequired,
  grid: PropTypes.array.isRequired,
  winScore: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    left: () => dispatch(moveLeft()),
    right: () => dispatch(moveRight()),
    up: () => dispatch(moveUp()),
    down: () => dispatch(moveDown()),
    updateScore: () => dispatch(updateScore()),
    won: () => dispatch(gameWon()),
    lost: () => dispatch(gameLost())
  };
};

const mapStateToProps = state => {
  return {
    result: state.result,
    grid: state.grid.grid,
    winScore: state.grid.winScore
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App2048);
