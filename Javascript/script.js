(function updateColorScheme() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const rootElement = document.documentElement;
  rootElement.classList = isDarkMode ? "dark" : "";
})();

function Gameboard() {
  let currentTurn = "player-turn";
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  //    0 1 2
  //    3 4 5
  //    6 7 8
  const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //columns
    [0, 4, 8],
    [2, 4, 6], //diagonals
  ];

  const setBoardValue = (cellIndex) => {
    if (currentTurn === "player-turn") {
      board[cellIndex] = 1;
      console.log(board);
      checkWin();
      changeTurn();
    } else {
      board[cellIndex] = 2;
      console.log(board);
      checkWin();
      changeTurn();
    }
  };

  const checkWin = () => {
    console.log("gameboard inside checkWin: " + board);
    for (let combination of WIN_COMBINATIONS) {
      if (
        board[combination[0]] === 1 &&
        board[combination[1]] === 1 &&
        board[combination[2]] === 1
      ) {
        window.alert("PLAYER WINS!");
        resetBoard();
        return;
      } else if (
        board[combination[0]] === 2 &&
        board[combination[1]] === 2 &&
        board[combination[2]] === 2
      ) {
        window.alert("BOT WINS!");
        resetBoard();
        return;
      }
    }
  };

  const resetBoard = () => {
    const gameboardCells = document.querySelectorAll('.cell');
    for (let i = 0; i < gameboardCells.length; i++) {
      gameboardCells[i].classList = 'cell';
      board[i] = 0;
      console.log(`Cell #${gameboardCells[i].dataset.index} reset.`);
    }
    console.log(board+" after reset.");
  }

  const changeTurn = () =>
    (currentTurn = currentTurn === "player-turn" ? "bot-turn" : "player-turn");

  return {
    generateBoard: function () {
      const gameboardDiv = document.querySelector("#gameboard");
      //for each element in board, we create a new button element that will store its index in a dataset.
      board.forEach((el, index) => {
        const gameboardCell = document.createElement("button");
        gameboardCell.dataset.index = index;
        gameboardCell.classList.add("cell");
        gameboardDiv.appendChild(gameboardCell);

        //creating the onclick event for each cell element.
        gameboardCell.addEventListener("click", () => {
          // If the value in board array of the clicked cell is not 0. It means that its taken.
          if (board[index] === 0) {
            if (currentTurn === "player-turn") {
              gameboardCell.classList.add("player-cell");
            } else {
              gameboardCell.classList.add("bot-cell");
            }
            setBoardValue(index);
          } else {
            console.log("Can't change cell value!");
          }
        });
      });
    },
  };
}
Gameboard().generateBoard();
/*
  TODO:
  1 - [DONE] Implement winning condition. (check the test-project, use the winning combinations).
  2 - Create logic to control the style of each cell depending on who owns it.
  3 - Style each cell onclick.
  4 - Find a way to display a "O" or an "X".
  5 - Implement bot logic.
*/
