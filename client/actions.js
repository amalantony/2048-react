const generateActionCreator = type => {
  // takes an action type and returns the action generator for that action
  return () => {
    return {
      type
    };
  };
};

export const MOVE_LEFT = "MOVE_LEFT";
export const moveLeft = generateActionCreator(MOVE_LEFT);

export const MOVE_RIGHT = "MOVE_RIGHT";
export const moveRight = generateActionCreator(MOVE_RIGHT);

export const MOVE_UP = "MOVE_UP";
export const moveUp = generateActionCreator(MOVE_UP);

export const MOVE_DOWN = "MOVE_DOWN";
export const moveDown = generateActionCreator(MOVE_DOWN);

export const GAME_WON = "GAME_WON";
export const gameWon = generateActionCreator(GAME_WON);

export const GAME_LOST = "GAME_LOST";
export const gameLost = generateActionCreator(GAME_LOST);

export const UPDATE_SCORE = "UPDATE_SCORE";
export const updateScore = generateActionCreator(UPDATE_SCORE);

export const NEW_GAME = "NEW_GAME";
export const newGame = generateActionCreator(NEW_GAME);
