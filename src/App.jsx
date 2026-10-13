import { useState } from "react";

const boardSize = 16;
const winLength = 5;

const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

function countSameMarks(board, row, column, rowStep, columnStep, player) {
  let count = 0;
  let nextRow = row + rowStep;
  let nextColumn = column + columnStep;

  while (
    nextRow >= 0 &&
    nextRow < boardSize &&
    nextColumn >= 0 &&
    nextColumn < boardSize &&
    board[nextRow * boardSize + nextColumn] === player
  ) {
    count++;
    nextRow += rowStep;
    nextColumn += columnStep;
  }

  return count;
}

function checkWinner(board, index, player) {
  const row = Math.floor(index / boardSize);
  const column = index % boardSize;

  return directions.some(([rowStep, columnStep]) => {
    const forward = countSameMarks(board, row, column, rowStep, columnStep, player);
    const backward = countSameMarks(board, row, column, -rowStep, -columnStep, player);
    return 1 + forward + backward >= winLength;
  });
}

const emptyBoard = () => Array(boardSize * boardSize).fill("");

export default function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [playing, setPlaying] = useState(true);
  const [result, setResult] = useState("");

  function chooseCell(index) {
    if (!playing || board[index] !== "") return;

    const nextBoard = board.slice();
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);

    if (checkWinner(nextBoard, index, currentPlayer)) {
      setPlaying(false);
      setResult(`${currentPlayer} thắng!`);
      alert(`${currentPlayer} thắng!`);
      return;
    }

    if (!nextBoard.includes("")) {
      setPlaying(false);
      setResult("Hòa!");
      alert("Hòa!");
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function restartGame() {
    setBoard(emptyBoard());
    setCurrentPlayer("X");
    setPlaying(true);
    setResult("");
  }

  return (
    <main>
      <h1>Caro 16x16</h1>
      <p id="message">
        {playing ? `Lượt của ${currentPlayer}` : result}
      </p>

      <div id="board-wrapper">
        <div id="board">
          {board.map((mark, index) => (
            <button
              key={index}
              className="cell"
              onClick={() => chooseCell(index)}
            >
              {mark}
            </button>
          ))}
        </div>
      </div>

      <button id="restart" onClick={restartGame}>
        Chơi lại
      </button>
    </main>
  );
}
