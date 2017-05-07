import React from "react";
import Grid from "./Grid.jsx";
import { moveLeft, moveRight, moveUp, moveDown } from "../actions.js";
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

  render() {
    const result = this.props.result;
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
  result: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    left: () => dispatch(moveLeft()),
    right: () => dispatch(moveRight()),
    up: () => dispatch(moveUp()),
    down: () => dispatch(moveDown())
  };
};

const mapStateToProps = state => {
  return {
    result: state.result
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App2048);
