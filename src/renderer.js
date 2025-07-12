import '@fortawesome/fontawesome-free/css/all.min.css';

let currentActive = null;

window.loadPage = function (url, button) {
  window.electronAPI.loadURL(url);

  if (currentActive) {
    currentActive.classList.remove('active');
  }

  button.classList.add('active');
  currentActive = button;
};

window.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('#sidebar button');
  if (first) first.click();
});
