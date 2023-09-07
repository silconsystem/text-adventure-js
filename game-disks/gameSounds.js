/**
 * 
 *       game sounds
 * 
 **/
// Initialize Tone.js
Tone.start();

// frequency table
const frequencyLookUp440Hz = [
  { note: 'C2', frequency: 65.41 },
  { note: 'C#2', frequency: 69.30 },
  { note: 'D2', frequency: 73.42 },
  { note: 'D#2', frequency: 77.78 },
  { note: 'E2', frequency: 82.41 },
  { note: 'F2', frequency: 87.31 },
  { note: 'F#2', frequency: 92.50 },
  { note: 'G2', frequency: 98.00 },
  { note: 'G#2', frequency: 103.83 },
  { note: 'A2', frequency: 110.00 },
  { note: 'A#2', frequency: 116.54 },
  { note: 'B2', frequency: 123.47 },
  { note: 'C3', frequency: 130.81 },
  { note: 'C#3', frequency: 138.59 },
  { note: 'D3', frequency: 146.83 },
  { note: 'D#3', frequency: 155.56 },
  { note: 'E3', frequency: 164.81 },
  { note: 'F3', frequency: 174.61 },
  { note: 'F#3', frequency: 185.00 },
  { note: 'G3', frequency: 196.00 },
  { note: 'G#3', frequency: 207.65 },
  { note: 'A3', frequency: 220.00 },
  { note: 'A#3', frequency: 233.08 },
  { note: 'B3', frequency: 246.94 },
  { note: 'C4', frequency: 261.63 },
  { note: 'C#4', frequency: 277.18 },
  { note: 'D4', frequency: 293.66 },
  { note: 'D#4', frequency: 311.13 },
  { note: 'E4', frequency: 329.63 },
  { note: 'F4', frequency: 349.23 },
  { note: 'F#4', frequency: 369.99 },
  { note: 'G4', frequency: 392.00 },
  { note: 'G#4', frequency: 415.30 },
  { note: 'A4', frequency: 440.00 },
  { note: 'A#4', frequency: 466.16 },
  { note: 'B4', frequency: 493.88 },
  { note: 'C5', frequency: 523.25 }
];
const frequencyLookUp432Hz = [
  { note: 'C2', frequency: 64.50 },
  { note: 'C#2', frequency: 68.36 },
  { note: 'D2', frequency: 72.50 },
  { note: 'D#2', frequency: 76.82 },
  { note: 'E2', frequency: 81.41 },
  { note: 'F2', frequency: 86.27 },
  { note: 'F#2', frequency: 91.41 },
  { note: 'G2', frequency: 96.83 },
  { note: 'G#2', frequency: 102.55 },
  { note: 'A2', frequency: 108.56 },
  { note: 'A#2', frequency: 114.89 },
  { note: 'B2', frequency: 121.54 },
  { note: 'C3', frequency: 128.50 },
  { note: 'C#3', frequency: 136.72 },
  { note: 'D3', frequency: 145.00 },
  { note: 'D#3', frequency: 153.65 },
  { note: 'E3', frequency: 162.83 },
  { note: 'F3', frequency: 172.55 },
  { note: 'F#3', frequency: 182.83 },
  { note: 'G3', frequency: 193.67 },
  { note: 'G#3', frequency: 205.10 },
  { note: 'A3', frequency: 217.12 },
  { note: 'A#3', frequency: 229.79 },
  { note: 'B3', frequency: 243.08 },
  { note: 'C4', frequency: 256.99 },
  { note: 'C#4', frequency: 272.49 },
  { note: 'D4', frequency: 288.99 },
  { note: 'D#4', frequency: 306.79 },
  { note: 'E4', frequency: 325.66 },
  { note: 'F4', frequency: 345.11 },
  { note: 'F#4', frequency: 365.67 },
  { note: 'G4', frequency: 387.33 },
  { note: 'G#4', frequency: 410.21 },
  { note: 'A4', frequency: 432.00 },
  { note: 'A#4', frequency: 457.21 },
  { note: 'B4', frequency: 486.15 },
  { note: 'C5', frequency: 514.36 }
];

// lookup function
function findNoteByFrequency(frequencyValue, tuning) {
  
  const referenceArray = tuning === 432 ? frequencyLookUp432Hz :frequencyLookUp440Hz;
  
  let closestNote = referenceArray[0];
  let closestDifference = Math.abs(frequencyValue - closestNote.frequency);
  
  for (let i = 1; i < referenceArray.length; i++) {
    
    const currentNote = referenceArray[i];
    const currentDifference = Math.abs(frequencyValue - currentNote.frequency);
    
    if (currentDifference < closestDifference) {
      closestNote = currentNote;
      closestDifference = currentDifference;
    }
  }
  return closestNote.note;
}

// Define the scale intervals
const mixolydianIntervals = [1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2];
const naturalMinorScale = [2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2];
const dorianScale = [2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1];
const phrygianScale = [1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2];
const aeolianScalePureMinor = [2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2];

// base frequency :: default 440
let baseFrequency = 440;
let baseNote = 'A';
let baseInterval = phrygianScale;
/**
 *             TODO!!
// tone.js volume
const synthVolume = new Tone.Gain(0.5);
synthVolume.toDestination();
**/
const feedbackDLY = new Tone.FeedbackDelay("8n", 0.5);
const pingPong = new Tone.PingPongDelay("2n", 0.2);
const reverb = new Tone.Reverb(3);
const autowah = new Tone.AutoWah(80, 6, -10);
const phaser = new Tone.Phaser(30, 5, 1000);

// synth frequency
const synth = new Tone.DuoSynth({
  oscillator: {
     type: 'sawtooth',
  },
  envelope: {
    attack: 0.3,
    decay: 0.1,
    sustain: 0.5,
    release: 1,
  }
}).toDestination();

// attach effects
synth.connect(phaser);
phaser.connect(pingPong);
pingPong.toDestination();

/**
 * 
 *           PULSELOOP LOGIC   TONE.JS
 * 
**/
let isPlaying = false;

// sine synth 
const synthSine = new Tone.Synth({
  oscillator: {
     type: 'pulse',
  },
  envelope: {
    attack: 0.8,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
  }
}).toDestination();

synthSine.connect(feedbackDLY);
feedbackDLY.connect(reverb);
reverb.connect(autowah);
autowah.toDestination();

/**                  
 *                   TODO!!
const synthSineVolume = new Tone.Volume(-12).toDestination();

// connect audio volume control for synths
synth.connect(synthVolume);
synthSine.connect(synthSineVolume);

// set up slider control
const volumeSlider = document.getElementById('volumeSlider');

// handle event
volumeSlider.addEventListener('input', function() {
  
  // change gain from slider value
  synthSine.volume.value = parseFloat(volumeSlider.value);
});
**/
// set up loop
function startPulseLoop() {
  
  isPlaying = true;
  const pulseInterval = Tone.Time("1n");
  
  //set interval
   const pulseLoop = setInterval(() => {
     if(!isPlaying) {
       clearInterval(pulseLoop);
     } else {
       synthSine.triggerAttackRelease("C2", "2n");
     }
   },pulseInterval.toMilliseconds());
}

// stop loop
function stopPulseLoop() {
  isPlaying = false;
}

  
  

/**
 * 
 *               ********************
 * 
**/
function playAudio(url) {
  const audio = new Audio(url);

  audio.play();
}

function soundPlayer(playSample, freq = null) {

  if (playSample) {
    // Play a sample

    var buffer = new Tone.Buffer(playSample);
    var buff = buffer.get();

    console.log(`url: ${playSample}\nbuffered url: ${buffer}`);

    const audioPlayer = new Tone.Player({
      url: playSample,
      loop: false,
      autostart: true,
    }).toDestination();

    Tone.loaded().then(() => {
      audioPlayer.start();
    });


    console.log(`played sample from url: ${playSample}`);
  } else if (playSample === false) {

    // Play a frequency
    synth.triggerAttackRelease(freq, 1); // Play for 1 second

    console.log(`played frequency: ${freq}`);
  } else {

    console.error(`input: -- ${playSample} -- is not valid\n
                  freq: -- ${freq} -- is not valid`);
  }
}

function playSound() {

  //const slider = document.getElementById('frequencySlider');
  //const frequency = parseFloat(slider.value);

  soundPlayer(false, frequency); // Play a synth with the specified frequency
}

// create the frequencies based upon tuning, start note and interval
function noteArray(tuning, startNote, scaleInterval) {
  const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

  // Find the index of the starting note in the notes array
  const startIndex = notes.indexOf(startNote);
  
  console.log(`tuning: ${tuning}\nstart note: ${startNote}\ninterval: ${scaleInterval}`);

  if (startIndex === -1) {
    throw new Error('Invalid starting note');
  }

  // Initialize an array to store the rounded frequencies
  const frequencies = [];

  let currentIndex = startIndex;
  for (const interval of scaleInterval) {
    const noteIndex = currentIndex % notes.length;
    const frequency = Math.round(tuning * Math.pow(2, noteIndex / 12)); // Round to whole number
    frequencies.push(frequency);
    currentIndex += interval;
  }

  console.log(`126 noteArray function::\nFrequencies: ${frequencies}`);
  return frequencies;
}
/**
 * 
 *         POTENTIOMETER SCRIPT
 * 
 **/
// current note frequency played
let currentNoteFrequency = 0;

// 440 or 432 button
const freqOne = document.getElementById('switch-one');
const freqTwo = document.getElementById('switch-two');

// play notes from the array with given input
function playDeviceValues(hzVal, note, interval, step) {
  
  // set up the frequency corresponding with the step value 
 const freqArray = noteArray(hzVal, note, interval);
 // frequency display
 const deviceValues = document.getElementById('device-values');
 const displayFrq = document.getElementById('devFrq');
 const displayNts = document.getElementById('devNts');
 
 let freqToPlay = freqArray[step];
  
  synth.triggerAttackRelease(freqToPlay, 1);
  console.log(`150::playDeviceValues function:\nfreqToPlay: ${freqToPlay}\nstep: ${step}`);
  
  // set current note frequency variable for lookup
  currentNoteFrequency = freqToPlay;
  let foundNote = findNoteByFrequency(currentNoteFrequency, baseFrequency);
  
  console.log(`210::playDeviceValues function\ncurrent note frequency: ${currentNoteFrequency}`);
  
  displayFrq.innerHTML = `<p class="alienFont">${currentNoteFrequency}</p><p class="normalFont"> *** ${currentNoteFrequency}</p>`;
  displayNts.innerHTML = `<p class="alienFont">${foundNote}</p><p class="normalFont">  ${foundNote}</p>`;
  
  deviceValues.style.display = 'block';
  
  // set timeout for div to fade in/out
  setTimeout(() => {
    deviceValues.style.display = 'none';
  }, 2000);
  
  console.log(findNoteByFrequency(currentNoteFrequency, baseFrequency));
}

// event handles
freqOne.addEventListener('click', function() {
  
  baseFrequency = 440;
  
  playDeviceValues(baseFrequency, baseNote, baseInterval, rotationStep);
  
  console.log(`clicked 440 hz button\n${rotationStep}`);
});

freqTwo.addEventListener('click', function() {
  
  baseFrequency = 432;
  
  playDeviceValues(baseFrequency, baseNote, baseInterval, rotationStep);
  
  console.log('clicked 432 hz button');
});

// draw a canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stepDisplay = document.getElementById("step-display");
const frequencyDevice = document.getElementById("frequency-device");

let rotationStep = 1;
let isDeviceVisible = false;
let isDragging = false;
let offsetX, offsetY;

// set frequency device position
function setDefaultPosition() {

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const defaultX = (screenWidth - 150) / 2; // Center horizontally
  const defaultY = 20; // 20px from the top

  frequencyDevice.style.left = defaultX + "px";
  frequencyDevice.style.top = defaultY + "px";
}

function limitDraggableArea() {

  const maxWidth = 600;
  const maxHeight = 300;
  const currentX = parseFloat(frequencyDevice.style.left);
  const currentY = parseFloat(frequencyDevice.style.top);

  if (isNaN(currentX) || isNaN(currentY)) {
    return;
  }

  if (currentX < 0) {

    frequencyDevice.style.left = "0px";
  }

  if (currentX > maxWidth) {

    frequencyDevice.style.left = maxWidth + "px";
  }

  if (currentY < 0) {

    frequencyDevice.style.top = "0px";
  }

  if (currentY > maxHeight) {

    frequencyDevice.style.top = maxHeight + "px";
  }
}

let rotationAngle = 1;
const stepAngle = (Math.PI * 2) / 12;
// draw our triangle shape 
function drawTriangle() {

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centerX, centerY);
  //ctx.rotate(angle);
  ctx.rotate(rotationAngle);

  const image = new Image();
  image.src = "img/alien-angle.jpg";
  image.width = 120;
  image.height = 120;
  image.style.opacity = 0.5;

  ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);

  ctx.restore();
}

function updateStepDisplay() {
  
  stepDisplay.textContent = `Step: ${rotationStep}`;
}

function rotateTriangle(event) {
  const step = event.type === "mousemove" || event.type === "touchmove" ? 1 : 2;
  rotationStep += step;
  if (rotationStep > 12) {
    rotationStep = 1;
  }
  const angle = (Math.PI * 2) / 12;
  const rect = canvas.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;
 
  //const angle = Math.atan2(offsetX - canvas.height / 2, offsetY - canvas.width / 2);
  drawTriangle(angle);
  updateStepDisplay();
}


canvas.addEventListener("mousemove", rotateTriangle);
canvas.addEventListener("touchstart", rotateTriangle);
canvas.addEventListener("touchmove", rotateTriangle);
canvas.addEventListener("click", () => {
  rotationStep += 1;
  if (rotationStep >= 12) {
    rotationStep = 1;
  }
  
  rotationAngle += stepAngle;
  if (rotationAngle >= Math.PI * 2)  {
    rotationAngle = 0;
  }
  
  console.log(`rotation angle: ${rotationAngle}\nstep angle: ${stepAngle}\nrotation step: ${rotationStep}`);
  drawTriangle();
});

function toggleFrequencyDevice() {
  isDeviceVisible = !isDeviceVisible;
  frequencyDevice.style.display = isDeviceVisible ? "block" : "none";

  if (isDeviceVisible) {
    
    playAudio('sounds/bleep.wav');
    
    setDefaultPosition();
    
    startPulseLoop();
    console.log(`device visible: ${isDeviceVisible}`);
  }
  
  if (!isDeviceVisible) {
    
    playAudio('bleep.wav');
    
    stopPulseLoop();
    console.log(`device visible: ${isDeviceVisible}`);
  }
}

stepDisplay.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - frequencyDevice.getBoundingClientRect().left;
  offsetY = e.clientY - frequencyDevice.getBoundingClientRect().top;
});

stepDisplay.addEventListener("touchstart", (e) => {
  isDragging = true;
  offsetX = e.touches[0].clientX - frequencyDevice.getBoundingClientRect().left;
  offsetY = e.touches[0].clientY - frequencyDevice.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    frequencyDevice.style.left = x + "px";
    frequencyDevice.style.top = y + "px";
    limitDraggableArea();
  }
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    let x = e.touches[0].clientX - offsetX;
    let y = e.touches[0].clientY - offsetY;
    frequencyDevice.style.left = x + "px";
    frequencyDevice.style.top = y + "px";
    limitDraggableArea();
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

drawTriangle(0); // Initial drawing
updateStepDisplay();
/**
 * 
 *             FIND LOCK KEY FREQUENCIES
 * 
 **/
 // Create a variable to track whether a match has been found
 // Create a variable to store the timeout ID
let isMatchFound = false;
let matchCheckTimeout;

// Function to simulate getting the global frequency from your instrument (replace this with your actual function)
function getGlobalFrequency() {
  
  const currFreqGlobal = currentNoteFrequency;
  return currFreqGlobal;
}

// Function to check for a match
function checkForMatch(targetFreq) {
  // Get the current global frequency (you should update this with your instrument)
  const currFQ = getGlobalFrequency(); // Replace this with your actual function

  // Check if the current frequency matches the desired frequency
  if (Math.abs(currFQ - targetFreq) < 1) { // Adjust the threshold as needed
  
    
    
    clearTimeout(matchCheckTimeout); // Stop checking when a match is found
    isMatchFound = true;
  } else {
    
    // Continue checking if a match hasn't been found
    matchCheckTimeout = setTimeout(checkForMatch(targetFreq), 5000); // Adjust the interval as needed
  }
}


/**
**/             //****************//
/**
 * 
 *           
 * 
**/
// samples
const gameSounds = () => ({

  roomSounds: [
    {
      id: 'soft-wind',
      sndUrl: 'sounds/soft-wind.mp3',
    },
    {
      id: 'crackling',
      sndUrl: 'sounds/crackling.wav',
    },
  ],
  eventSounds: [
    {
      id: 'clink',
      sndUrl: 'sounds/clink.wav',
    },
    {
      id: 'axeswing',
      sndUrl: 'sounds/axeswing.mp3',
    },
  ],
  battleSounds: [
    {
      id: 'smack',
      sndUrl: 'sounds/smack.wav',
    },
    {
      id: 'swords',
      sndUrl: 'sound/sword-hit.wav',
    },
  ],
  frequencies: [
    {
      id: 'c4',
      frequency: 256,
      },
    {
      id: 'g2',
      frequency: 96,
      },
    {
      id: 'c2',
      frequency: 48,
      },
    {
      id: 'g1',
      frequency: 32,
      },
  ],
});

// check if page loaded
console.log(gameSounds().roomSounds[0].sndUrl);

console.log('loaded gameSounds.js');