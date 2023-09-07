// utilities for puzzle logic
const locks = [];

// lock mechanism keys
const portalLocked = true;

let lockedA = true;
let lockedB = true;
let lockedC = true;
let lockedD = true;

// lock names
const greenLockStr = 'green-lock';
const orangeLockStr = 'orange-lock';
const violetLockStr = 'violet-lock';
const yellowLockStr = 'yellow-lock';

// remove locks from array
function removeFromArray(targetArray, targetItem) {

  const array = targetArray;
  const removeItem = targetItem;

  const index = array.indexOf(removeItem);

  if (index !== -1) {

    array.splice(index, 1);

    console.log(`removed item: ${removeItem} from array: ${array}`);
    return true;
  }
  console.log(`bad input:\narray: ${targetArray}\nitem to remove: ${targetItem}`);
  return false;
}

// test if item doesn't exist in array
function checkLocks(item, array) {

  return item !== undefined && !array.incuded(item);
}

// count down 1 hour
function countdownOneHour() {
  // Set the initial time to 1 hour (3600 seconds)
  let timeInMilliSeconds = 3600000;

  // display digits
  const clockDigits = document.getElementById('digits');

  const intervalId = setInterval(() => {
    // Calculate hours, minutes, seconds, and milliseconds
    const hours = Math.floor(timeInMilliSeconds / 3600000);
    const minutes = Math.floor((timeInMilliSeconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliSeconds % 60000) / 1000);
    const milliseconds = (timeInMilliSeconds % 1000).toString().padStart(3, '0').slice(0, 2); // We're not counting milliseconds in this example

    // Display the time in the desired format
    clockDigits.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;

    // Decrement the time by 1 second
    timeInMilliSeconds--;

    // Check if the countdown has reached zero
    if (timeInMilliSeconds < 0) {
      clearInterval(intervalId);
      clockDigits.textContent = "Countdown complete!";
    }
  }, 1); // Update every 1000 milliseconds (1 second)
}

// Function to create and animate an image
function createAndAnimateImage() {
  const container = document.getElementById('imageContainer');
  const image = new Image();
  image.src = 'img/item/axe.png';
  image.className = 'animatedImage';

  container.appendChild(image);

  image.addEventListener('animationiteration', () => {
    // This event is triggered when the animation completes one iteration
    container.removeChild(image); // Remove the image element
    setTimeout(createAndAnimateImage, 1000); // Add a delay before creating the next image
  });
}

//const toggleButton global 
let isImageVisible = false;
// toggle dialogue image
function toggleDialogImg(dialogName) {

  const defaultImg = {
    characterImg: 'img/character/playerImage.png',
    name: 'player placeholder',
  }
  let charImgUrl;
  let imageHTML 

  if (!dialogName) {

    charImgUrl = defaultImg;

    console.log(`no name given, using default image: ${defaultImg.name}`);
  } else if (dialogName) {
    
    charImgUrl = getCharacter(dialogName);
    imageHTML = `<img src="${charImgUrl.characterImg}" alt="${charImgUrl.name}">`;
  }
 
  

  const dialogBox = document.querySelector('.dialog-box');
  const charImgFx = document.querySelector('.character-image');

  charImgFx.innerHTML = imageHTML;

  if (dialogBox.style.display === 'block') {
    dialogBox.style.display = 'none';

    charImgFx.classList.remove('fade-in');
    charImgFx.classList.add('fade-out');
  } else {
    dialogBox.style.display = 'block';

    charImgFx.classList.remove('fade-out');
    charImgFx.classList.add('fade-in');
  }
  
  console.log(`loaded var: ${dialogName}\nurl: ${charImgUrl.characterImg}\nalt text; ${charImgUrl.name}`);
}

// toggle switch function
function showCharacterImg(target) {

  if (!isImageVisible) {

    isImageVisible = true;

    toggleDialogImg(target.name[0]);
    setTimeout(() => {

      // show image 
      toggleDialogImg(target.name[0]);
    }, 3000);
  } else {

    isImageVisible = false;

    toggleDialogImg(target.name[0]);
    setTimeout(() => {

      toggleDialogImg(target.name[0]);

    }, 3000);
  }
}
// †*********"*"""""""”*"""""""""""""""""""""“‡"""""""""
console.log('loaded puzzle-utils.js');

// get a list of global variables and their values
/**
function getAllGlobalVariables() {
  
  const globalVars = {};
  
  for (const key in window) {
    if (window.hasOwnProperty(key)) {
      globalVars[key] = window[key];
    }
  }
  return globalVars;
}
**/