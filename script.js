const boardElement = document.querySelector("#board");
const message = document.querySelector("#message");
const restartButton = document.querySelector("#restart");

const boardSize = 16;
const winLength = 5;

let cells = [];
let board = Array(boardSize * boardSize).fill("");
let currentPlayer = "X";
let playing = true;

const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

function createBoard() {
  boardElement.innerHTML = "";

  for (let index = 0; index < board.length; index++) {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.dataset.index = index;
    cell.addEventListener("click", chooseCell);
    boardElement.appendChild(cell);
  }

  cells = document.querySelectorAll(".cell");
}

function countSameMarks(row, column, rowStep, columnStep) {
  let count = 0;
  let nextRow = row + rowStep;
  let nextColumn = column + columnStep;

  while (
    nextRow >= 0 &&
    nextRow < boardSize &&
    nextColumn >= 0 &&
    nextColumn < boardSize &&
    board[nextRow * boardSize + nextColumn] === currentPlayer
  ) {
    count++;
    nextRow += rowStep;
    nextColumn += columnStep;
  }

  return count;
}

function checkWinner(index) {
  const row = Math.floor(index / boardSize);
  const column = index % boardSize;

  return directions.some(([rowStep, columnStep]) => {
    const forward = countSameMarks(row, column, rowStep, columnStep);
    const backward = countSameMarks(row, column, -rowStep, -columnStep);
    return 1 + forward + backward >= winLength;
  });
}

function chooseCell(event) {
  const cell = event.target;
  const index = Number(cell.dataset.index);

  if (!playing || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner(index)) {
    playing = false;
    alert(`${currentPlayer} thắng!`);
    return;
  }

  if (!board.includes("")) {
    playing = false;
    alert("Hòa!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Lượt của ${currentPlayer}`;
}

function restartGame() {
  board = Array(boardSize * boardSize).fill("");
  currentPlayer = "X";
  playing = true;
  message.textContent = "Lượt của X";
  cells.forEach((cell) => (cell.textContent = ""));
}

restartButton.addEventListener("click", restartGame);
createBoard();
