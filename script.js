const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.getElementById('fullscreen-btn');

// Play & Pause ----------------------------------- //
function showPlayIcon(isPlaying) {
  if (isPlaying) {
    playBtn.setAttribute('title', 'Pause');
    playBtn.classList.replace('fa-play', 'fa-pause');
  } else {
    playBtn.setAttribute('title', 'Play');
    playBtn.classList.replace('fa-pause', 'fa-play');
  }
}

function togglePlay() {
  if (video.paused) {
    video.play();
    showPlayIcon(true);
  } else {
    video.pause();
    showPlayIcon(false);
  }
}


// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(duration) {
  const minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${video.currentTime / video.duration * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} / `;
  duration.textContent = displayTime(video.duration);
}

function setProgress(e) {
  newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //
let lastVolume = 1;

// Change volume icon
function changeVolumeIcon(volume) {
  volumeIcon.className = '';
  volumeIcon.setAttribute('title', 'Mute');
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
    volumeIcon.setAttribute('title', 'Unmute');
  }
}
// Volume bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  volume < 0.1 ? volume = 0 : volume;
  volume > 0.9 ? volume = 1 : volume;
  video.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  // Change volume icon
  changeVolumeIcon(volume);
  lastVolume = volume;
}

// Mute or Unmute
function toggleMute() {
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
  changeVolumeIcon(video.volume);
}


// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
    fullscreen = true;
  } else {
    closeFullscreen();
    fullscreen = false;
  }
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
// On video end, show play button icon
video.addEventListener('ended', () => {showPlayIcon(false)});
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);