(function updateColorScheme() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const rootElement = document.documentElement;
  rootElement.classList = isDarkMode ? "dark" : "";
})();

function Gameboard() {
  const playerScoreDisplay = document.querySelector('#player-score-display');
  const botScoreDisplay = document.querySelector('#bot-score-display');
  let currentTurn = "player-turn";
  let playerWinCounter = 0;
  let botWinCounter = 0;

  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  //    0 1 2
  //    3 4 5
  //    6 7 8

  // prettier-ignore
  const WIN_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],            //rows 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],            //columns
    [0, 4, 8], [2, 4, 6], [6, 4, 2], [8, 4, 0]  //diagonals
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
        console.log();
        setWinCounter(1);
        resetBoard();
        return;
      } else if (
        board[combination[0]] === 2 &&
        board[combination[1]] === 2 &&
        board[combination[2]] === 2
      ) {
        window.alert("BOT WINS!");
        setWinCounter(2);
        resetBoard();
        return;
      }
    }
  };

  const setWinCounter = (option) => {
    /*
      option 1 = player wins.
      option 2 = bot wins.
      option 3 = win score and display reset.
    */
    if (option === 1) {
      playerWinCounter++;
      playerScoreDisplay.textContent = playerWinCounter;
    } else if (option === 2) {
      botWinCounter++;
      botScoreDisplay.textContent = botWinCounter;
    } else if (option === 3) {
      playerWinCounter = 0;
      playerScoreDisplay.textContent = playerWinCounter;
      botWinCounter = 0
      botScoreDisplay.textContent = botWinCounter;
    }
  }

  const resetBoard = () => {
    const gameboardCells = document.querySelectorAll(".cell");
    for (let i = 0; i < gameboardCells.length; i++) {
      gameboardCells[i].classList = "cell";
      board[i] = 0;
      console.log(`Cell #${gameboardCells[i].dataset.index} reset.`);
    }
    console.log(board + " after reset.");
    console.log(`Player: ${playerWinCounter}\nBot: ${botWinCounter}`);
  };

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
  2 - [DONE] Create logic to control the style of each cell depending on who owns it.
  3 - Style each cell onclick.
  4 - Find a way to display a "O" or an "X".
  5 - Implement bot logic.
*/
