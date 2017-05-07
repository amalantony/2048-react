/*
  A collection of utility functions that encompasses the game logic
*/

export const rollOverPrefixZeros = arr => {
  // rolls over (array rotation) all prefix zeros in an array
  const [first, ...rest] = [...arr];
  if (first === 0) {
    return rollOverPrefixZeros([...rest, first]);
  } else {
    return arr;
  }
};

export const isArrayRollOverable = arr => {
  // if all elems of arr is 0, the arr is not rolloverable
  const nonZeros = arr.filter(i => i !== 0);
  return nonZeros.length > 0;
};

export const tiltArray = (arr, resultArray = []) => {
  // tilts an Array to the left
  if (arr.length === 0) {
    return resultArray;
  }

  let [first, ...rest] = [...arr];

  const rollOverable = isArrayRollOverable(arr);

  if (first !== 0) {
    resultArray = [...resultArray, first];
    arr = rest;
  } else if (first === 0 && isArrayRollOverable(arr)) {
    arr = rollOverPrefixZeros(arr);
  } else {
    // arr not rollOverable, it's full of 0s.
    resultArray = [...resultArray, ...arr];
    arr = [];
  }
  return tiltArray(arr, resultArray);
};

export const mergeArray = (arr, resultArray = []) => {
  // merge alike, adjacent elements in an array
  if (arr.length === 0 || typeof arr[0] === "undefined") {
    return resultArray;
  }

  console.log(`arr: ${arr}`);

  const [first, second, ...rest] = [...arr];
  const rollOverable = isArrayRollOverable(arr);

  if (first === 0 && rollOverable) {
    console.log("* 0");
    return mergeArray(rollOverPrefixZeros(arr), resultArray);
  } else if (!rollOverable) {
    console.log("* 1");
    return mergeArray([], [...resultArray, ...arr]);
  } else if (first === second) {
    console.log("* 2");
    return mergeArray([0, ...rest], [...resultArray, first + second]);
  } else {
    console.log("* 3");
    return mergeArray([second, ...rest], [...resultArray, first]);
  }
};

console.log("MERGE ARRAY [8, 2, 4, 16]", mergeArray([8, 2, 4, 16]));

export const generateRandomNumber = (min, max) => {
  // generates random integer between min(inclusive) and max(inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomGridCoordinate = dimension => {
  // generates a random (x, y) co-ordinate in a square grid of side dimension
  return [
    generateRandomNumber(0, dimension - 1),
    generateRandomNumber(0, dimension - 1)
  ];
};

export const initEmptyGrid = dimension => {
  // initializes a square grid with all 0s of side dimension
  const grid = [];
  let tmpArr;
  for (let i = 0; i < dimension; i++) {
    tmpArr = Array.from({ length: dimension }, () => 0);
    grid.push(tmpArr);
  }
  return grid;
};

export const initGameGrid = dimension => {
  // initialises the game grid with 2/4s filled in at random at 2 spots.
  const grid = initEmptyGrid(dimension);
  let x1, y1, x2, y2;
  // initialize 2 random grid positions to start the game off
  while (true) {
    [x1, y1] = getRandomGridCoordinate(dimension);
    [x2, y2] = getRandomGridCoordinate(dimension);
    if (x1 !== x2 || y1 !== y2) break;
  }

  const num1 = generateRandomNumber(1, 2) * 2; // generate either 2 or 4, randomly
  const num2 = generateRandomNumber(1, 2) * 2;

  grid[x1][y1] = num1;
  grid[x2][y2] = num2;
  return grid;
};

// console.log(tiltArray([2, 0, 2, 0]));
// console.log(tiltArray([4, 0, 0, 2, 0, 4, 0, 8]));
// console.log(mergeArray(tiltArray([4, 0, 0, 2, 0, 2, 0, 8])));
// console.log(initializeGrid(4));

export const flipGrid = grid => {
  // takes a N x N grid & flips it's rows & cols
  let tmpGrid = initEmptyGrid(grid.length);
  grid.forEach((row, i) => {
    row.forEach((el, j) => {
      tmpGrid[i][j] = grid[j][i];
    });
  });
  return tmpGrid;
};

// console.log(gridFlip([[1, 2, 0], [0, 2, 0], [2, 0, 2]], 3));
// console.log(gridFlip([[1, 0, 2], [2, 2, 0], [0, 0, 2]], 3));

export const reverseGridRows = grid => {
  // takes a grid & reverses each of it's rows
  return grid.map(row => {
    return row.slice().reverse();
  });
};

// console.log(reverseGridRows([[1, 2, 0], [0, 2, 0], [2, 0, 2]], 3));
// console.log(reverseGridRows([[1, 0, 2], [2, 2, 0], [0, 0, 2]], 3));

export const mergeAndTiltGrid = grid => {
  // merges and tilts every row of the grid
  return grid.map(row => {
    return mergeArray(tiltArray(row));
  });
};

export const findEmptyCells = grid => {
  // finds all the empty cells in the grid
  const dimension = grid.length;
  let result = [];
  grid.forEach((row, i) => {
    row.forEach((el, j) => {
      if (grid[i][j] === 0) {
        result = [...result, [i, j]];
      }
    });
  });
  return result;
};

export const cloneGrid = grid => {
  // clones a grid
  return grid.map(row => {
    return row.slice();
  });
};

export const fillNewGridCell = grid => {
  // fills either a 2 or a 4 in an empty grid cell, if it exists
  const emptyCells = findEmptyCells(grid);
  const randomValue = generateRandomNumber(1, 2) * 2;
  const gridCopy = cloneGrid(grid);
  if (emptyCells.length > 0) {
    const randomIndex = generateRandomNumber(0, emptyCells.length - 1); // [0 , 1]
    gridCopy[emptyCells[randomIndex][0]][
      emptyCells[randomIndex][1]
    ] = randomValue;
  }
  return gridCopy;
};
