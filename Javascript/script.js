(function updateColorScheme() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const rootElement = document.documentElement;
  rootElement.classList = isDarkMode ? "dark" : "";
})();

function Gameboard() {
  const playerScoreDisplay = document.querySelector("#player-score-display");
  const botScoreDisplay = document.querySelector("#bot-score-display");
  let currentTurn = "player-turn";
  let playerWinCounter = 0;
  let botWinCounter = 0;
  let turnCounter = 0;

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

  //prettier-ignore
  const checkWin = () => {
    console.log("gameboard inside checkWin: " + board);
    for (let combination of WIN_COMBINATIONS) {
      if ( board[combination[0]] === 1 && board[combination[1]] === 1 && board[combination[2]] === 1 ) {
        window.alert("PLAYER WINS!");
        console.log();
        setWinCounter(1);
        resetBoard();
        return;
      } else if ( board[combination[0]] === 2 && board[combination[1]] === 2 && board[combination[2]] === 2 ) {
        window.alert("BOT WINS!");
        setWinCounter(2);
        resetBoard();
        return; 
      }
    }
    if (turnCounter === 9) {
      window.alert('DRAW!');
      resetBoard();
    }
  };

  const setWinCounter = (option) => {
    /*
      option 1 = player wins.
      option 2 = bot wins.
      option 3 = win score and display reset. Use this when creating a new game.
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
      botWinCounter = 0;
      botScoreDisplay.textContent = botWinCounter;
    }
  };

  const resetBoard = () => {
    const gameboardCells = document.querySelectorAll(".cell");
    turnCounter = 0;
    for (let i = 0; i < gameboardCells.length; i++) {
      gameboardCells[i].classList = "cell";
      board[i] = 0;
      console.log(`Cell #${gameboardCells[i].dataset.index} reset.`);
    }
    console.log(board + " after reset.");
    console.log(`Player: ${playerWinCounter}\nBot: ${botWinCounter}`);
  };

  const changeTurn = () => currentTurn = currentTurn === "player-turn" ? "bot-turn" : "player-turn";

  const createCellIcon = (playerOption) => {
    //If the player option is "player" it returns the svg containing the circle. Otherwise it's the bot's X.
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    if (playerOption === "player") {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", "60");
      circle.setAttribute("cy", "60");
      circle.setAttribute("r", "50");
      svg.appendChild(circle);
    } else {
      return window.alert('This is an X');
      //Continue doing the code for the X. Return the X. Mind the dimensions, use the variable for the bot color.
    }
    return svg;
  }

  return {
    generateBoard: function () {
      const gameboardDiv = document.querySelector("#gameboard");

      //CREATING THE SVG FOR THE PLAYER:

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
              gameboardCell.appendChild(createCellIcon('player'));
              // gameboardCell.classList.add("player-cell");
            } else {
              // gameboardCell.classList.add("bot-cell");
            }
            turnCounter++;
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
  4 - Find a way to display a "O" or an "X":
        Create a SVG both for X and O for the button with display: none,
        switch display when click according to the cell's value.
  5 - Implement bot logic.
  6 - [DONE] Handle Draw.
*/
