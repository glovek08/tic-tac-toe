
// (function updateColorScheme() {
//   const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const rootElement = document.documentElement;
//   rootElement.classList = isDarkMode ? 'dark' : '';
// })();





function Gameboard() {
  const board = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
  //outer array = rows.
  //inner array = column.
  const getBoard = () => board;
}

//each cell could be an object containing information like its index, cell value (empty, player or bot). 

