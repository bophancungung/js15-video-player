const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
// player-speed element???
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

// On video end, show play button icon
video.addEventListener('ended', showPlayIcon(true));


// Progress Bar ---------------------------------- //



// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);