/**
 * 
 *       game sounds
 * 
 **/
// Initialize Tone.js
Tone.start();

// globals


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

// tone.js volume
const volume = new Tone.Gain(0.5);
volume.toDestination();

// synth frequency
const synth = new Tone.Synth({
  oscillator: {
     type: 'sine'
  },
  envelope: {
    attack: 0.3,
    decay: 0.1,
    sustain: 0.5,
    release: 1,
  }
}).toDestination();

synth.connect(volume);
/**
 * 
 *           PULSELOOP LOGIC   TONE.JS
 * 
**/
let isPlaying = false;

// sine synth 
const synthSine = new Tone.Synth({
  oscillator: {
     type: 'sine',
  },
  envelope: {
    attack: 0.1,
    decay: 0.3,
    sustain: 0.5,
    release: 1,
  }
}).toDestination();
// set up loop
function startPulseLoop() {
  
  isPlaying = true;
  const pulseInterval = Tone.Time("4n");
  
  //set interval
   const pulseLoop = setInterval(() => {
     if(!isPlaying) {
       clearInterval(pulseLoop);
     } else {
       synthSine.triggerAttackRelease("C2", "8n");
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
const freqOne = document.getElementById('switch-one');
const freqTwo = document.getElementById('switch-two');

// play notes from the array with given input
function playDeviceValues(hzVal, note, interval, step) {
  
  // set up the frequency corresponding with the step value 
 const freqArray = noteArray(hzVal, note, interval);
 
 let freqToPlay = freqArray[step];
  
  synth.triggerAttackRelease(freqToPlay, 1);
  console.log(`150::playDeviceValues function:\nfreqToPlay: ${freqToPlay}\nstep: ${step}`);
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
    setDefaultPosition();
    
    stopPulseLoop();
    console.log('device is visible');
  } else if (!isDeviceVisible);
    
    startPulseLoop();
    console.log('device is not visible');
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

console.log('loaded gameSounds.js');console.log('loaded gameSounds.js');
