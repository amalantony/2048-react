import React from "react";
import { connect } from "react-redux";
import { newGame } from "../actions.js";

const GameControl = ({ resetGame }) => {
  return (
    <div>
      <button className="button-primary reset-game-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    resetGame: () => dispatch(newGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameControl);
