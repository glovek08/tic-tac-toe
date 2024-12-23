(function updateColorScheme() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const rootElement = document.documentElement;
  rootElement.classList = isDarkMode ? "dark" : "";
})();

function Gameboard() {
  const playerScoreDisplay = document.querySelector("#player-score-display");
  const botScoreDisplay = document.querySelector("#bot-score-display");
  const newGameBtn = document.querySelector(".new-game-btn-pushable");

  let currentTurn = "player-turn"; //This switches between "player-turn/bot-turn" when a cell is clicked.
  let playerWinCounter = 0;
  let botWinCounter = 0; 
  let turnCounter = 0; //The counter for each turn, e.g: Player clicks on a cell, that's turnCounter++.
  let isCountdown = false; //Used to control whether the countdown has been initiated.
 
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

  newGameBtn.addEventListener("click", () => {
    setWinCounter(3);
    resetBoard();
    isCountdown = false;
  });

  const setBoardValue = (cellIndex) => {
    if (currentTurn === "player-turn") {
      board[cellIndex] = 1;
      // console.log(board);
      checkWin();
      changeTurn();
    } else {
      board[cellIndex] = 2;
      // console.log(board);
      checkWin();
      changeTurn();
    }
  };

  //prettier-ignore
  const checkWin = () => {
    // console.log("gameboard inside checkWin: " + board);
    for (let combination of WIN_COMBINATIONS) {
      if ( board[combination[0]] === 1 && board[combination[1]] === 1 && board[combination[2]] === 1 ) {
        window.alert("PLAYER WINS!");
        setWinCounter(1);
        resetBoard();
        return;
      } else if ( board[combination[0]] === 2 && board[combination[1]] === 2 && board[combination[2]] === 2 ) {
        window.alert("GUEST WINS!");
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

  const startCountdown = () => {
    const timerDiv = document.querySelector("#timer");
    let initialTime = 299; //In Seconds

    const countdown = setInterval(() => {
      timerDiv.textContent = `${Math.floor(initialTime / 60)}:${(initialTime % 60).toString().padStart(2, '0')}`;
      if (initialTime <= 0) {
        window.alert("TIME'S UP!");
        clearInterval(countdown);
        resetBoard();
        timerDiv.textContent = '5:00';
      }
      if (!isCountdown) {
        clearInterval(countdown);
        resetBoard();
        timerDiv.textContent = '5:00';
      }
      initialTime--;
    }, 1000);
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
    currentTurn = "player-turn";
    turnCounter = 0;
    isCountdown = false;
    for (let i = 0; i < gameboardCells.length; i++) {
      gameboardCells[i].classList = "cell";

      //Removing the X/O SVG's
      while (gameboardCells[i].firstChild) {
        gameboardCells[i].removeChild(gameboardCells[i].firstChild);
      }
      board[i] = 0;
      // console.log(`Cell #${gameboardCells[i].dataset.index} reset.`);
    }
    // console.log(board + " after reset.");
    // console.log(`Player: ${playerWinCounter}\nBot: ${botWinCounter}`);
  };

  const changeTurn = () =>
    (currentTurn = currentTurn === "player-turn" ? "bot-turn" : "player-turn");

  const createCellIcon = (playerOption) => {
    //If playerOption is "player" it returns the svg containing the circle. Otherwise it's the bot's X.
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    if (playerOption === "player") {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", "60");
      circle.setAttribute("cy", "60");
      circle.setAttribute("r", "50");
      svg.appendChild(circle);
    } else if (playerOption === "bot") {
      svg.setAttribute("class", "animate-cross-strokes");
      //First line of the Cross.
      const lineA = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      lineA.setAttribute("x1", "20"); //20
      lineA.setAttribute("y1", "20"); //20
      lineA.setAttribute("x2", "105"); //105
      lineA.setAttribute("y2", "105"); //105
      lineA.setAttribute("class", "lineA");
      //Second line of the Cross.
      const lineB = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      lineB.setAttribute("x1", "105"); //105
      lineB.setAttribute("y1", "20"); //20
      lineB.setAttribute("x2", "20"); //20
      lineB.setAttribute("y2", "105"); //105
      //DONT FUCKING MESS WITH THE COORDINATES.
      lineB.setAttribute("class", "lineB");

      svg.appendChild(lineA);
      svg.appendChild(lineB);
    }
    return svg;
  };

  return {
    generateBoard: function () {
      const gameboardDiv = document.querySelector("#gameboard");

      //for each element in board, we create a new button element that will store its index in a dataset.
      board.forEach((el, index) => {
        const gameboardCell = document.createElement("button");
        gameboardCell.dataset.index = index;
        gameboardCell.ariaLabel = `cell number ${index}`;
        gameboardCell.classList.add("cell");
        gameboardDiv.appendChild(gameboardCell);

        //creating the onclick event for each cell element.
        gameboardCell.addEventListener("click", () => {
          //If the countdown has already been started, don't start it again.
          if(!isCountdown) {
            startCountdown();
            isCountdown = true;
          }
          // If the value in board array of the clicked cell is not 0. It means that its taken.
          if (board[index] === 0) {
            if (currentTurn === "player-turn") {
              gameboardCell.appendChild(createCellIcon("player"));
              // gameboardCell.classList.add("player-cell"); //Uncomment to style each cell according to cell owner.
            } else {
              gameboardCell.appendChild(createCellIcon("bot"));
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

