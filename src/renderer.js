let currentActiveButton = null;

function loadPage(url, button) {
  document.getElementById('content').src = url;

  if (currentActiveButton) {
    currentActiveButton.classList.remove('active');
  }

  button.classList.add('active');
  currentActiveButton = button;
}

// Auto-load the first button
window.addEventListener('DOMContentLoaded', () => {
  const firstButton = document.querySelector('#sidebar button');
  if (firstButton) {
    firstButton.click();
  }
});
