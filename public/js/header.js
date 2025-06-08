function toggleMenu() {
  const menu = document.getElementById('user-menu');
  menu.classList.toggle('active');
}

window.addEventListener('click', function(event) {
  const menu = document.getElementById('user-menu');
  const button = document.querySelector('.user-button');
  if (menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
    menu.classList.remove('active');
  }
});
