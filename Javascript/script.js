(function updateColorScheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const rootElement = document.documentElement;
  rootElement.classList = isDarkMode ? 'dark' : '';
})();

function Gameboard() {

  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  //    0 1 2
  //    3 4 5
  //    6 7 8

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
      });
    },
  };
}
Gameboard().generateBoard();

//each cell could be an object containing information like its index, cell value (empty, player or bot).
