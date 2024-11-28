
(function updateColorScheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const rootElement = document.documentElement;
  rootElement.classList = isDarkMode ? 'dark' : '';
})();
