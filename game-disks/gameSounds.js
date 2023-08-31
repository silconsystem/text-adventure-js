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
const phrygianScale = [1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2];
const aeolianScalePureMinor = [2, 1, 2, 2, 1, 2];
const doubleHarmonicIntervals = [1, 2, 3, 1, 2, 3];

const doubleHarmonicFrequencies = noteArray(432, doubleHarmonicIntervals);
const mixolydianFrequencies = noteArray(432, mixolydianIntervals);

// base frequency :: default 440
let baseFrequency = 440;
let baseScale = mixolydianIntervals;

// synth frequency
const synth = new Tone.Synth({
  oscillator: {
     type: 'square'
  },
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
const freqOne = document.getElementById('switch-one');
const freqTwo = document.getElementById('switch-two');
const octaveC1A440 = [
    33, // C1
    35, // C#1 / Db1
    37, // D1
    39, // D#1 / Eb1
    41, // E1
    44, // F1
    46, // F#1 / Gb1
    49, // G1
    52, // G#1 / Ab1
    55, // A1
    58, // A#1 / Bb1
    62  // B1
];
const octaveC1A432 = [
    32, // C1
    34, // C#1 / Db1
    36, // D1
    38, // D#1 / Eb1
    40, // E1
    43, // F1
    45, // F#1 / Gb1
    48, // G1
    51, // G#1 / Ab1
    54, // A1
    57, // A#1 / Bb1
    61  // B1
];
// play notes from the array with given input
function playDeviceValues(hzVal, step) {
  
  // set up the frequency corresponding with the step value 
 let freqToPlay;
  
  if (hzVal === 440)  {
    freqToPlay = octaveC1A440[step];
  } else if (hzVal === 432) {
    freqToPlay = octaveC1A432[step];
  }
  
  synth.triggerAttackRelease(freqToPlay, 1);
  console.log(freqToPlay, step);
}

// event handles
freqOne.addEventListener('click', function() {
  
  playDeviceValues(440, rotationStep);
  
  console.log(`clicked 440 hz button\n${rotationStep}`);
});

freqTwo.addEventListener('click', function() {
  
  playDeviceValues(432, rotationStep);
  
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
/**
function rotateTriangle(event) {
  const step = event.type === "mousemove" || event.type === "touchmove" ? 1 : 2;
  rotationStep += step;
  if (rotationStep > 12) {
    rotationStep = 1;
  }
  const angle = (Math.PI * 2) / 12;
  //const rect = canvas.getBoundingClientRect();
  //offsetX = event.clientX - rect.left;
  //offsetY = event.clientY - rect.top;
 
  //const angle = Math.atan2(offsetX - canvas.height / 2, offsetY - canvas.width / 2);
  drawTriangle(angle);
  updateStepDisplay();
}
**/

//canvas.addEventListener("mousemove", rotateTriangle);
//canvas.addEventListener("touchstart", rotateTriangle);
//canvas.addEventListener("touchmove", rotateTriangle);
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