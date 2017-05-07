import React from "react";
import { connect } from "react-redux";
/*
  [[0, 0, 0, 0]
   [0, 0, 0, 0]
   [2, 0, 0, 0]
   [0, 2, 0, 0]]

*/

const Grid = ({ grid }) => {
  const rows = grid.map((row, i) => {
    const cols = row.map((el, j) => {
      if (el === 0) el = "_";
      return (
        <td key={j} className="tile">
          {el}
        </td>
      );
    });
    return <tr key={i}>{cols}</tr>;
  });

  return (
    <table className="bordered">
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    grid: state.grid.grid
  };
};

export default connect(mapStateToProps)(Grid);
