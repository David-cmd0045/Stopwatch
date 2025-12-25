let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedCentiseconds = String(centiseconds).padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
}

function updateDisplay() {
    const time = Date.now() - startTime;
    display.textContent = formatTime(time);
}

function start() {
    if (isRunning) return;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10); // Update frequently for milliseconds
    
    isRunning = true;
}

function stop() {
    clearInterval(timerInterval);
    isRunning = false;
}

function reset() {
    stop();
    elapsedTime = 0;
    display.textContent = "00:00:00.00";
}

// Theme toggle logic
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let darkMode = false;
    themeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        if (darkMode) {
            body.classList.add('dark-theme');
            themeToggle.textContent = 'Light Mode';
        } else {
            body.classList.remove('dark-theme');
            themeToggle.textContent = 'Dark Mode';
        }
    });
});

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

// Initialize display
display.textContent = "00:00:00.00";
