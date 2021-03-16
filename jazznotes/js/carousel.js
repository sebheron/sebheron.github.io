var index = 0;
var play_carousel = true;

const play_button = document.getElementById("play-button");
const play_icon = document.getElementById("play-icon");

const children = Array.from(document.querySelector(".image-container").children);

function start() {
    play_button.addEventListener("click", playPauseCarousel);
    window.setInterval(changeImage, 4000);
    setOpacities();
}

function playPauseCarousel() {
  play_carousel = !play_carousel;
  if (play_carousel){
    play_icon.className = "fas fa-pause";
  }
  else {
    play_icon.className = "fas fa-play";
  }
}

function changeImage() {
  if (!play_carousel) return;
  index = (index + 1) % 4;
  setOpacities();
}

function setOpacities() {
  children.forEach((item, i) => {
    if (index == i){
      item.style.opacity = 1;
    }
    else {
      item.style.opacity = 0;
    }
  });
}

document.addEventListener("DOMContentLoaded", start, false);
