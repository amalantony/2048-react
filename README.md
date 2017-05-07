Setup
---
Clone the git repository, `cd` into the directory and run `npm install`

Starting the app
---
The App is implemented as a React application that sits behind a webpack dev server. The server can be started up with `npm start`.

Running Tests
---
Mocha is used as a test runner for the project. The tests can be started by running `npm test`.



Design Decisions
------

### General Principles
---
* The app is designed to be as functional as possible. Most React components are implemented as functions. `App2048` is the only component implemented as a Class since it makes use of React Lifecycle methods. 

* Redux was chosen as the application state manager for this application. This choice was made since Redux provides a convinient one directional data flow that makes state easy to reason about.

* It must be easy to configure the game. For instance, in order to change the winning score or the grid size, simply alter the appropriate values in `client/client.js`.

### Code Organisation
---
The client side react code is organised in the `client/` directory. Most of the game specific logic has been implemented in the files `client/game-transform.js` and `client/game-utils.js`. 

The tests are under the `test/` directory. Webpack builds the code and adds it to the `build/` directory.


### Redux State
--------
The following is the structure of the Redux state object:
```
{
    grid: {
        grid: [][]        // the NxN grid
        dimension: 4      // the value of N
        winScore: 2048   //  score required to win the game
    },
    result: ""           // game result string
}
```
### Redux Actions
---
The following Redux actions change the state of the app:

`MOVE_LEFT`: Dispatched when the user presses the left arrow key.

`MOVE_RIGHT`: Dispatched when the user presses the right arrow key.

`MOVE_UP`: Dispatched when the user presses the up arrow key.

`MOVE_DOWN`: Dispatched when the user presses the down arrow key.

`NEW_GAME`: Dispatched when the user presses the New Game buttons.

`GAME_WON`: Dispatched when a game is won.

`GAME_LOST`: Dispatched when a game is lost.


### Redux Reducers
---
- `grid`: Reducer for all state changes related to the grid.
- `result`: Reducer for all state changes related to the result.