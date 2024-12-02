(function updateColorScheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const rootElement = document.documentElement;
  rootElement.classList = isDarkMode ? 'dark' : '';
})();

function Gameboard() {
  let currentTurn = 'player-turn';
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  //    0 1 2
  //    3 4 5
  //    6 7 8

  const setBoardValue = (cellIndex) => {
    if(currentTurn === 'player-turn') {
      board[cellIndex] = 1;
      console.log(board);
      changeTurn();
    } else {
      board[cellIndex] = 2;
      changeTurn();
      console.log(board);
    }
  }

  const changeTurn = () => {
    if (currentTurn === 'player-turn') {
      currentTurn = 'bot-turn';
      return;
    } else {
      currentTurn = 'player-turn';
      return;
    }
  }

  const WIN_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6], //diagonals
  ];

  return {
    generateBoard: function () {
      const gameboardDiv = document.querySelector("#gameboard");
      //for each element in board, we create a new button element that will store its index in a dataset.
      board.forEach((el, index) => {
        const gameboardCell = document.createElement("button");
        gameboardCell.dataset.index = index;
        gameboardCell.classList.add("cell");
        gameboardDiv.appendChild(gameboardCell);

        //creating the onclick event for each
        gameboardCell.addEventListener('click', () => {
          //if the value in board array of the clicked cell is not 0. It means that its taken.
          if (board[index] === 0){
            setBoardValue(index);
          }
          else {
            console.log("Can't change cell value!");
          }
        })
      });
    },
  };
}
Gameboard().generateBoard();

//each cell could be an object containing information like its index, cell value (empty, player or bot).
