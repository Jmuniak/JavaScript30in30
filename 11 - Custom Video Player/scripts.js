/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const fullscreen = document.getElementById('fullscreen');


/* Build out functions */
function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
    // if(video.paused) {
    //     video.play();
    // }
    // else {
    //     video.pause();
    // };
};

function updateButton() {
    // console.log("update the play/pause button");
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
};

function skip() {
    // console.log(this.dataset);
    // parseFloat converts this.dataset.skip into a 'true number'
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
    // console.log(this.name);
    // console.log(this.value);
    video[this.name] = this.value;
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};



/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
// listen to the video to see if it is playing or pause and then update the button.
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); // there is also an event called progress that can work here
toggle.addEventListener('play', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub); // there is also an event called progress that can work here
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // checks for mousedown true/false and only runs scrub if true. Need to pass the event in the arrow function to use it in scrub().
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


// Fullscreen mode
document.addEventListener('click', (e) => {
    // Ignore clicks that weren't on the toggle button
    if (!e.target.hasAttribute('data-toggle-fullscreen')) return;
    // If there's an element in fullscreen, exit
    // Otherwise, enter it
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}, false);
