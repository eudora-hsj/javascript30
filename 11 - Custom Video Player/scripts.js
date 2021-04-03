// get elements 
const player        = document.querySelector('.player');
const video         = player.querySelector('.viewer');
const palyBtn       = player.querySelector('.toggle');
const skipButtons   = player.querySelectorAll('.skip');
const progress      = player.querySelector('.progress');
const progressBar   = player.querySelector('.progress__filled');
const ranges        = player.querySelectorAll('.player__slider');

// - play & pause
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method](); 
}

function togglePlayBtn() {
    const icon = this.paused ? '►' : '❚ ❚';
    palyBtn.textContent = icon;
}

palyBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('play', togglePlayBtn)
video.addEventListener('pause', togglePlayBtn)

// - skip
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);  
}

skipButtons.forEach(skipBtn => 
    skipBtn.addEventListener('click', skip)    
)

// - range 
function rangeUpdateHandler() {
    video[this.name] = this.value;   // volume / playbackRate
}

ranges.forEach(range => range.addEventListener('change', rangeUpdateHandler));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdateHandler));

// - progress
function progressHandler(){
    const percent= (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', progressHandler)

// - scrub
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

let isMousedown = false;
progress.addEventListener('mousedown', () => isMousedown = true);
progress.addEventListener('mouseup', () => isMousedown = false);
progress.addEventListener('mousemove', (e) => isMousedown && scrub(e));
progress.addEventListener('click', scrub);
