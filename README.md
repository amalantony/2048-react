State
---
{
    winScore: 2048,
    gridDimension: 4,          // 4 x 4 grid
    grid: [[0, 0, 0, 0]
           [0, 0, 0, 0]
           [0, 0, 0, 0]
           [0, 0, 0, 0]]
}

Actions
---
MOVE_LEFT
MOVE_RIGHT
MOVE_UP
MOVE_DOWN

NEW_GAME
GAME_WON
GAME_LOST
UPDATE_SCORE


Notes: 
- Shift up such that all preceding 0s everywhere are replaced by subsequent elements -> basically circular rotate the array :)
- Initially shift up
- Then merge, after a successful merge, lift the item behind to the place of the merged in element

Tests: 

Transformations:
-----------------
[2 2 4 0]           ->  [4 4 0 0]
[2 4 2 0]           ->  [2 4 2 0]
[0 0 0 2]           ->  [2 0 0 0]
[2 2 2 0]           ->  [4 2 0 0]
[0 2 2 0]           ->  [4 0 0 0]
[4 0 0 2]           ->  [4 2 0 0]
[4 0 0 2 0 4 0 8]   ->  [4 2 4 8 0 0 0 0]
[4 0 0 2 0 2 0 8]   ->  [4 4 8 0 0 0 0 0]

function rollOverZeros  => start with an array of preceding 0s and roll over till all 0s are rolledOver. 

function trimZeros => Iterate each element of array calling rollOver when a zero is found 

For each element of the array that is 0, rollover starting from slice() of that array at the point.