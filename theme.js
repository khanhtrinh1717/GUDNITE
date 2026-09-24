(() => {
  let theme;
  try { theme = localStorage.getItem('gudnite-theme'); } catch {}
  const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
})();
