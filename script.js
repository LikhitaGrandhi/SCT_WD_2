let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function formatTime(time) {
    let ms = time % 1000;
    let sec = Math.floor(time / 1000) % 60;
    let min = Math.floor(time / (1000 * 60)) % 60;
    let hr = Math.floor(time / (1000 * 60 * 60));

    return (
        String(hr).padStart(2, "0") + ":" +
        String(min).padStart(2, "0") + ":" +
        String(sec).padStart(2, "0") + ":" +
        String(ms).padStart(3, "0")
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);

        running = true;
    }
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(timerInterval);
    running = false;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
    if (running) {
        const lap = document.createElement("li");
        lap.textContent = `Lap ${lapList.children.length + 1}: ${formatTime(elapsedTime)}`;
        lapList.prepend(lap);
    }
});

updateDisplay();