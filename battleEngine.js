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
  
  if (player) {
  
    player.alive = false;
              
    println(`game over, better LOAD or you're stuck here !`);
    
    setTimeout(function() {
      enterRoom('death');
    }, 3000);
  } else {
    
    println(`game over, better LOAD or you're stuck here !`);
    
    setTimeout(function() {
      enterRoom('death');
    }, 3000);
  }
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
  
        handleWin(player, enemy, randomNumber);
      } else if (result === "loss") {
  
        handleLoss(player, enemy);
      } else if (result === "game_over") {
  
        handleGameOver(player.name);
      }
  }
  
  console.log(`player health: ${player.health}, enemy health: ${enemy.health}, enemy turns: ${enemy.turns}, fought: ${enemy.name} result: ${result}`);
  
  return result;
}

// clock/ timer function
let countdown;
let timerDisplay;

function startTimer() {
            
  if (!timerDisplay) {
                
  // Create the timer div if it doesn't exist
    timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer'; // Set the id attribute
    document.body.appendChild(timerDisplay);
  }

  const endTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes from now

  countdown = setInterval(function() {
    const currentTime = new Date().getTime();
    const timeLeft = endTime - currentTime;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        handleGameOver();
    } else {
        displayTime(timeLeft);
    }
  }, 1000); // Update every second
}

function displayTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          
}

function handleTimeOver() {
  
  timerDisplay.textContent = "Time's up!";
 
  println(`time is up !!!!`);
  
  console.log('time up');
  
  setTimeout(function() {
    
    handleGameOver();
  }, 3000);
}



console.log('battleEngine.js loaded ');