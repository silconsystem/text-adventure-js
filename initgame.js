/**
     INITIALIZE GAME FUNCTION
**/

// initialize game logic to optimize game
function initializeGame(playerName, enemyName, itemName, roomName) {

  // get characters
  const player = createCharacter(playerName);
  
  //if ['name', 'name'] create a name array for multiple names
  const enemy = createCharacter(enemyName) ? enemyName.map(name => createCharacter(name)) : [createCharacter(enemyName)];
  
  // create a new Item on win
  const newItem = createItem(itemName);
  
  // get the current room
  const currentRoom = getRoom(roomName);
  
  // randomNumber generator 
  let randomNumber = generateRandomNumber(1, 10);
 
  
  // handle single or multiple enemies
  for (const enemy of enemies) {
  
    if (!enemy.beaten) {
      
      console.log('fight instigated: ' + player.name + ' vs.: ' + enemy.name);
      
      let result = playGame(player.name, enemy.name, randomNumber);
      
      // handle results
      if (result === "won") {
        
        handleWin(player.name, enemy.name, randomNumber);
      } else if (result === "loss") {
        
        handleLoss(player.name, enemy.name);
      } else if (result === "game_over") {
        
        handleGameOver(player.name);
      }      
    }
  }

  console.log(player.health, enemy.health, enemy.turns, enemy.name);
}

function createCharacter(name) {
  return {
    name: name,
    health: 100,
    beaten: false,
    alive: true,
    turns: 3, // or any initial value
    topics: []
    // Add more properties as needed
  };
}

function createItem(name) {
  return {
    name: name,
    desc: `it's a fresh cold ${name.toUpperCase()}.`,
    isTakeable: true
    // Add more properties as needed
  };
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleWin(player, enemy, item, bonus) {
  player.health += bonus;


  console.log(`You beat ${enemy.name}, you got ${bonus} bonus, your health is: ${player.health}.`);

  // Add more actions as needed on win
}

function handleLoss(player, enemy) {
  enemy.topics = 'You still want MORE?';
  enemy.desc = `Come at ${enemy.name} again with ${player.health} points?`;
  enemy.turns = 1;

  // Add more actions as needed on loss
}

function handleGameOver(player) {
  player.alive = false;
  console.log(`Game over, better LOAD or you're stuck here!`);

  // Add more actions as needed on game over
}

// You can call initializeGame() to start the game.
initializeGame();


console.log('loaded initgame.js');