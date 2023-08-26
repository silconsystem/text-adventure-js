/** 
    myscripts.js
    
    additional functions and utilities
    for graphics and other gameplay mechanics
    
**/
console.log('loaded myscripts.js');

// reference the image display element
let roomImageElement = document.querySelector('#image');

// get the img URL from the object and display
// in html element
function displayImageByRoomId(imageURL) {

  const roomImg = imageURL;
  
  // check if room and image URL are valid
  if (roomImg) {
    
    if (roomImageElement) {
      
      const image = new Image();
      image.src = roomImg;
      image.width = 300;
      image.height = 200;
      
      image.onload = () => {
        
        // clear previous content
        roomImageElement.innerHTML = '';
        
        // append image to element
        roomImageElement.appendChild(image);
      };
      
      image.onerror = () => {
        
        console.error('invalid image url');
      };
    }
  }
}

// inventory button visibility handle
function toggleVisibility(attr, target, style) {
    
  console.log(attr, target, style);
  
  if (attr === "class") {
  
    var divId = document.getElementsByClassName(target);
    
    console.log(divId);
  } else if (attr === "id"){
  
    var divId = document.getElementById(target);
    
    console.log(divId);
  } else {
    console.error('attribute name not valid');
  }
  
  divId.style.display = style;
  
  console.log(attr, style, divId);  
}

// inventory browser
const inventoryContainer = document.getElementById('inventory');
const prevButton = document.getElementById('button-up');
const nextButton = document.getElementById('button-down');
let currentPage = 0;
const itemsPerPage = 4;


function updateInventoryPage() {
  const items = disk.inventory.filter(item => !item.isHidden);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  inventoryContainer.innerHTML = '';
  for (let i = startIndex; i < endIndex && i < items.length; i++) {
    const item = items[i];
    const itemElement = document.createElement('div');
    itemElement.innerHTML = `<img id="item-icon" class="child::first-child" src="${getItem(item.name).imgUrl}"><span>${item.name}</span><br>`;
    inventoryContainer.appendChild(itemElement);
  }

  prevButton.disabled = currentPage === 0;
  nextButton.disabled = endIndex >= items.length;
}

prevButton.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateInventoryPage();
  }
});

nextButton.addEventListener('click', () => {
  const items = disk.inventory.filter(item => !item.isHidden);
  const startIndex = (currentPage + 1) * itemsPerPage;
  if (startIndex < items.length) {
    currentPage++;
    updateInventoryPage();
  }
});

// coin toss
function coinToss() {
  
  const randomNumber = Math.floor(Math.random() * 2);
  
  if (randomNumber === 0) {
    
    return "heads";
  } else {
    
    return "tails";
  }
}

// DICE GAME
function simulateDiceRoll() {
  return Math.ceil(Math.random() * 6); // Simulate a dice roll (1-6).
}

function applyBonusOrPenalty() {
  
  // generate random number between -5 and 5
  const randomModifier = Math.floor(Math.random() * 11) - 5;
  return randomModifier;
}

// play dice game    
function playGame(playerHealth, enemyHealth, turns, name) {

  // Initialize the game object with provided values.
  let player = getCharacter('player');
  let enemy = getCharacter(name);
  player.health = playerHealth;
  enemy.health = enemyHealth;
  enemy.turns = turns;
  
  let battle = gameStrings().battle;
  let battleStrings;
  
  let attackResponses = [];
  let battleResponses = [];
  let modifierPositive = [];
  let modifierNegative = [];
  
  for (var i = 0; i < battle.length; i++) {
    
    if (enemy.name === battle[i].name) {
      
      attackResponses = battle[i].enemyResponse;
      battleResponses = battle[i].playerResponse;
      modifierPositive = battle[i].modifierPositive;
      modifierNegative = battle[i].modifierNegative;
      
      console.log('attackResponses: ' + attackResponses,
                  'battleResponses: ' + battleResponses,
                  'modifierPositive: ' +  modifierPositive,
                  'modifierNegative: ' + modifierNegative);
    } else {
      
      console.log('bad object data or broken code');
    }
  }

  // random battlecry
  println(attackResponses[Math.floor(Math.random() * attackResponses.length)]);
            
  console.log(player.name, enemy.name);

  for (let turn = 1; turn <= turns; turn++) {
     
    // Player's turn
    const playerRoll = simulateDiceRoll();
    println(`${player.name} rolls a ${playerRoll}`);
    println(`${attackResponses[turn - 1]}`);
    healthHandle(enemy.name, playerRoll, false);
    
    // add random penalty or bonus
    const playerModifier = applyBonusOrPenalty();
    healthHandle(player.name, playerModifier, true);
    
    if (playerModifier > 0) {
      println(`${modifierPositive[turn - 1]}, added ${playerModifier} points`);
    } else if (playerModifier < 0) {
      println(`${modifierNegative[turn - 1]} subtracted ${playerModifier} points`);
    } else if (playerModifier === 0) {
      println(`${playerModifier} points: MISSED !!!`);
    }

    // Enemy's turn
    const enemyRoll = simulateDiceRoll();
    println(`Enemy rolls a ${enemyRoll}`);
    println(`${battleResponses[turn - 1]}`);
    healthHandle(player.name, enemyRoll, false);
        
    
    // add random penalty or bonus
    const enemyModifier = applyBonusOrPenalty();
    healthHandle(enemy.name, enemyModifier, true);               
    
    if (enemyModifier > 0) {
      println(`${modifierPositive[turn - 1]}, added ${enemyModifier} points`);
    } else if (playerModifier < 0) {
      println(`${modifierNegative[turn - 1]} subtracted ${enemyModifier} points`);
    } else if (playerModifier === 0) {
      println(`${enemyModifier} points: MISSED !!!`);
    }
        
    println(`Turn ${turn} - ${player.name} Health: ${player.health}, Enemy Health: ${enemy.health}`);    
  }
  if (player.health > enemy.health) {
    
    enemy.beaten = true;
    
    println(`${enemy.name} is defeated`);
    
    return "won";
  } else if (player.health < enemy.health) {
    
    player.alive = true;
    
    return "loss";
  } else if (player.health <= 0) {
    
    player.alive = false;
    
    println(`${enemy.name} has defeated you`);
    println(`better LOAD and try again`);
    
    return "game_over";
  }
}

// change image url
function reloadImage(div, imgurl) {
  
  // get image containers element
  var divId = document.getElementById(div);
  
  // new image element
  var newImage = new Image();
  
  // change the src
  newImage.src = imgurl;
  newImage.width = 300;
  newImage.height = 200;
  
  // replace image
  newImage.onload = function() {
    divId.parentNode.replaceChild(newImage, divId);
  } 
}

// add items to a room
function createNewItem(itemname, name, imgUrl, description, take) {
  
  // get the room
  const item = getItem(itemname);
  
  console.log(`createNewItem: item name: ${item.name}`);
  
  if (item) {
    // create new item with given variables
    item.name = name;
    item.imgUrl = imgUrl;
    item.desc = description;
    item.isTakeable = take;
    
    console.log('item exists');
  } 
 
  console.log(``);
}

// update the player healthbar
function updateHealthBar() {
 
  const player = getCharacter('player');
  const healthBar = document.getElementById('healthbar');
  const healthValue = document.getElementById('healthvalue');
    
    // keep health update capped at 100
    player.health = Math.min(Math.max(player.health, 0), 100);
    
    // handle health range
    if (player.health <= 25) {
    
      healthBar.style.backgroundColor = 'red';
    }else if (player.health <= 50) {
    
      healthBar.style.backgroundColor = 'orange';      
    } else if (player.health <= 75) {

      healthBar.style.backgroundColor = 'yellow';      
    } else {
      
      healthBar.style.backgroundColor = 'green';
    }
 
    healthBar.style.width = `${player.health}%`;
    healthValue.textContent = player.health;
}

// handle player health value change
function healthHandle(charName, newvalue, add) {

  // example healthHandle('player', 40, true)
  // get character
  const character = getCharacter(charName);
  
  console.log(`character: ${character.name}`);
  
  // check if valid
  if (typeof character.health !== 'number') {
    console.error('invalid input, only input numerical values');
    return;
  }
  
  character.health = Math.min(100, Math.max(0, add ? character.health +  newvalue : character.health - newvalue));
 
  // console info
  if (add === true) {
  
    console.log(`added: ${newvalue} to: ${character.name}, ${character.name} health is: ${character.health}`);
  } else {
  
    console.log(`subtracted: ${newvalue} from: ${character.name}, ${character.name} health is: ${character.health}`);
  } 
  
  if (charName === 'player') {
  
    updateHealthBar();
    
    console.log(`updated ${character.name} health. health: ${character.health}. updated health bar successfully`);
  } 
}

// Function to set values in different objects based on type, name, and key
function setObjectValue(type, name, key, value) {
  if (type === "character") {
    const character = getCharacter(name);
    if (character) {
      character[key] = value;
      console.log(`Updated ${name}'s ${key} to: ${value}`);
    } else {
      console.log(`Character ${name} not found.`);
    }
  } else if (type === "item") {
    const item = getItem(name);
    if (item) {
      item[key] = value;
      console.log(`Updated ${name}'s ${key} to: ${value}`);
    } else {
      console.log(`Item ${name} not found.`);
    }
  } else if (type === "room") {
    const room = getRoom(name);
    if (room) {
      room[key] = value;
      console.log(`Updated ${name}'s ${key} to: ${value}`);
    } else {
      console.log(`Room ${name} not found.`);
    }
  } else {
    console.log(`Invalid type: ${type}`);
  }
}

