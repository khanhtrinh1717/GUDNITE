(() => {
  let theme;
  try { theme = localStorage.getItem('gudnite-theme'); } catch {}
  const dark = theme === 'dark';
  document.documentElement.classList.toggle('dark', dark);
})();
