var darkmode = false;
var transitions = false;

const darkmode_button = document.getElementById('darkmode-button');
const darkmode_icon = document.getElementById('darkmode-icon');
const children = Array.from(document.getElementsByClassName('switchable-text'));

function enableDarkMode(on) {
    darkmode_icon.className = on ? 'far fa-moon switchable-text' : 'fas fa-moon switchable-text';
    document.body.style.backgroundColor = on ? 'var(--light-background)' : 'var(--dark-background)';
    children.forEach((item, i) => {
        item.style.color = on ? 'var(--light-text)' : 'var(--dark-text)';
    });
    darkmode = on;
}

function switchDarkMode() {
    if (!transitions) {
        document.body.style.transition = 'background-color linear 200ms';
        children.forEach((item, i) => {
            item.style.transition = 'color linear 200ms';
        });
        transitions = true;
    }
    enableDarkMode(!darkmode);
    window.localStorage.setItem('darkmode', darkmode);
}

function start() {
    enableDarkMode(window.localStorage.getItem('darkmode') == 'true');
    darkmode_button.addEventListener("click", switchDarkMode);
    window.setTimeout(function () {
        document.body.classList.remove('fade');
    }, 200);
}

document.addEventListener("DOMContentLoaded", start, false);