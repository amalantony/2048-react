import React from "react";
import { connect } from "react-redux";

const GameResult = ({ resultText }) => {
  return (
    <div className="game-result">
      <h4> {resultText} </h4>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    resultText: state.result
  };
};

export default connect(mapStateToProps)(GameResult);
