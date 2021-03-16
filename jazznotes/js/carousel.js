var index = 0;

const children = Array.from(document.querySelector(".image-container").children);

function start() {
    window.setInterval(changeImage, 4000);
    setOpacities();
}

function changeImage() {
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
