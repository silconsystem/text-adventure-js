/**
 * 
 *       game sounds
 * 
**/
// Initialize Tone.js
Tone.start();

// synth frequency
const synth = new Tone.Synth({
  envelope: {
    attack: 0.1,
    decay: 0.3,
    sustain: 0.5,
    release: 1,
  }
}).toDestination();

function soundPlayer(input, playSample) {
  
  if (playSample) {
    // Play a sample
    const player = new Tone.Player(input).toDestination();
    player.start();
  } else {
    
    // Play a frequency
    synth.triggerAttackRelease(input, 1); // Play for 1 second
  }
}

function playSound() {
  
  const slider = document.getElementById('frequencySlider');
  const frequency = parseFloat(slider.value);

  soundPlayer(frequency, false); // Play a synth with the specified frequency
}

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
console.log('loaded gameSounds.js');