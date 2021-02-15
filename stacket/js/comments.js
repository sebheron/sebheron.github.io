var comments_shown = true;

const comments_button = document.getElementById("comments-button");
const comments_section = document.getElementById("comments-section");

function start() {
    comments_button.addEventListener("click", showHideComments);
}

function showHideComments() {
    if (comments_shown) {
        comments_button.innerHTML = "Show comments";
        comments_section.style.display = "none";
        comments_shown = false;
    }
    else {
        comments_button.innerHTML = "Hide comments";
        comments_section.style.display = "";
        comments_shown = true;
    }
}

document.addEventListener("DOMContentLoaded", start, false);