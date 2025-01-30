// Stopwatch variables
let startTime = 0;
let updatedTime = 0;
let difference = 0;
let running = false;
let interval;
let lapCount = 0;
let laps = [];

// DOM Elements
const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

// Format time to mm:ss:SS
function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0').slice(0, 2);
  return `${minutes}:${seconds}:${milliseconds}`;
}

// Update the stopwatch
function updateTime() {
  if (running) {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeDisplay.innerHTML = formatTime(difference);
  }
}

// Start or resume the stopwatch
function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime() - difference; // resume from last time
    interval = setInterval(updateTime, 10); // Update every 10ms
    running = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
}

// Pause the stopwatch
function pauseStopwatch() {
  clearInterval(interval);
  running = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(interval);
  running = false;
  difference = 0;
  timeDisplay.innerHTML = "00:00:00";
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
  laps = [];
  lapList.innerHTML = '';
}

// Record lap time
function recordLap() {
  lapCount++;
  const lapTime = formatTime(difference);
  laps.push(lapTime);
  
  // Display lap in the list
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapList.appendChild(li);
}

// Event listeners for buttons
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
