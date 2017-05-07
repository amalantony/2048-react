import { flipGrid, reverseGridRows, mergeAndTiltGrid } from "./game-utils.js";

export const transformLeft = grid => {
  return mergeAndTiltGrid(grid);
};

export const transformRight = grid => {
  return reverseGridRows(mergeAndTiltGrid(reverseGridRows(grid)));
};

export const transformUp = grid => {
  return flipGrid(mergeAndTiltGrid(flipGrid(grid)));
};

export const transformDown = grid => {
  return flipGrid(
    reverseGridRows(mergeAndTiltGrid(reverseGridRows(flipGrid(grid))))
  );
};

const gridToString = grid => {
  let finalStr = "";
  grid.forEach(row => {
    row.forEach(val => {
      finalStr = finalStr += val;
    });
  });
  return finalStr;
};

export const isTransformable = grid => {
  // returns true if the grid can be transformable
  const gridStr = gridToString(grid);
  const leftTransformStr = gridToString(transformLeft(grid));
  const rightTransformStr = gridToString(transformRight(grid));
  const upTransformStr = gridToString(transformUp(grid));
  const downTransformStr = gridToString(transformDown(grid));

  if (
    gridStr === leftTransformStr &&
    leftTransformStr === rightTransformStr &&
    rightTransformStr === upTransformStr &&
    upTransformStr === downTransformStr
  )
    return false;
  return true;
};
