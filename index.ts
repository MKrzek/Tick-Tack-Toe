import "./style.css";
type Cell = "X" | "" | "0"
type Row = number
type Column = number
type TicTacToeBoard = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]]

const appElement = document.getElementById("app");
const boardElement = document.getElementById("board");
const ROW_COUNT = 3;
const COL_COUNT = 3;

let boardState: TicTacToeBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
let currentMove: "X" | "0" = "0"

function createCell(row: Row, col: Column, content: Cell = "") {
  const cell = document.createElement("button");
  cell.setAttribute("data-row", row.toString());
  cell.setAttribute("data-col", col.toString());
  cell.setAttribute("data-content", content);
  cell.classList.add("cell");
  cell.addEventListener("click", () => {
    if (boardState[row][col] === "") {
      boardState[row][col] = currentMove;
      currentMove = currentMove === "X" ? "0" : "X"
      renderBoard()
    }
  })
  return cell;
}

function renderBoard() {
  if (!appElement) throw new Error("Cannot find app");
  if (!boardElement) throw new Error("Cannot find board");
  boardElement.innerHTML = "";
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      boardElement.appendChild(createCell(i, j, boardState[i][j]));
    }
  }
  const oldMoveElement = document.getElementById("move-element");
  if (oldMoveElement) {
    oldMoveElement.remove();
  }
  const moveElement = document.createElement("p");
  moveElement.id = "move-element";
  moveElement.innerText = `Next Move: ${currentMove}`;
  moveElement.classList.add("current-move");
  appElement.insertBefore(moveElement, document.getElementById("reset"));
}

function init() {
  const resetButton = document.getElementById("reset");
  if (!resetButton) throw new Error("No Reset button");
  resetButton.addEventListener("click", () => {
    boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    currentMove = "X";
    renderBoard();
  });
  renderBoard();
}

init();
