/**
 * 
 *       game sounds
 * 
 **/
// Initialize Tone.js
Tone.start();

// globals

// Define the scale intervals
const mixolydianIntervals = [1, 2, 2, 1, 2, 2];
const naturalMinorScale = [2, 1, 2, 2, 1, 2];
const dorianScale = [2, 1, 2, 2, 2, 1];
const phrygianScale = [1, 2, 2, 2, 1, 2];
const aeolianScalePureMinor = [2, 1, 2, 2, 1, 2];
const doubleHarmonicIntervals = [1, 2, 3, 1, 2, 3];

const doubleHarmonicFrequencies = noteArray(432, doubleHarmonicIntervals);
const mixolydianFrequencies = noteArray(432, mixolydianIntervals);

// base frequency :: default 440
let baseFrequency = 440;
let baseScale = mixolydianIntervals;

// synth frequency
const synth = new Tone.Synth({
  envelope: {
    attack: 0.1,
    decay: 0.3,
    sustain: 0.5,
    release: 1,
  }
}).toDestination();

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

// creating note arrays, 
function noteArray(refFrequency, scaleIntervals) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const frequencies = [];

  for (const interval of scaleIntervals) {
    const noteIndex = (interval - 1) % 12; // Adjust for 0-based indexing
    const note = notes[noteIndex];
    const ratio = refFrequency / 440; // 440 Hz is the reference for A440
    const frequency = 440 * Math.pow(2, (noteIndex + 9) / 12) * ratio;
    frequencies.push({ note, frequency });
  }

  return frequencies;
}

/**
 * 
 *         POTENTIOMETER SCRIPT
 * 
 **/
function playValue(freq, step) {
  
  const noteValues = noteArray(freq, baseScale);
  let rawFreq = noteValues[rotationStep];
  let currentFreq = rawFreq.frequency;
  
  console.log(`106 :: function playValue\nnote values: ${noteValues}\nraw frequency: ${rawFreq}\ncurrent frequency: ${currentFreq}`);
  
  synth.triggerAttackRelease(currentFreq, 1);
  
  console.log(`frequency is: ${baseFrequency}\nstep value: ${rotationStep}\nfrequency value: ${currentFreq}`);
}
 
const freqOne = document.getElementById('switch-one');
const freqTwo = document.getElementById('switch-two');

freqOne.addEventListener('click', function() {
  
  // play sound
  baseFrequency = 440;
  let stepVal = updateStepDisplay();
  console.log(`base frequency: ${baseFrequency}\nstep value: ${stepVal}`);
  
  playValue(baseFrequency);
});
  
freqTwo.addEventListener('click', function() {
  baseFrequency = 432;
  playValue(baseFrequency);
});

// draw a canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stepDisplay = document.getElementById("step-display");
const frequencyDevice = document.getElementById("frequency-device");

const triangleSize = 50; // Size of the triangle
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

// draw our triangle shape 
function drawTriangle(angle) {

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

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
  
  return rotationStep;
}

function rotateTriangle(event) {
  const step = event.type === "mousemove" || event.type === "touchmove" ? 1 : 2;
  rotationStep += step;
  if (rotationStep > 12) {
    rotationStep = 1;
  }
  const angle = (rotationStep - 1) * (Math.PI / 6);
  drawTriangle(angle);
  updateStepDisplay();
}

canvas.addEventListener("mousemove", rotateTriangle);
canvas.addEventListener("touchstart", rotateTriangle);
canvas.addEventListener("touchmove", rotateTriangle);

function toggleFrequencyDevice() {
  isDeviceVisible = !isDeviceVisible;
  frequencyDevice.style.display = isDeviceVisible ? "block" : "none";

  if (isDeviceVisible) {
    setDefaultPosition();
    
    console.log('device is visible');
  } else if (!isDeviceVisible);
  
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