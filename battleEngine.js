/***
 * 
 *       battle Engine, I try to create reusable functions to make the engine easy to edit into ther stories
 * 
**/
// event handlers
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleWin(player, enemy, bonus) {
  
  
  player.health += bonus;
  
//  updateHealthBar();
  
  println(`You beat ${enemy.name}, you got ${bonus} bonus, your health is: ${player.health}.`);

  console.log(`You beat ${enemy.name}, you got ${bonus} bonus, your health is: ${player.health}.`);
}

function handleLoss(player, enemy) {
  
  println(`${enemy.name} has beaten you, your health is: ${player.health}`);
  
  console.log(`${enemy.name} has beaten you, your health is: ${player.health}`);
}

function handleGameOver(player) {
  
  player.alive = false;
              
  println(`game over, better LOAD or you're stuck here !`);
              
  enterRoom('death');
  console.log('game over');
}


// initialize game logic to optimize game
function initializeGame(playerName, enemyName, roomName) {

  // get characters and the current room
  const player = getCharacter(playerName);
  const enemy = getCharacter(enemyName);
  const currentRoom = getRoom(roomName);
  
   let result;
  
  // randomNumber generator 
  let randomNumber = generateRandomNumber(1, 10);
  
    if (!enemy.beaten) {
  
      console.log('fight instigated: ' + player.name + ' vs.: ' + enemy.name);
  
      result = playGame(player.health, enemy.health, enemy.turns, enemy.name); 
      
      if (result === "won") {
  
        handleWin(player.name, enemy.name, randomNumber);
      } else if (result === "loss") {
  
        handleLoss(player.name, enemy.name);
      } else if (result === "game_over") {
  
        handleGameOver(player.name);
      }
  }
  
  console.log(`player health: ${player.health}, enemy health: ${enemy.health}, enemy turns: ${enemy.turns}, fought: ${enemy.name} result: ${result}`);
  
  return result;
}

console.log('battleEngine.js loaded ');