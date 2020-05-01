
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
// for buttons
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
    // clear any exsisting timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    // console.log({now, then});
    displayTimeLeft(seconds); // run it immediately once the function starts.
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display the time
        // console.log(secondsLeft);
        displayTimeLeft(secondsLeft); // run it everytime we tick down on the time.
    }, 1000)
};

function displayTimeLeft(seconds) {
    // console.log(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display; // set the tab title to the display time. 
    timerDisplay.textContent = display;
    // console.log({ minutes, remainderSeconds });
};

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
};

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    // console.log(seconds);
    timer(seconds);
}


buttons.forEach(button => button.addEventListener('click', startTimer));
