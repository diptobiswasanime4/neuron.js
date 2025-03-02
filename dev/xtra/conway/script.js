const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const GRID_SIDE = 25;
const GRID_ROWS = canvas.height / GRID_SIDE;
const GRID_COLS = canvas.width / GRID_SIDE;

const nextTurn = document.getElementById("next-turn");
const start = document.getElementById("start");

nextTurn.addEventListener("click", (e) => {
  updateGrid();

  // draw
  drawGrid();
});

let grid = [];
let nextGrid = [];

initializeGrid();
drawGrid();

console.log(grid);

function neighborCount(i, j) {
  let count = 0;

  // top row
  if (i != 0 && j != 0) {
    count += grid[i - 1][j - 1];
  }
  if (i != 0) {
    count += grid[i - 1][j];
  }
  if (i != 0 && j != GRID_ROWS - 1) {
    count += grid[i - 1][j + 1];
  }

  // mid row
  if (j != 0) {
    count += grid[i][j - 1];
  }
  if (j != GRID_ROWS - 1) {
    count += grid[i][j + 1];
  }

  // bottom row
  if (i != GRID_COLS - 1 && j != 0) {
    count += grid[i + 1][j - 1];
  }
  if (i != GRID_COLS - 1) {
    count += grid[i + 1][j];
  }
  if (i != GRID_COLS - 1 && j != GRID_ROWS - 1) {
    count += grid[i + 1][j + 1];
  }

  return count;
}

function initializeGrid() {
  for (let i = 0; i < GRID_COLS; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_ROWS; j++) {
      let rand = Math.random();
      grid[i][j] = rand > 0.7 ? 1 : 0;
    }
  }
}

function drawGrid() {
  for (let i = 0; i < GRID_COLS; i++) {
    for (let j = 0; j < GRID_ROWS; j++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.strokeRect(j * GRID_SIDE, i * GRID_SIDE, GRID_SIDE, GRID_SIDE);
      ctx.stroke();
      if (grid[i][j] == 1) {
        ctx.fillStyle = "white";
        ctx.fillRect(j * GRID_SIDE, i * GRID_SIDE, GRID_SIDE, GRID_SIDE);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(j * GRID_SIDE, i * GRID_SIDE, GRID_SIDE, GRID_SIDE);
      }
      ctx.closePath();
    }
  }
}

function updateGrid() {
  nextGrid = grid.map((row) => [...row]);
  for (let i = 0; i < GRID_COLS; i++) {
    for (let j = 0; j < GRID_ROWS; j++) {
      console.log(i, j, neighborCount(i, j));

      // living cell dies
      if (grid[i][j] == 1) {
        if (neighborCount(i, j) < 2 || neighborCount(i, j) > 3) {
          nextGrid[i][j] = 0;
        }
      }

      // reproduction
      if (grid[i][j] == 0) {
        if (neighborCount(i, j) == 3) {
          nextGrid[i][j] = 1;
        }
      }
    }
  }

  grid = nextGrid.map((row) => [...row]);
}

start.addEventListener("click", (e) => {
  setInterval(() => {
    updateGrid();
    drawGrid();
  }, 250);
});
