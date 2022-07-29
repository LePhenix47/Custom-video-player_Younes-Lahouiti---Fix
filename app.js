/*
Part 1
//Play-Pause video button toggler
*/
const video = document.querySelector(".main__video");
const playButton = document.querySelector(".video-controls__resume-button");

const pauseButton = document.querySelector(".video-controls__pause-button");

function playVideo() {
  if (video.paused) {
    video.play();
    playButton.classList.replace("show", "hide");
    pauseButton.classList.replace("hide", "show");
  } else {
    video.pause();
    playButton.classList.replace("hide", "show");
    pauseButton.classList.replace("show", "hide");
  }
}

video.addEventListener("click", playVideo);
playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", playVideo);

/* 
Part 2
//Timer + timestamp progession bar & time
*/
//a) Video timer
const timeDisplay = document.querySelector(".video-controls__video-timestamp");
const progressBar = document.querySelector(
  ".video-controls__video-timestamp-bar-progress"
);

function fillVideoDuration() {
  let currentVideoTimePassed = video.currentTime;
  let totalDuration = video.duration;
  formatValue(currentVideoTimePassed, totalDuration, timeDisplay);
}

function formatValue(currentValue, totalValue, element) {
  //Computes the amount of minutes and seconds
  let currentMinutes = Math.trunc(currentValue / 60);
  let currentSeconds = Math.trunc(currentValue % 60);

  let totalMinutes = Math.trunc(totalValue / 60);
  let totalSeconds = Math.trunc(totalValue % 60);
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  if (totalMinutes < 10) {
    totalMinutes = `0${totalMinutes}`;
  }

  element.textContent = `${currentMinutes}:${currentSeconds} / ${totalMinutes}:${totalSeconds}`;

  let progressTimePosition = (currentValue * 100) / totalValue;
  progressBar.style.transform = `scaleX(${progressTimePosition}%)`;

  if (video.ended) {
    console.log(video);
    playButton.classList.replace("hide", "show");
    pauseButton.classList.replace("show", "hide");
  }
}

video.addEventListener("loadeddata", fillVideoDuration);
window.addEventListener("load", fillVideoDuration);
/*
Must add the line of code above because of a bug when loading the video, but why?
Because the video loads FASTER than the script and it could potentially lead to some visual bugs in the timestamp (0:00/0:00)
*/

video.addEventListener("timeupdate", fillVideoDuration);

/*
Part 3 Muting/Unmuting button + volume range input + volume range input
*/
//a) Muting/Unmuting button

const muteButton = document.querySelector(".video-controls__mute-button");
const volumeButton = document.querySelector(".video-controls__volume-button");

function handleMute() {
  console.log("click");

  if (video.muted) {
    video.muted = false;
    volumeButton.classList.replace("hide", "show");
    muteButton.classList.replace("show", "hide");
  } else {
    video.muted = true;
    volumeButton.classList.replace("show", "hide");
    muteButton.classList.replace("hide", "show");
  }
}

muteButton.addEventListener("click", handleMute);
volumeButton.addEventListener("click", handleMute);

//b) Volume slider

const volumeSlider = document.querySelector(".video-controls__volume-bar");

function volumeChanger() {
  video.volume = volumeSlider.value / 100;
  if (video.volume === 0) {
    volumeButton.classList.replace("show", "hide");
    muteButton.classList.replace("hide", "show");
  } else {
    volumeButton.classList.replace("hide", "show");
    muteButton.classList.replace("show", "hide");
  }
}

volumeSlider.addEventListener("input", volumeChanger);

/* 
Part 4 Video progressbar navigation dragger
*/
const videoProgessBar = document.querySelector(
  ".video-controls__video-timestamp-bar"
);

let positionAndDimensionsOfBar = videoProgessBar.getBoundingClientRect(); //Gives the DOMRect
let widthOfBar = positionAndDimensionsOfBar.width;

function resizeBar() {
  positionAndDimensionsOfBar = videoProgessBar.getBoundingClientRect();
  widthOfBar = positionAndDimensionsOfBar.width;
}
//We need to remind to give new values to the progress bar when resizing the window
window.addEventListener("resize", resizeBar);

//So e.clientX is the coordinate of the X axis form the left extremity of the page to the mouse of the client
//And the PaDoB.left is the coordinate of the X from the left extremity of the page to the bar element
//X then is the coordinate between wherever the mouse was clicked and the progress bar, it gives the position of the progress bar on the X coordinate
function navigationDragger(e) {
  const x = e.clientX - positionAndDimensionsOfBar.left;
  const barWidthPercentage = x / widthOfBar;

  video.currentTime = video.duration * barWidthPercentage;
}

videoProgessBar.addEventListener("click", navigationDragger);

/*
Part 5
Fullscreen mode
*/
const fullscreenButton = document.querySelector(
  ".video-controls__fullscreen-button"
);

const exitFullscreenButton = document.querySelector(
  ".video-controls__compress-button"
);

const videoContainer = document.querySelector(".main__video");

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

video.addEventListener("dblclick", toggleFullscreen);
fullscreenButton.addEventListener("click", toggleFullscreen);
exitFullscreenButton.addEventListener("click", toggleFullscreen);
