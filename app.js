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
    changeElement(playButton, pauseButton);
  } else {
    video.pause();
    changeElement(pauseButton, playButton);
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
    changeElement(pauseButton, playButton);
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
  if (video.muted) {
    video.muted = false;
    changeElement(muteButton, volumeButton);
  } else {
    video.muted = true;
    changeElement(volumeButton, muteButton);
  }
}

muteButton.addEventListener("click", handleMute);
volumeButton.addEventListener("click", handleMute);

//b) Volume slider

const volumeSlider = document.querySelector(".video-controls__volume-bar");

function volumeChanger() {
  video.volume = volumeSlider.value / 100;
  if (video.volume === 0) {
    changeElement(volumeButton, muteButton);
    video.muted = true;
  } else {
    video.muted = false;
    changeElement(muteButton, volumeButton);
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

const videoContainer = document.querySelector(".main__video-container");

const enterFullscreenButton = document.querySelector(
  ".video-controls__enter-fullscreen-button"
);

const exitFullscreenButton = document.querySelector(
  ".video-controls__exit-fullscreen-button"
);

//In order to enter on fullscreen you must use either the document or the container that contains the video
function enterFullscreenOnClick() {
  if (videoContainer.requestFullScreen) {
    videoContainer.requestFullscreen();
    changeElement(enterFullscreenButton, exitFullscreenButton);
  } else {
    videoContainer.webkitRequestFullScreen();
    changeElement(enterFullscreenButton, exitFullscreenButton);
  }
}

video.addEventListener("dblclick", enterFullscreenOnClick);
enterFullscreenButton.addEventListener("click", enterFullscreenOnClick);
exitFullscreenButton.addEventListener("click", exitFullscreenOnClick);

//In order to exit you must use the document itself
function exitFullscreenOnClick(e) {
  console.log("click");
  console.log(e);

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  changeElement(exitFullscreenButton, enterFullscreenButton);
}

function changeElement(elementToBeHidden, elementToBeShown) {
  elementToBeHidden.classList.replace("show", "hide");
  elementToBeShown.classList.replace("hide", "show");
}
