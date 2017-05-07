import React from "react";
import Grid from "./Grid.jsx";
import GameControl from "./GameControl.jsx";
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  updateScore,
  gameWon,
  gameLost
} from "../actions.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class App2048 extends React.Component {
  constructor() {
    super();
    this.isBound = false;
  }

  dispatchEvent(e) {
    const { left, right, up, down } = this.props;
    switch (e.keyCode) {
      case 37:
        console.log("LEFT");
        left();
        break;
      case 38:
        console.log("UP");
        up();
        break;
      case 39:
        console.log("RIGHT");
        right();
        break;
      case 40:
        console.log("DOWN");
        down();
        break;
    }
  }

  bindKeys() {
    // bind keyboard click events
    // bind on mount
    // also bind on new game
    console.log("called bindKeys");
    if (this.isBound) return; // don't bind keys twice
    this.isBound = true;
    console.log("Binding keys");
    document.addEventListener("keydown", this.dispatchEvent.bind(this));
  }

  unbindKeys() {
    // unbind keyboard click event
    // unbind on unmount
    // also unbind with game state changes to win or loss
    this.isBound = false;
    console.log("unbinding keys");
    document.removeEventListener("keydown", this.dispatchEvent.bind(this));
  }

  componentDidMount() {
    this.bindKeys();
  }

  componentWillUnmount() {
    this.unbindKeys();
  }

  updateGameState() {
    // update score, check for victory or loss & dispatch approp actions
    // loss: try all tranformations & see if the array changes for any one of them, if not it's a loss
    // victory: if the score == winScore
  }

  render() {
    const { result, grid, winScore } = this.props;
    this.updateGameState(grid, winScore);
    if (result.length > 0) {
      // some result, unbind all keys
      this.unbindKeys();
    } else {
      // blank result, game has to start
      this.bindKeys();
    }
    //render all sub-components
    return (
      <div className="container">
        <GameControl />
        <Grid />
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
  gameWon: PropTypes.func.isRequired,
  gameLost: PropTypes.func.isRequired,
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
    gameWon: () => dispatch(gameWon()),
    gameLost: () => dispatch(gameLost())
  };
};

const mapStateToProps = state => {
  console.log("STATE", state);
  return {
    result: state.result,
    grid: state.grid.grid,
    winScore: state.grid.winScore
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App2048);
