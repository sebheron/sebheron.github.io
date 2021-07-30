const home_page = document.getElementById('home-page');
const projects_page = document.getElementById('projects-page');

const project_button = document.getElementById('projects-button');
const page_transition = document.getElementById('page-transition');

function navigateToProjects() {
    page_transition.style.animation = 'growIn 500ms linear forwards';
    window.setTimeout(function () {
        window.history.pushState("", "", '#projects');
        home_page.style.display = 'none';
        projects_page.style.display = 'block';
        page_transition.style.animation = 'growOut 500ms linear forwards';
    }, 600);
}

function navigateToHome() {
    page_transition.style.animation = 'growIn 500ms linear forwards';
    window.setTimeout(function () {
        home_page.style.display = '';
        projects_page.style.display = '';
        page_transition.style.animation = 'growOut 500ms linear forwards';
    }, 600);
}

window.onhashchange = function () {
    if (window.location.hash.includes('projects')) {
        navigateToProjects();
    }
    else {
        navigateToHome();
    }
}

function start() {
    if (window.location.hash.includes('projects')) {
        home_page.style.display = 'none';
        projects_page.style.display = 'block';
    }
    project_button.addEventListener("click", navigateToProjects);
}

document.addEventListener("DOMContentLoaded", start, false);