const loginButton = document.querySelector(".login-button");
const overlay = document.getElementById("overlay");
const closeButton = document.querySelector(".close-button");

loginButton.addEventListener("click", () => {
  overlay.classList.add("active");
});

closeButton.addEventListener("click", () => {
  overlay.classList.remove("active");
});