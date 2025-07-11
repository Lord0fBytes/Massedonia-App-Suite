let currentActive = null;

function loadPage(url, button) {
  window.electronAPI.loadURL(url);
  if (currentActive) currentActive.classList.remove('active');
  button.classList.add('active');
  currentActive = button;
}

window.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('#sidebar button');
  if (first) first.click();
});
