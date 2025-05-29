const images = document.querySelectorAll(".carousel img");
let current = 0;
let timeoutId;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
    });
}

function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
    resetTimer();
}

function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
    resetTimer();
}

function resetTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(nextImage, 5000);
}

document.getElementById("next").addEventListener("click", nextImage);
document.getElementById("prev").addEventListener("click", prevImage);

// Iniciar carrusel automático
resetTimer();