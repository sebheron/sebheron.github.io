const project_button = document.getElementById('projects-button');
const page_transition = document.getElementById('page-transition');

function showFade() {
    if (location.href.includes('portfolio') && location.hash == '#transition') {
        window.setTimeout(function () {
            page_transition.style.animation = 'growOut 500ms linear forwards';
        }, 300);
    }
}

function navigateToProjects() {
    page_transition.style.animation = 'growIn 500ms linear forwards';
    window.setTimeout(function () {
        document.location.href = 'https://swegrock.github.io/portfolio.html#transition';
    }, 500);
}

function start() {
    showFade();
    project_button.addEventListener("click", navigateToProjects);
}

document.addEventListener("DOMContentLoaded", start, false);