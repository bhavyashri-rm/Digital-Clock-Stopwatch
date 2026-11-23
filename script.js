
// DIGITAL CLOCK

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, "0");

    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;

    document.getElementById("period").textContent = period;

    document.getElementById("date").textContent =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

updateClock();
setInterval(updateClock, 1000);


// STOPWATCH

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let running = false;
let lapCount = 0;


function formatTime(milliseconds) {
    const totalMilliseconds = Math.floor(milliseconds);

    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const ms = Math.floor((totalMilliseconds % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(ms).padStart(2, "0")
    );
}


function getElapsedTime() {
    if (running) {
        return elapsedTime + (performance.now() - startTime);
    }

    return elapsedTime;
}

function updateStopwatch() {
    document.getElementById("stopwatch").textContent =
        formatTime(getElapsedTime());
}

// START BUTTON

document.getElementById("startBtn").addEventListener("click", function () {

    if (!running) {
        startTime = performance.now();
        running = true;

        timer = setInterval(updateStopwatch, 10);
    }
});


// PAUSE BUTTON

document.getElementById("pauseBtn").addEventListener("click", function () {

    if (running) {
        elapsedTime = getElapsedTime();

        clearInterval(timer);
        timer = null;
        running = false;

        updateStopwatch();
    }
});


// RESET BUTTON

document.getElementById("resetBtn").addEventListener("click", function () {

    clearInterval(timer);

    timer = null;
    elapsedTime = 0;
    startTime = 0;
    running = false;
    lapCount = 0;

    document.getElementById("stopwatch").textContent = "00:00:00";

    document.getElementById("lapsList").innerHTML =
        '<li class="empty">No laps recorded yet</li>';
});


// LAP BUTTON

document.getElementById("lapBtn").addEventListener("click", function () {

    if (running) {
        lapCount++;

        const currentTime = getElapsedTime();

        const lapItem = document.createElement("li");

        lapItem.textContent =
            "Lap " + lapCount + " — " + formatTime(currentTime);

        const lapsList = document.getElementById("lapsList");

        if (lapCount === 1) {
            lapsList.innerHTML = "";
        }

        lapsList.appendChild(lapItem);
    }
});

// INITIAL DISPLAY

document.getElementById("stopwatch").textContent = "00:00:00";
